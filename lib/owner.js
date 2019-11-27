class Owner {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/owners/v2/owners',
      qs: options,
    })
  }

  getById(id, options) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/owners/v2/owners/${id}`,
      qs: options,
    })
  }
}

module.exports = Owner
