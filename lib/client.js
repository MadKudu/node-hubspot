const _ = require('lodash')
const Bottleneck = require('bottleneck')
const request = require('request-promise')
const EventEmitter = require('events').EventEmitter

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
const Form = require('./form')
const Integrations = require('./integrations')
const List = require('./list')
const Owner = require('./owner')
const OAuth = require('./oauth')
const Pipeline = require('./pipeline')
const Subscription = require('./subscription')
const Timeline = require('./timeline')
const Workflow = require('./workflow')
const MarketingEmail = require('./marketing_email')
const Ticket = require('./ticket')

const debug = require('debug')('hubspot:client')

// define how long to wait API response before throwing a timeout error
const API_TIMEOUT = 15000
const MAX_USE_PERCENT_DEFAULT = 90

const getLimiter = (options) =>
  new Bottleneck(
    Object.assign(
      {
        maxConcurrent: 2,
        minTime: 1000 / 9,
      },
      options.limiter
    )
  )

const setInstances = (client) => {
  client.broadcasts = new Broadcast(client)
  client.campaigns = new Campaign(client)
  client.companies = new Company(client)
  client.contacts = new Contact(client)
  client.pages = new Page(client)
  client.deals = new Deal(client)
  client.emails = new Email(client)
  client.engagements = new Engagement(client)
  client.files = new File(client)
  client.forms = new Form(client)
  client.integrations = new Integrations(client)
  client.lists = new List(client)
  client.oauth = new OAuth(client)
  client.owners = new Owner(client)
  client.pipelines = new Pipeline(client)
  client.timelines = new Timeline(client)
  client.subscriptions = new Subscription(client)
  client.workflows = new Workflow(client)
  client.crm = new CRM(client)
  client.marketingEmail = new MarketingEmail(client)
  client.tickets = new Ticket(client)
}

const prepareParams = (opts, self) => {
  const params = _.cloneDeep(opts)
  if (self.auth) {
    params.auth = self.auth
  }
  params.method = params.method || 'GET'
  params.json = true
  params.resolveWithFullResponse = true

  params.url = params.overlapUrl || self.baseUrl + (params.path || '')
  delete params.overlapUrl
  delete params.path
  params.qs = Object.assign({}, self.qs, params.qs)

  params.qsStringifyOptions = {
    arrayFormat: 'repeat',
  }
  params.timeout = self.apiTimeout
  return params
}

class Client extends EventEmitter {
  constructor(options = {}) {
    super()
    this.qs = {}
    this.auth = undefined
    this.setAuth(options)
    this.setOAuth(options)
    this.maxUsePercent = typeof options.maxUsePercent !== 'undefined' ? options.maxUsePercent : MAX_USE_PERCENT_DEFAULT
    this.baseUrl = options.baseUrl || 'https://api.hubapi.com'
    this.apiTimeout = options.timeout || API_TIMEOUT
    this.apiCalls = 0
    this.on('apiCall', (params) => {
      debug('apiCall', _.pick(params, ['method', 'url']))
      this.apiCalls += 1
    })
    this.checkLimit = options.checkLimit !== undefined ? options.checkLimit : true
    this.limiter = getLimiter(options)
    setInstances(this)
  }

  requestStats() {
    return {
      running: this.limiter.running(),
      queued: this.limiter.queued(),
    }
  }

  setAccessToken(accessToken, expiresIn = 0, updatedAt = 0) {
    this.accessToken = accessToken
    this.accessTokenExpiresIn = expiresIn
    // current timestamp in seconds
    this.accessTokenUpdatedAt = updatedAt !== 0 ? updatedAt : Math.floor(Date.now() / 1000)
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

        // defaults to OAuth2
      } else {
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000)
        const updatedAtTimestamp = _.get(options, 'updatedAtTimestamp') || currentTimestampInSeconds
        const expiresIn = _.get(options, 'expiresIn') || 21600
        this.setAccessToken(options.accessToken, expiresIn, updatedAtTimestamp)
      }
    }
  }

  // It can be handy to use this method for not wrapped yet endpoints
  // This benefits from the bottleneck throttling, auth and request parsing and formatting
  apiRequest(opts) {
    const params = prepareParams(opts, this)
    return this.checkApiLimit(params).then(() => {
      this.emit('apiCall', params)
      return this.limiter.schedule(() =>
        request(params)
          .then((res) => {
            this.updateApiLimit(res)
            return res
          })
          .then((res) => res.body)
      ) // limit the number of concurrent requests
    })
  }

  updateApiLimit(res) {
    const { headers } = res
    if (this.usageLimit === undefined) {
      this.usageLimit = headers['x-hubspot-ratelimit-daily']
    }
    if (this.usageLimit !== undefined) {
      this.currentUsage = this.usageLimit - headers['x-hubspot-ratelimit-daily-remaining']
    }
    return Promise.resolve()
  }

  checkApiLimit(params) {
    return new Promise((resolve, reject) => {
      // don't check the api limit for the api call
      if (this.auth) return resolve()
      // don't check the api limit for the api call
      if (/integrations\/v1\/limit|oauth/.test(params.url)) return resolve()
      // don't check the api limit for the api call
      if (!this.checkLimit) return resolve()
      // if maxUsePercent set to 0, do not check for the API limit (use at your own risk)
      if (this.maxUsePercent === 0) return resolve()

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
    return this.apiRequest({
      method: 'GET',
      path: '/integrations/v1/limit/daily',
    }).then((results) => {
      this.limit = results.filter((r) => r.name === 'api-calls-daily')[0]
      return this.limit
    })
  }
}

module.exports = Client

// Allow use of default import syntax in TypeScript
module.exports.default = Client
