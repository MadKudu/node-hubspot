class List {
  constructor (client) {
    this.client = client
  }

  get (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists',
      qs: options
    }, cb)
  }

  getOne (id, cb) {
    if (!id || typeof (id) === 'function') {
      return cb(new Error('id parameter must be provided.'))
    }

    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/' + id
    }, cb)
  }

  getContacts (id, options, cb) {
    if (!id || typeof (id) === 'function') {
      return cb(new Error('id parameter must be provided.'))
    }

    if (typeof (options) === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/' + id + '/contacts/all',
      qs: options,
      qsStringifyOptions: { indices: false }
    }, cb)
  }

  getRecentContacts (id, options, cb) {
    if (!id || typeof (id) === 'function') {
      return cb(new Error('id parameter must be provided.'))
    }

    if (typeof (options) === 'function') {
      cb = options
      options = {}
    }
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/' + id + '/contacts/recent',
      qs: options,
      qsStringifyOptions: { indices: false }
    }, cb)
  }

  addContacts (id, contactBody, cb) {
    if (!id || typeof (id) === 'function') {
      return cb(new Error('id parameter must be provided.'))
    }
    if (!contactBody || typeof (contactBody) === 'function') {
      return cb(new Error('contactBody parameter must be provided.'))
    }

    var body = contactBody

    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/lists/' + id + '/add',
      body: body
    }, cb)
  }
}

module.exports = List
