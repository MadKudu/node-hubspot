class Owner {
  constructor (client) {
    this.client = client
  }

  get (cb) {
    return this.client._request({
      method: 'GET',
      path: '/owners/v2/owners/'
    }, cb)
  }
}

module.exports = Owner
