var request = require('request');

var baseUrl = 'http://api.hubapi.com/';

function Client() {
  var self = this;

  self.token;
  self.key;

  function useToken (token) {
    if (!token || typeof token !== 'string') { return cb(new Error("You must provide a token.")); }
    self.token = token;
  }

  function useKey (key) {
    if (!key || typeof key !== 'string') { return cb(new Error("You must provide a key.")); }
    self.key = key;
  }

  var contacts = {
    get: function(options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }
      var call = {
        method: 'GET',
        url: baseUrl + 'contacts/v1/lists/all/contacts/all',
        qs: options
      };
      sendRequest(call, cb);
    },
    create: function(options, properties, cb) {
      if (!options) { return cb(new Error("options parameter must be provided.")); }
      if (!properties) { return cb(new Error("properties parameter must be provided.")); }

      var call = {
        method: 'POST',
        url: baseUrl + 'contacts/v1/contact',
        qs: options,
        json: properties
      };
      sendRequest(call, cb);
    },
    createOrUpdate: function(email, properties, cb) {
      if (!email) { return cb(new Error("email parameter must be provided.")); }
      if (!properties) { return cb(new Error("properties parameter must be provided.")); }
      var call = {
        method: 'POST',
        url: baseUrl + 'contacts/v1/contact/createOrUpdate/email/' + email,
        json: properties
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
        url: baseUrl + 'contacts/v1/lists',
        qs: options
      };
      sendRequest(call, cb);
    },
    post: notReadyError,
    getOne: function(id, cb) {
      if (!id || typeof(id) === 'function') { return cb(new Error("id parameter must be provided.")); }
      var call = {
        method: 'GET',
        url: baseUrl + 'contacts/v1/lists/' + id,
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
        url: baseUrl + 'contacts/v1/lists/' + id + '/contacts/all',
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
        url: baseUrl + 'contacts/v1/lists/' + id + '/contacts/recent',
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
        url: baseUrl + '/email/public/v1/campaigns/' + id + '/events',
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
        url: baseUrl + '/email/public/v1/campaigns',
        qs: options
      };
      sendRequest(call, cb);
    },
    getOne: function(id, cb) {
      if (!id || typeof id === "function") { return cb(new Error("id parameter must be provided.")); }
      var call = {
        method: 'GET',
        url: baseUrl + '/email/public/v1/campaigns/' + id
      };
      sendRequest(call, cb);
    },
    add: function(id, contactIds, cb) {
      if (!id) { return cb(new Error("id parameter must be provided.")); }
      if (!contactIds) { return cb(new Error("contactIds parameter must be provided.")); }
      var call = {
        method: 'POST',
        url: baseUrl + '/contacts/v1/lists/' + id + '/add',
        json: { vids: typeof contactIds === 'array' ? contactIds : [contactIds] }
      };
      sendRequest(call, cb);
    },
    tracking: campaignTracking
  };

  var files = {
    get: function(cb) {
      var call = {
        method: 'GET',
        url: baseUrl + '/content/api/v2/files'
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

    console.log(call);
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
          console.log(e);
          console.log('error parsing response');
        }
      }
      //if (data.error) { return cb(new Error(data.error)); }
      //if (data && data.length && data.length > 0 && data[0].error_message) { return cb(new Error(data[0].error_message)); }
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
    contacts: contacts,
    lists: lists,
    files: files,
    useToken: useToken,
    useKey: useKey
  }
}

module.exports = Client;
