require('object.assign').shim();
var request = require('request');

var defaultBaseUrl = 'http://api.hubapi.com/';

function Client(opts) {
  var self = this;

  self.opts = opts || {};
  self.token;
  self.key;
  self.baseUrl = defaultBaseUrl;

  function useToken (token) {
    if (!token || typeof token !== 'string') {
      return cb(new Error("You must provide a token."));
    }

    self.token = token;
  }

  function useKey (key) {
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
        url: self.baseUrl + 'contacts/v1/lists/all/contacts/all',
        qs: options
      }, cb);
    },
    getByEmail: function (email, cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + 'contacts/v1/contact/email/' + email + '/profile'
      }, cb);
    },
    getByEmailBatch: function (emails, cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + 'contacts/v1/contact/emails/batch',
        qs: { email: emails },
        qsStringifyOptions: { indices: false }
      }, cb);
    },
    getById: function (id, cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + 'contacts/v1/contact/vid/' + id + '/profile'
      }, cb);
    },
    update: function(id, data, cb) {
      sendRequest({
        method: 'POST',
        url: self.baseUrl + 'contacts/v1/contact/vid/' + id + '/profile',
        body: data
      }, cb);
    },
    create: function (data, cb) {
      sendRequest({
        method: 'POST',
        url: self.baseUrl + 'contacts/v1/contact',
        body: data
      }, cb);
    },
    // note: response to successful batch update is undefined by design : http://developers.hubspot.com/docs/methods/contacts/batch_create_or_update
    createOrUpdateBatch: function (data, cb) {
      sendRequest({
        method: 'POST',
        url: self.baseUrl + 'contacts/v1/contact/batch',
        body: data
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
        url: self.baseUrl + 'contacts/v1/lists',
        qs: options
      }, cb);
    },
    getOne: function(id, cb) {
      if (!id || typeof(id) === 'function') {
        return cb(new Error("id parameter must be provided."));
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + 'contacts/v1/lists/' + id,
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
        url: self.baseUrl + 'contacts/v1/lists/' + id + '/contacts/all',
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
        url: self.baseUrl + 'contacts/v1/lists/' + id + '/contacts/recent',
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
        url: self.baseUrl + 'contacts/v1/lists/' + id + '/add',
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
        url: self.baseUrl + '/filemanager/api/v2/files/' + id,
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
    broadcasts: broadcasts,
    lists: lists,
    files: files,
    useToken: useToken,
    useKey: useKey,
    setBaseUrl: setBaseUrl
  }
}

module.exports = Client;
