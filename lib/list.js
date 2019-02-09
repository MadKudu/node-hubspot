class List {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists',
      qs: options,
    })
  }

  getOne(id) {
    if (!id) {
      return Promise.reject(new Error('id parameter must be provided.'))
    }

    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/' + id,
    })
  }

  create(data) {
    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/lists',
      body: data,
    })
  }

  delete(listId) {
    return this.client._request({
      method: 'DELETE',
      path: `/contacts/v1/lists/${listId}`,
    })
  }

  getContacts(id, options) {
    if (!id) {
      return Promise.reject(new Error('id parameter must be provided.'))
    }

    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/' + id + '/contacts/all',
      qs: options,
      qsStringifyOptions: { indices: false },
    })
  }

  getRecentContacts(id, options) {
    if (!id) {
      return Promise.reject(new Error('id parameter must be provided.'))
    }

    return this.client._request({
      method: 'GET',
      path: '/contacts/v1/lists/' + id + '/contacts/recent',
      qs: options,
      qsStringifyOptions: { indices: false },
    })
  }

  addContacts(id, contactBody) {
    if (!id) {
      return Promise.reject(new Error('id parameter must be provided.'))
    }
    if (!contactBody) {
      return Promise.reject(
        new Error('contactBody parameter must be provided.')
      )
    }

    var body = contactBody

    return this.client._request({
      method: 'POST',
      path: '/contacts/v1/lists/' + id + '/add',
      body,
    })
  }
}

module.exports = List
