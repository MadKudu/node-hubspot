class Subscription {
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
      path: '/email/public/v1/subscriptions/timeline',
      qs: options
    }, cb)
  }
}

module.exports = Subscription
