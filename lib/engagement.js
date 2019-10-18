class Engagement {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/engagements/v1/engagements/paged',
      qs: options,
    })
  }

  getRecentlyModified(options) {
    return this.client._request({
      method: 'GET',
      path: '/engagements/v1/engagements/recent/modified',
      qs: options,
    })
  }

  getAssociated(objectType, objectId, options) {
    return this.client._request({
      method: 'GET',
      path:
        '/engagements/v1/engagements/associated/' +
        objectType +
        '/' +
        objectId +
        '/paged',
      qs: options,
    })
  }

  create(data) {
    return this.client._request({
      method: 'POST',
      path: '/engagements/v1/engagements',
      body: data,
    })
  }

  getCallDispositions() {
    return this.client._request({
      method: 'GET',
      path: '/calling/v1/dispositions',
    })
  }
}

module.exports = Engagement
