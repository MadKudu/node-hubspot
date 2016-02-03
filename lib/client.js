var request = require('request');

var defaultBaseUrl = 'http://api.hubapi.com/';

function Client() {
  var self = this;

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
        qs: options
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
      var call = {
        method: 'GET',
        url: self.baseUrl + 'contacts/v1/lists/' + id + '/contacts/recent',
        qs: options
      };
      sendRequest(call, cb);
    }
  };

  var campaignTracking = {
    events: function(id, opts, cb) {
      if (!id || typeof(id) === "function") {
        return cb(new Error("id parameter must be provided."));
      }

      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/email/public/v1/campaigns/' + id + '/events',
        qs: opts
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
    tracking: campaignTracking
  };

  var events = {
    get: function(options, cb) {
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

  var files = {
    get: function(cb) {
      sendRequest({
        method: 'GET',
        url: self.baseUrl + '/content/api/v2/files'
      }, cb);
    }
  };

  function sendRequest (call, cb) {
    if (!self.key && !self.token) {
      return cb(new Error("You need to provide either a token or a key."));
    }

    call.qs = call.qs || {};
    if (self.key) {
      call.qs.hapikey = self.key;
    } else if (self.token) {
      call.qs.access_token = self.token;
    }

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

      data.statusCode = res.statusCode;
      return cb(null, data);
    }
  }

  return {
    campaigns: campaigns,
    events: events,
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
