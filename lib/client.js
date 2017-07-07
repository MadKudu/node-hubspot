const Broadcast = require('./broadcast')
const Campaign = require('./campaign')
const Company = require('./company')
const Contact = require('./contact')
const Deal = require('./deal')
const Engagement = require('./engagement')
const File = require('./file')
const List = require('./list')
const Owner = require('./owner')
const Pipeline = require('./pipeline')
const Subscription = require('./subscription')
const _ = require('lodash')
const request = require('request-promise')
const EventEmitter = require('events').EventEmitter

const debug = require('debug')('hubspot:client')

// define how long to wait API response before throwing a timeout error
const API_TIMEOUT = 15000

class Client extends EventEmitter {
  constructor (options = {}) {
    super()
    this.options = _.extend({ maxUsePercent: 90 }, options)
    this.qs = {}
    if (typeof options.apiKey === 'string') {
      this.qs.hapikey = options.apiKey
    } else if (typeof options.accessToken === 'string') {
      this.qs.accessToken = this.token
    }
    this.baseUrl = this.options.baseUrl || 'http://api.hubapi.com'
    this.apiCalls = 0
    this.on('apiCall', () => {
      this.apiCalls += 1
    })

    this.broadcasts = new Broadcast(this)
    this.campaigns = new Campaign(this)
    this.companies = new Company(this)
    this.contacts = new Contact(this)
    this.deals = new Deal(this)
    this.engagements = new Engagement(this)
    this.files = new File(this)
    this.lists = new List(this)
    this.owners = new Owner(this)
    this.pipelines = new Pipeline(this)
    this.subscriptions = new Subscription(this)
  }

<<<<<<< 140b1e8dee72a6ccfb0107ba1272e16ed922535c
  function useKey (key, cb) {
    if (!key || typeof key !== 'string') {
      return cb(new Error("You must provide a key."));
    }

    self.key = key;
  }

  function setBaseUrl(url) {
    self.baseUrl = url;
  }

  var contacts = {
    get: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/contacts/v1/lists/all/contacts/all',
        qs: options
      }, cb);
    },
    getRecentlyModified: function(cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }
      sendRequest({
       method: 'GET',
       url: self.baseUrl + '/contacts/v1/lists/recently_updated/contacts/recent',
       qs: options
      }, cb);
    },
    getByEmail: function (email, cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/contacts/v1/contact/email/' + email + '/profile'
      }, cb);
    },
    getByEmailBatch: function (emails, cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/contacts/v1/contact/emails/batch',
        qs: { email: emails },
        qsStringifyOptions: { indices: false }
      }, cb);
    },
    getById: function (id, cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/contacts/v1/contact/vid/' + id + '/profile'
      }, cb);
    },
    getByIdBatch: function (ids, cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/contacts/v1/contact/vids/batch',
        qs: { vid: ids },
        qsStringifyOptions: { indices: false }
      }, cb);
    },
    getByToken: function (token, cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/contacts/v1/contact/utk/' + token + '/profile'
      }, cb);
    },
    update: function(id, data, cb) {
      sendRequest({
        method: 'POST',
        url: self.baseUrl + '/contacts/v1/contact/vid/' + id + '/profile',
        body: data
      }, cb);
    },
    create: function (data, cb) {
      sendRequest({
        method: 'POST',
        url: self.baseUrl + '/contacts/v1/contact',
        body: data
      }, cb);
    },
    createOrUpdate: function (email, data, cb) {
      sendRequest({
        method: 'POST',
        url: self.baseUrl + '/contacts/v1/contact/createOrUpdate/email/' + email,
        body: data
      }, cb);
    },
    // note: response to successful batch update is undefined by design : http://developers.hubspot.com/docs/methods/contacts/batch_create_or_update
    createOrUpdateBatch: function (data, cb) {
      sendRequest({
        method: 'POST',
        url: self.baseUrl + '/contacts/v1/contact/batch',
        body: data
      }, cb);
    },
    search: function(query, cb) {
    	sendRequest({
    		method: 'GET',
    		url: self.baseUrl + '/contacts/v1/search/query?q=' + query
    	}, cb);
    },
		properties: {
			get: function(options, cb) {
	      if (typeof options === 'function') {
	        cb = options;
	        options = {};
	      }

	      sendRequest({
	        method: 'GET',
	        url: self.baseUrl + '/contacts/v2/properties',
	        qs: options
	      }, cb);
	    }
		}
  };

  var lists = {
    get: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/contacts/v1/lists',
        qs: options
      }, cb);
    },
    getOne: function(id, cb) {
      if (!id || typeof(id) === 'function') {
        return cb(new Error("id parameter must be provided."));
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/contacts/v1/lists/' + id
      }, cb);
    },
    getContacts: function(id, options, cb) {
      if (!id || typeof(id) === 'function') {
        return cb(new Error("id parameter must be provided."));
      }

      if (typeof(options) === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/contacts/v1/lists/' + id + '/contacts/all',
        qs: options,
        qsStringifyOptions: { indices: false }
      }, cb);
    },
    getRecentContacts: function(id, options, cb) {
      if (!id || typeof(id) === 'function') {
        return cb(new Error("id parameter must be provided."));
      }

      if (typeof(options) === 'function') {
        cb = options;
        options = {};
      }
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/contacts/v1/lists/' + id + '/contacts/recent',
        qs: options,
        qsStringifyOptions: { indices: false }
      }, cb);
    },
    addContacts: function(id, contactBody, cb) {
      if (!id || typeof(id) === 'function') {
        return cb(new Error("id parameter must be provided."));
      }
      if (!contactBody || typeof(contactBody) === 'function') {
        return cb(new Error("contactBody parameter must be provided."));
      }

      var body = contactBody;

      sendRequest({
        method: 'POST',
        url: self.baseUrl + '/contacts/v1/lists/' + id + '/add',
        body: body
      }, cb);
    }
  };

  var campaigns = {
    get: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/email/public/v1/campaigns',
        qs: options
      }, cb);
    },
    getById: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/email/public/v1/campaigns/by-id',
        qs: options
      }, cb);
    },
    getOne: function(id, appId, cb) {
      if (!id || typeof id === "function") {
        return cb(new Error("id parameter must be provided."));
      }

      if (typeof appId === "function") {
        cb = appId;
        appId = null;
      }

      var call = {
        method: 'GET',
        url: self.baseUrl + '/email/public/v1/campaigns/' + id
      };

      if (appId) {
        call.qs = {
          appId: appId
        }
      }

      sendRequest(call, cb);
    },
    events: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/email/public/v1/events',
        qs: options
      }, cb);
    }
  };

  var companies = {
    getById: function(id, cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/companies/v2/companies/' + id
      }, cb);
    },
    getAll: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/companies/v2/companies/paged',
        qs: options,
        qsStringifyOptions: {
          arrayFormat: 'repeat'
        }
      }, cb);
    },
    getRecentlyCreated: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/companies/v2/companies/recent/created',
        qs: options
      }, cb);
    },
    getByDomain: function(domain, cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/companies/v2/companies/domain/' + domain
      }, cb);
    },
    create: function(data, cb) {
      sendRequest({
        method: 'POST',
        url: self.baseUrl + '/companies/v2/companies/',
        body: data
      }, cb);
    },
    addContactToCompany: function (data, cb) {
      if (!data || !data.companyId || !data.contactVid) {
        return cb(new Error('companyId and contactVid params must be provided'));
      }

      sendRequest({
        method: 'PUT',
        url: self.baseUrl + '/companies/v2/companies/' + data.companyId + '/contacts/' + data.contactVid
      }, cb);
    }
  };
=======
  _request (opts, cb) {
    const params = _.cloneDeep(opts)
    cb = cb || function noop () {}
    params.json = true
>>>>>>> 1.0-beta1

    params.url = this.baseUrl + params.path
    delete params.path
    params.qs = _.extend({}, this.qs, params.qs)

    params.qsStringifyOptions = {
      arrayFormat: 'repeat'
    }

    params.timeout = API_TIMEOUT

    // debug('params', params)

    return this.checkApiLimit(params)
      .then(() => {
        this.emit('apiCall')
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
    if ((/integrations\/v1\/limit/).test(params.url)) { // don't check the api limit for the api call
      return Promise.resolve()
    }
    return this.getApiLimit().then(results => {
      const { usageLimit = 40000, currentUsage = 0 } = results
      const usagePercent = 100.0 * currentUsage / usageLimit
      debug('usagePercent', usagePercent, 'apiCalls', this.apiCalls)
      if (usagePercent > this.options.maxUsePercent) {
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
    this.emit('apiCall')
    return this._request({
      method: 'GET',
      path: '/integrations/v1/limit/daily'
    }).then(results => {
      this.limit = results[0]
      return this.limit
    })
  }
}

module.exports = Client
