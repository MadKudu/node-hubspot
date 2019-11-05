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

  subscribeToAll(email) {
    return this.client._request({
      method: 'PUT',
      path: `/email/public/v1/subscriptions/${email}`,
      body: {
        subscribed: true,
      },
    })
  }
}

module.exports = Subscription
