class Integrations {
  constructor(client) {
    this.client = client
  }

  getAccountDetails() {
    return this.client.apiRequest({
      method: 'GET',
      path: '/integrations/v1/me',
    })
  }
}

module.exports = Integrations
