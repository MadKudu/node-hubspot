class Pipeline {
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
      path: '/deals/v1/pipelines',
      qs: options
    }, cb)
  }
}

module.exports = Pipeline
