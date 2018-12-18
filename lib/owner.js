class Owner {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/owners/v2/owners',
      qs: options,
    })
  }
}

module.exports = Owner
