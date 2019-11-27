class Broadcast {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/broadcast/v1/broadcasts',
      qs: options,
    })
  }
}

module.exports = Broadcast
