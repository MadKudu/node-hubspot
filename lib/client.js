require('object.assign').shim();
var request = require('request');

var defaultBaseUrl = 'http://api.hubapi.com';

function Client(opts) {
  var self = this;
  self.token;
  self.key;

  self.opts = opts || {};
  self.baseUrl = defaultBaseUrl;

  function useToken (token, cb) {
    if (!token || typeof token !== 'string') {
      return cb(new Error("You must provide a token."));
    }
    self.token = token;
  }

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
    getRecent: function(cb) {
     sendRequest({
       method: 'GET',
       url: self.baseUrl + '/contacts/v1/lists/recently_updated/contacts/recent?count=100'
     }, cb);
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
    }
  };

  var pipelines = {
    get: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/deals/v1/pipelines',
        qs: options
      }, cb);
    }
  };

  var broadcasts = {
    get: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/broadcast/v1/broadcasts',
        qs: options
      }, cb);
    }
  };

  var subscriptions = {
    get: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/email/public/v1/subscriptions/timeline',
        qs: options
      }, cb);
    }
  };

  var files = {
    get: function(cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/filemanager/api/v2/files'
      }, cb);
    },
    getOne: function(id, cb) {
      if (!id || typeof(id) === 'function') {
        return cb(new Error("id parameter must be provided."));
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/filemanager/api/v2/files/' + id
      }, cb);
    }
  };

  var deals = {
    getRecentlyModified: function(options, cb){
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/deals/v1/deal/recent/modified',
        qs: options
      }, cb);
    },
    getRecentlyCreated: function(options, cb){
      if(typeof options === 'function'){
        cb = options;
        options = {};
      }
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/deals/v1/deal/recent/created',
        qs: options
      }, cb);
    },
    getById: function(id, cb){
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/deals/v1/deal/' + id
      }, cb);
    },
    deleteById: function(id, cb){
      sendRequest({
        method: 'DELETE',
        url: self.baseUrl + '/deals/v1/deal/' + id
      }, cb);
    },
    updateById: function(id, data, cb){
      sendRequest({
        method: 'PUT',
        url: self.baseUrl + '/deals/v1/deal/' + id,
        body: data
      }, cb);
    },
    create: function(data, cb){
      sendRequest({
        method: 'POST',
        url: self.baseUrl + '/deals/v1/deal/',
        body: data
      }, cb);
    },
    associate: function(id, objectType, associatedObjectId, cb){
      sendRequest({
        method: 'PUT',
        url: self.baseUrl + '/deals/v1/deal/' + id + '/associations/'+ objectType +'?id=' + associatedObjectId
      }, cb);
    },
    removeAssociation: function(id, objectType, associatedObjectId, cb){
      sendRequest({
        method: 'DELETE',
        url: self.baseUrl + '/deals/v1/deal/' + id + '/associations/'+ objectType +'?id=' + associatedObjectId
      }, cb);
    }
  };

  var engagements = {
    create: function (data, cb) {
      sendRequest({
        method: 'POST',
        url: self.baseUrl + '/engagements/v1/engagements',
        body: data
      }, cb);
    }
  };

  function sendRequest (call, cb) {
    if (!self.key && !self.token) {
      return cb(new Error("You need to provide either a token or a key."));
    }
    call.json = true
    call.qs = call.qs || {};

    if (self.key) {
      call.qs.hapikey = self.key;
    } else if (self.token) {
      call.qs.access_token = self.token;
    }

    Object.assign(call, self.opts.request);

    request(call, handleResponse(cb));
  }

  function handleResponse (cb) {
    return function (err, res, data) {
      if (err) return cb(err);
      if (typeof data === 'string') {
        try {
          var parsed = JSON.parse(data);
          data = parsed;
        } catch (e) {
          return cb(new Error(data)); // sometimes errors are returned as strings.
        }
      }
      return cb(null, data, res);
    }
  }


  return {
    campaigns: campaigns,
    subscriptions: subscriptions,
    contacts: contacts,
    companies: companies,
    deals: deals,
    pipelines: pipelines,
    broadcasts: broadcasts,
    lists: lists,
    files: files,
    engagements: engagements,
    useToken: useToken,
    useKey: useKey,
    setBaseUrl: setBaseUrl,
    self: self
  }
}

module.exports = Client;
