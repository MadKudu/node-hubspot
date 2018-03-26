class Groups {
  constructor (client) {
    this.client = client
  }

  getAll (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/properties/v1/companies/groups',
      qs: options
    }, cb)
  }

  get (options, cb) {
    return this.getAll(options, cb)
  }

  create (data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/properties/v1/companies/groups',
      body: data
    }, cb)
  }

  update (name, data, cb) {
    return this.client._request({
      method: 'PUT',
      path: '/properties/v1/companies/groups/named/' + name,
      body: data
    }, cb)
  }

  upsert (data) {
    return this.create(data)
      .catch(err => {
        if (err.statusCode === 409) { // if 409, the property group already exists, update it
          return this.update(data.name, data)
        } else {
          throw err
        }
      })
  }
}

module.exports = Groups
