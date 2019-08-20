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

  getById(id) {
    return this.client._request({
      method: 'GET',
      path: '/owners/v2/owners/' + id
    })
  }
}

module.exports = Owner
