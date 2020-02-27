const Property = require('./contact_property')

class Contact {
  constructor(client) {
    this.client = client
    this.properties = new Property(this.client)
  }

  get(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/contacts/v1/lists/all/contacts/all',
      qs: options,
    })
  }

  getAll(options) {
    return this.get(options)
  }

  getRecentlyModified(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/contacts/v1/lists/recently_updated/contacts/recent',
      qs: options,
    })
  }

  getRecentlyCreated(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/contacts/v1/lists/all/contacts/recent',
      qs: options,
    })
  }

  getByEmail(email) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/contacts/v1/contact/email/${email}/profile`,
    })
  }

  getByEmailBatch(emails) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/contacts/v1/contact/emails/batch',
      qs: { email: emails },
      qsStringifyOptions: { indices: false },
    })
  }

  getById(id, options) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/contacts/v1/contact/vid/${id}/profile`,
      qs: options,
    })
  }

  getByIdBatch(ids) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/contacts/v1/contact/vids/batch',
      qs: { vid: ids },
      qsStringifyOptions: { indices: false },
    })
  }

  getByToken(token) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/contacts/v1/contact/utk/${token}/profile`,
    })
  }

  delete(id) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/contacts/v1/contact/vid/${id}`,
    })
  }

  update(id, data) {
    return this.client.apiRequest({
      method: 'POST',
      path: `/contacts/v1/contact/vid/${id}/profile`,
      body: data,
    })
  }

  create(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/contacts/v1/contact',
      body: data,
    })
  }

  createOrUpdate(email, data) {
    return this.client.apiRequest({
      method: 'POST',
      path: `/contacts/v1/contact/createOrUpdate/email/${email}`,
      body: data,
    })
  }

  updateByEmail(email, data) {
    return this.client.apiRequest({
      method: 'POST',
      path: `/contacts/v1/contact/email/${email}/profile`,
      body: data,
    })
  }

  // note: response to successful batch update is undefined by design : http://developers.hubspot.com/docs/methods/contacts/batch_create_or_update
  createOrUpdateBatch(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/contacts/v1/contact/batch',
      body: data,
    })
  }

  merge(primaryVid, secondaryVid) {
    const data = {
      vidToMerge: secondaryVid,
    }
    return this.client.apiRequest({
      method: 'POST',
      path: `/contacts/v1/contact/merge-vids/${primaryVid}`,
      body: data,
    })
  }

  search(query, options) {
    if (!options) options = {}
    options.q = query
    return this.client.apiRequest({
      method: 'GET',
      path: '/contacts/v1/search/query',
      qs: options,
    })
  }

  addSecondaryEmail(vid, secondaryEmail) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/contacts/v1/secondary-email/${vid}/email/${secondaryEmail}`,
    })
  }
}

module.exports = Contact
