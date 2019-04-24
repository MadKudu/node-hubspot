class Integrations {
  constructor(client) {
    this.client = client
  }

  getAccountDetails() {
    return this.client._request({
      method: 'GET',
      path: '/integrations/v1/me',
    })
  }
}

module.exports = Integrations
