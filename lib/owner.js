class Owner {
  constructor(client) {
    this.client = client
  }

  get(options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request(
      {
        method: 'GET',
        path: '/owners/v2/owners',
        qs: options,
      },
      cb,
    )
  }
}

module.exports = Owner
