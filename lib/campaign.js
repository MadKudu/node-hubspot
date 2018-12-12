class Campaign {
  constructor(client) {
    this.client = client
  }

  get(options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request(
      {
        method: 'GET',
        path: '/email/public/v1/campaigns',
        qs: options,
      },
      cb,
    )
  }

  getById(options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request(
      {
        method: 'GET',
        path: '/email/public/v1/campaigns/by-id',
        qs: options,
      },
      cb,
    )
  }

  getOne(id, cb) {
    if (!id || typeof id === 'function') {
      const error = new Error('id parameter must be provided.')
      if (typeof id === 'function') {
        id(error)
      }
      return Promise.reject(error)
    }

    return this.client._request(
      {
        method: 'GET',
        path: '/email/public/v1/campaigns/' + id,
      },
      cb,
    )
  }

  events(options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request(
      {
        method: 'GET',
        path: '/email/public/v1/events',
        qs: options,
      },
      cb,
    )
  }
}

module.exports = Campaign
