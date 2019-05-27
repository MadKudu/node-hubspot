const Broadcast = require('./broadcast')
const Campaign = require('./campaign')
const Company = require('./company')
const Contact = require('./contact')
const CRM = require('./crm')
const Page = require('./page')
const Deal = require('./deal')
const Engagement = require('./engagement')
const Email = require('./emails')
const File = require('./file')
const Integrations = require('./integrations')
const List = require('./list')
const Owner = require('./owner')
const OAuth = require('./oauth')
const Pipeline = require('./pipeline')
const Subscription = require('./subscription')
const Timeline = require('./timeline')
const Workflow = require('./workflow')
const _ = require('lodash')
const request = require('request-promise')
const EventEmitter = require('events').EventEmitter
const Bottleneck = require('bottleneck')

const debug = require('debug')('hubspot:client')

// define how long to wait API response before throwing a timeout error
const API_TIMEOUT = 15000
const MAX_USE_PERCENT_DEFAULT = 90

class Client extends EventEmitter {
  constructor(options = {}) {
    super()
    this.qs = {}
    this.auth = undefined
    this.setAuth(options)
    this.setOAuth(options)
    this.maxUsePercent =
      typeof options.maxUsePercent !== 'undefined'
        ? options.maxUsePercent
        : MAX_USE_PERCENT_DEFAULT
    this.baseUrl = options.baseUrl || 'http://api.hubapi.com'
    this.apiTimeout = options.timeout || API_TIMEOUT
    this.apiCalls = 0
    this.on('apiCall', params => {
      debug('apiCall', _.pick(params, ['method', 'url']))
      this.apiCalls += 1
    })
    this.checkLimit =
      options.checkLimit !== undefined ? options.checkLimit : true
    this.limiter = new Bottleneck(
      Object.assign(
        {
          maxConcurrent: 2,
          minTime: 1000 / 9,
        },
        options.limiter
      )
    )

    this.broadcasts = new Broadcast(this)
    this.campaigns = new Campaign(this)
    this.companies = new Company(this)
    this.contacts = new Contact(this)
    this.pages = new Page(this)
    this.deals = new Deal(this)
    this.emails = new Email(this)
    this.engagements = new Engagement(this)
    this.files = new File(this)
    this.integrations = new Integrations(this)
    this.lists = new List(this)
    this.oauth = new OAuth(this)
    this.owners = new Owner(this)
    this.pipelines = new Pipeline(this)
    this.timelines = new Timeline(this)
    this.subscriptions = new Subscription(this)
    this.workflows = new Workflow(this)
    this.crm = new CRM(this)
  }

  requestStats() {
    return {
      running: this.limiter.running(),
      queued: this.limiter.queued(),
    }
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken
    this.auth = { bearer: accessToken }
  }

  refreshAccessToken() {
    return this.oauth.refreshAccessToken()
  }

  setOAuth(options = {}) {
    this.clientId = options.clientId
    this.clientSecret = options.clientSecret
    this.redirectUri = options.redirectUri
    this.refreshToken = options.refreshToken
  }

  setAuth(options = {}) {
    if (options.apiKey) {
      this.qs.hapikey = options.apiKey
    } else if (options.accessToken) {
      if (options.useOAuth1) {
        this.qs.access_token = options.accessToken
      } else {
        // defaults to OAuth2
        this.setAccessToken(options.accessToken)
      }
    }
  }

  _request(opts) {
    const params = _.cloneDeep(opts)
    if (this.auth) {
      params.auth = this.auth
    }
    params.json = true
    params.resolveWithFullResponse = true

    params.url = this.baseUrl + params.path
    delete params.path
    params.qs = Object.assign({}, this.qs, params.qs)

    params.qsStringifyOptions = {
      arrayFormat: 'repeat',
    }

    params.timeout = this.apiTimeout

    return this.checkApiLimit(params).then(() => {
      this.emit('apiCall', params)
      return this.limiter.schedule(() =>
        request(params)
          .then(res => {
            this.updateApiLimit(res)
            return res
          })
          .then(res => res.body)
      ) // limit the number of concurrent requests
    })
  }

  updateApiLimit(res) {
    const { headers } = res
    if (this.usageLimit === undefined) {
      this.usageLimit = headers['x-hubspot-ratelimit-daily']
    }
    if (this.usageLimit !== undefined) {
      this.currentUsage =
        this.usageLimit - headers['x-hubspot-ratelimit-daily-remaining']
    }
    return Promise.resolve()
  }

  checkApiLimit(params) {
    return new Promise((resolve, reject) => {
      if (this.auth) {
        // don't check the api limit for the api call
        resolve()
      }
      if (/integrations\/v1\/limit|oauth/.test(params.url)) {
        // don't check the api limit for the api call
        resolve()
      }
      if (!this.checkLimit) {
        // don't check the api limit for the api call
        resolve()
      }
      if (this.maxUsePercent === 0) {
        // if maxUsePercent set to 0, do not check for the API limit (use at your own risk)
        resolve()
      }
      if (this.currentUsage !== undefined) {
        const usagePercent = (100.0 * this.currentUsage) / this.usageLimit
        debug('usagePercent', usagePercent, 'apiCalls', this.apiCalls)
        if (usagePercent > this.maxUsePercent) {
          const err = new Error('Too close to the API limit')
          err.usageLimit = this.usageLimit
          err.currentUsage = this.currentUsage
          err.usagePercent = usagePercent
          reject(err)
        }
      }
      resolve()
    })
  }

  getApiLimit() {
    this.limit = this.limit || {}
    const collectedAt = this.limit.collectedAt || 0
    const recencyMinutes = (Date.now() - collectedAt) / (60 * 1000)
    debug('recencyMinutes', recencyMinutes)
    if (recencyMinutes < 5) {
      return Promise.resolve(this.limit)
    }
    return this._request({
      method: 'GET',
      path: '/integrations/v1/limit/daily',
    }).then(results => {
      this.limit = results.filter(r => r.name === 'api-calls-daily')[0]
      return this.limit
    })
  }
}

module.exports = Client

// Allow use of default import syntax in TypeScript
module.exports.default = Client
