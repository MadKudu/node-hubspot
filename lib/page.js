class Page {
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
      path: '/content/api/v2/pages',
      qs: options
    }, cb)
  }
}

module.exports = Page
