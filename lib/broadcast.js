class Broadcast {
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
      path: '/broadcast/v1/broadcasts',
      qs: options
    }, cb)
  }
}

module.exports = Broadcast
