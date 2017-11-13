class Engagement {
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
      path: '/engagements/v1/engagements/paged',
      qs: options
    }, cb)
  }

  getRecentlyModified (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/engagements/v1/engagements/recent/modified',
      qs: options
    }, cb)
  }

  getAssociated (objectType, objectId, options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/engagements/v1/engagements/associated/' + objectType + '/' + objectId + '/paged',
      qs: options
    }, cb)
  }

  create (data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/engagements/v1/engagements',
      body: data
    }, cb)
  }
}

module.exports = Engagement
