const Property = require('./contact_property')

class Contact {
  constructor (client) {
    this.client = client
    this.properties = new Property(this.client)
  }

  get (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/all/contacts/all',
      qs: options
    }, cb)
  }

  getAll (options, cb) {
    return this.get(options, cb)
  }

  getRecentlyModified (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/recently_updated/contacts/recent',
      qs: options
    }, cb)
  }

  getRecentlyCreated (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/all/contacts/recent',
      qs: options
    }, cb)
  }

  getByEmail (email, cb) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/contact/email/' + email + '/profile'
    }, cb)
  }

  getByEmailBatch (emails, cb) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/contact/emails/batch',
      qs: { email: emails },
      qsStringifyOptions: { indices: false }
    }, cb)
  }

  getById (id, cb) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/contact/vid/' + id + '/profile'
    }, cb)
  }

  getByIdBatch (ids, cb) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/contact/vids/batch',
      qs: { vid: ids },
      qsStringifyOptions: { indices: false }
    }, cb)
  }

  getByToken (token, cb) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/contact/utk/' + token + '/profile'
    }, cb)
  }

  delete (id, cb) {
    return this.client._request({
      method: 'DELETE',
      path: '/contacts/v1/contact/vid/' + id
    }, cb)
  }

  update (id, data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/contact/vid/' + id + '/profile',
      body: data
    }, cb)
  }

  create (data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/contact',
      body: data
    }, cb)
  }

  createOrUpdate (email, data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/contact/createOrUpdate/email/' + email,
      body: data
    }, cb)
  }

  // note: response to successful batch update is undefined by design : http://developers.hubspot.com/docs/methods/contacts/batch_create_or_update
  createOrUpdateBatch (data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/contact/batch',
      body: data
    }, cb)
  }

  search (query, cb) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/search/query',
      qs: { q: query }
    }, cb)
  }
}

module.exports = Contact
