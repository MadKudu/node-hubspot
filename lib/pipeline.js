class Pipeline {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/deals/v1/pipelines',
      qs: options,
    })
  }
}

module.exports = Pipeline
