class Properties {
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
      path: '/contacts/v2/properties',
      qs: options
    }, cb)
  }
}

module.exports = Properties
