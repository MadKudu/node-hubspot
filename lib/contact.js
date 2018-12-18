const Property = require('./contact_property')

class Contact {
  constructor(client) {
    this.client = client
    this.properties = new Property(this.client)
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/all/contacts/all',
      qs: options,
    })
  }

  getAll(options) {
    return this.get(options)
  }

  getRecentlyModified(options) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/recently_updated/contacts/recent',
      qs: options,
    })
  }

  getRecentlyCreated(options) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/all/contacts/recent',
      qs: options,
    })
  }

  getByEmail(email) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/contact/email/' + email + '/profile',
    })
  }

  getByEmailBatch(emails) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/contact/emails/batch',
      qs: { email: emails },
      qsStringifyOptions: { indices: false },
    })
  }

  getById(id) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/contact/vid/' + id + '/profile',
    })
  }

  getByIdBatch(ids) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/contact/vids/batch',
      qs: { vid: ids },
      qsStringifyOptions: { indices: false },
    })
  }

  getByToken(token) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/contact/utk/' + token + '/profile',
    })
  }

  delete(id) {
    return this.client._request({
      method: 'DELETE',
      path: '/contacts/v1/contact/vid/' + id,
    })
  }

  update(id, data) {
    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/contact/vid/' + id + '/profile',
      body: data,
    })
  }

  create(data) {
    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/contact',
      body: data,
    })
  }

  createOrUpdate(email, data) {
    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/contact/createOrUpdate/email/' + email,
      body: data,
    })
  }

  // note: response to successful batch update is undefined by design : http://developers.hubspot.com/docs/methods/contacts/batch_create_or_update
  createOrUpdateBatch(data) {
    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/contact/batch',
      body: data,
    })
  }

  search(query, options) {
    if (!options) options = {}
    options.q = query
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/search/query',
      qs: options,
    })
  }
}

module.exports = Contact
