var request = require('request');

var defaultBaseUrl = 'http://api.hubapi.com/';

function Client() {
  var self = this;

  self.token;
  self.key;
  self.baseUrl = defaultBaseUrl;

  function useToken (token) {
    if (!token || typeof token !== 'string') { return cb(new Error("You must provide a token.")); }
    self.token = token;
  }

  function useKey (key) {
    if (!key || typeof key !== 'string') { return cb(new Error("You must provide a key.")); }
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
      var call = {
        method: 'GET',
        url: self.baseUrl + 'contacts/v1/lists/all/contacts/all',
        qs: options
      };
      sendRequest(call, cb);
    }
  };

  var lists = {
    get: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }
      var call = {
        method: 'GET',
        url: self.baseUrl + 'contacts/v1/lists',
        qs: options
      };
      sendRequest(call, cb);
    },
    post: notReadyError,
    getOne: function(id, cb) {
      if (!id || typeof(id) === 'function') { return cb(new Error("id parameter must be provided.")); }
      var call = {
        method: 'GET',
        url: self.baseUrl + 'contacts/v1/lists/' + id,
      };
      sendRequest(call, cb);
    },
    put: notReadyError,
    del: notReadyError,
    getContacts: function(id, options, cb) {
      if (!id || typeof(id) === 'function') { return cb(new Error("id parameter must be provided.")); }
      if (typeof(options) === 'function') {
        cb = options;
        options = {};
      }
      var call = {
        method: 'GET',
        url: self.baseUrl + 'contacts/v1/lists/' + id + '/contacts/all',
        qs: options
      };
      sendRequest(call, cb);
    },
    getRecentContacts: function(id, options, cb) {
      if (!id || typeof(id) === 'function') { return cb(new Error("id parameter must be provided.")); }
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
      if (!id || typeof(id) === "function") { return cb(new Error("id parameter must be provided.")); }

      var call = {
        method: 'GET',
        url: self.baseUrl + '/email/public/v1/campaigns/' + id + '/events',
        qs: opts
      };
      sendRequest(call, cb);
    }
  };

  var campaigns = {
    get: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }
      var call = {
        method: 'GET',
        url: self.baseUrl + '/email/public/v1/campaigns',
        qs: options
      };
      sendRequest(call, cb);
    },
    getOne: function(id, appId, cb) {
      if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided.")); }
      if (typeof appId === "function") { cb = appId; appId = null; }

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

      var call = {
        method: 'GET',
        url: self.baseUrl + '/email/public/v1/events',
        qs: options
      };

      sendRequest(call, cb);
    }
  };

  var companies = {
    getRecentlyCreated: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      var call = {
        method: 'GET',
        url: self.baseUrl + '/companies/v2/companies/recent/created',
        qs: options
      };

      sendRequest(call, cb);
    }
  };

  var files = {
    get: function(cb) {
      var call = {
        method: 'GET',
        url: self.baseUrl + '/content/api/v2/files'
      };
      sendRequest(call, cb);
    }
  };

  function sendRequest (call, cb) {
    if (!self.key && !self.token) { return cb(new Error("You need to provide either a token or a key.")); }

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
      if (err) { return cb(err); }

      if (typeof data === 'string') {
        try {
          var parsed = JSON.parse(data);
          data = parsed;
        } catch (e) {
          return cb(new Error(data)); // sometimes errors are returned as strings.
        }
      }

      if (data.error) {
        var singleError = new Error(data.error);
        singleError.response = data;
        return cb(singleError);
      }

      if (data.length > 0 && data[0].error_message) {
        var arrError = new Error(data[0].error_message);
        arrError.response = data;
        return cb(arrError);
      }

      data.statusCode = res.statusCode;
      return cb(null, data);
    }
  }

  function notReadyError () {
    var cb = arguments[arguments.length - 1];
    return cb(new Error("this call is not ready yet."));
  }

  return {
    campaigns: campaigns,
    events: events,
    contacts: contacts,
    companies: companies,
    lists: lists,
    files: files,
    useToken: useToken,
    useKey: useKey,
    setBaseUrl: setBaseUrl
  }
}

module.exports = Client;
