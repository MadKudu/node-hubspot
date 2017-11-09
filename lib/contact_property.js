class Properties {
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
      path: '/contacts/v2/properties',
      qs: options
    }, cb)
  }

  get (options, cb) {
    return this.getAll(options, cb)
  }

  getByName (name, cb) {
    return this.client._request({
      method: 'GET',
      path: '/properties/v1/contacts/properties/named/' + name
    }, cb)
  }

  create (data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/properties/v1/contacts/properties',
      body: data
    }, cb)
  }

  update (name, data, cb) {
    return this.client._request({
      method: 'PUT',
      path: '/properties/v1/contacts/properties/named/' + name,
      body: data
    }, cb)
  }

  upsert (data) {
    return this.create(data)
      .catch(err => {
        if (err.statusCode === 409) { // if 409, the property already exists, update it
          return this.update(data.name, data)
        } else {
          throw err
        }
      })
  }

  getGroups (cb) {
    return this.client._request({
      method: 'GET',
      path: '/properties/v1/contacts/groups'
    }, cb)
  }

  createGroup (data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/properties/v1/contacts/groups',
      body: data
    }, cb)
  }

  updateGroup (name, data, cb) {
    return this.client._request({
      method: 'PUT',
      path: '/properties/v1/contacts/groups/named/' + name,
      body: data
    }, cb)
  }

  deleteGroup (name, cb) {
    return this.client._request({
      method: 'DELETE',
      path: '/properties/v1/contacts/groups/named/' + name
    }, cb)
  }
}

module.exports = Properties
