class Campaign {
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
      path: '/email/public/v1/campaigns',
      qs: options
    }, cb)
  }

  getById (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/email/public/v1/campaigns/by-id',
      qs: options
    }, cb)
  }

  getOne (id, appId, cb) {
    if (!id || typeof id === 'function') {
      return cb(new Error('id parameter must be provided.'))
    }

    if (typeof appId === 'function') {
      cb = appId
      appId = null
    }

    var call = {
      method: 'GET',
      path: '/email/public/v1/campaigns/' + id
    }

    if (appId) {
      call.qs = {
        appId: appId
      }
    }

    return this.client._request(call, cb)
  }

  events (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/email/public/v1/events',
      qs: options
    }, cb)
  }
}

module.exports = Campaign
