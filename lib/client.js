const Broadcast = require('./broadcast')
const Campaign = require('./campaign')
const Company = require('./company')
const Contact = require('./contact')
const Page = require('./page')
const Deal = require('./deal')
const Engagement = require('./engagement')
const File = require('./file')
const List = require('./list')
const Owner = require('./owner')
const OAuth = require('./oauth')
const Pipeline = require('./pipeline')
const Subscription = require('./subscription')
const _ = require('lodash')
const request = require('request-promise')
const EventEmitter = require('events').EventEmitter

const debug = require('debug')('hubspot:client')

// define how long to wait API response before throwing a timeout error
const API_TIMEOUT = 15000
const MAX_USE_PERCENT_DEFAULT = 90

class Client extends EventEmitter {
  constructor (options = {}) {
    super()
    this.qs = {}
    this.auth = undefined
    this.setAuth(options)
    this.setOAuth(options)
    this.maxUsePercent = typeof options.maxUsePercent !== 'undefined' ? options.maxUsePercent : MAX_USE_PERCENT_DEFAULT
    this.baseUrl = options.baseUrl || 'http://api.hubapi.com'
    this.apiTimeout = options.timeout || API_TIMEOUT
    this.apiCalls = 0
    this.on('apiCall', params => {
      debug('apiCall', _.pick(params, ['method', 'url']))
      this.apiCalls += 1
    })

    this.broadcasts = new Broadcast(this)
    this.campaigns = new Campaign(this)
    this.companies = new Company(this)
    this.contacts = new Contact(this)
    this.pages = new Page(this)
    this.deals = new Deal(this)
    this.engagements = new Engagement(this)
    this.files = new File(this)
    this.lists = new List(this)
    this.oauth = new OAuth(this)
    this.owners = new Owner(this)
    this.pipelines = new Pipeline(this)
    this.subscriptions = new Subscription(this)
  }

  setAccessToken (accessToken) {
    this.accessToken = accessToken
    this.auth = { 'bearer': accessToken }
  }

  refreshAccessToken () {
    return this.oauth.refreshAccessToken()
  }

  setOAuth (options = {}) {
    this.clientId = options.clientId
    this.clientSecret = options.clientSecret
    this.redirectUri = options.redirectUri
    this.refreshToken = options.refreshToken
  }

  setAuth (options = {}) {
    if (options.apiKey) {
      this.qs.hapikey = options.apiKey
    } else if (options.accessToken) {
      if (options.useOAuth1) {
        this.qs.access_token = options.accessToken
      } else { // defaults to OAuth2
        this.setAccessToken(options.accessToken)
      }
    }
  }

  _request (opts, cb = () => {}) {
    const params = _.cloneDeep(opts)
    if (this.auth) { params.auth = this.auth }
    params.json = true

    params.url = this.baseUrl + params.path
    delete params.path
    params.qs = _.extend({}, this.qs, params.qs)

    params.qsStringifyOptions = {
      arrayFormat: 'repeat'
    }

    params.timeout = this.apiTimeout

    return this.checkApiLimit(params)
      .then(() => {
        this.emit('apiCall', params)
        return request(params)
          .then(data => {
            if (typeof data === 'string') {
              let parsed
              try {
                parsed = JSON.parse(data)
                data = parsed
              } catch (e) {
                const err = new Error(data)
                cb(err)
                throw err
              }
            }
            cb(null, data)
            return data
          }).catch(err => {
            cb(err)
            throw err
          })
      })
  }

  checkApiLimit (params) {
    if (this.auth) { // don't check the api limit for the api call
      return Promise.resolve()
    }
    if ((/integrations\/v1\/limit|oauth/).test(params.url)) { // don't check the api limit for the api call
      return Promise.resolve()
    }
    if (this.maxUsePercent === 0) { // if maxUsePercent set to 0, do not check for the API limit (use at your own risk)
      return Promise.resolve()
    }
    return this.getApiLimit().then(results => {
      const { usageLimit = 40000, currentUsage = 0 } = results
      const usagePercent = 100.0 * currentUsage / usageLimit
      debug('usagePercent', usagePercent, 'apiCalls', this.apiCalls)
      if (usagePercent > (this.maxUsePercent)) {
        const err = new Error('Too close to the API limit')
        err.usageLimit = usageLimit
        err.currentUsage = currentUsage
        err.usagePercent = usagePercent
        throw err
      }
    })
  }

  getApiLimit () {
    this.limit = this.limit || {}
    const collectedAt = this.limit.collectedAt || 0
    const recencyMinutes = (Date.now() - collectedAt) / (60 * 1000)
    debug('recencyMinutes', recencyMinutes)
    if (recencyMinutes < 5) {
      return Promise.resolve(this.limit)
    }
    return this._request({
      method: 'GET',
      path: '/integrations/v1/limit/daily'
    }).then(results => {
      this.limit = results.filter((r) => r.name === 'api-calls-daily')[0]
      return this.limit
    })
  }
}

module.exports = Client
