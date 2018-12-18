class Page {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/content/api/v2/pages',
      qs: options,
    })
  }
}

module.exports = Page
