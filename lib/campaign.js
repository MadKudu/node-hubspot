class Campaign {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/email/public/v1/campaigns',
      qs: options,
    })
  }

  getById(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/email/public/v1/campaigns/by-id',
      qs: options,
    })
  }

  getOne(id) {
    if (!id || typeof id === 'function') {
      const error = new Error('id parameter must be provided.')
      if (typeof id === 'function') {
        id(error)
      }
      return Promise.reject(error)
    }

    return this.client.apiRequest({
      method: 'GET',
      path: `/email/public/v1/campaigns/${id}`,
    })
  }

  events(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/email/public/v1/events',
      qs: options,
    })
  }
}

module.exports = Campaign
