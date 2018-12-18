class Subscription {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/email/public/v1/subscriptions/timeline',
      qs: options,
    })
  }
}

module.exports = Subscription
