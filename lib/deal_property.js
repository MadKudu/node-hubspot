const Group = require('./deal_property_group')

class Properties {
  constructor(client) {
    this.client = client
    this.groups = new Group(this.client)
  }

  getAll(options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request(
      {
        method: 'GET',
        path: '/properties/v1/deals/properties',
        qs: options,
      },
      cb,
    )
  }

  get(options, cb) {
    return this.getAll(options, cb)
  }

  getByName(name, cb) {
    return this.client._request(
      {
        method: 'GET',
        path: '/properties/v1/deals/properties/named/' + name,
      },
      cb,
    )
  }

  create(data, cb) {
    return this.client._request(
      {
        method: 'POST',
        path: '/properties/v1/deals/properties',
        body: data,
      },
      cb,
    )
  }

  update(name, data, cb) {
    return this.client._request(
      {
        method: 'PUT',
        path: '/properties/v1/deals/properties/named/' + name,
        body: data,
      },
      cb,
    )
  }

  delete(name, cb) {
    return this.client._request(
      {
        method: 'DELETE',
        path: '/properties/v1/deals/properties/named/' + name,
      },
      cb,
    )
  }

  upsert(data) {
    return this.create(data).catch(err => {
      if (err.statusCode === 409) {
        // if 409, the property already exists, update it
        return this.update(data.name, data)
      } else {
        throw err
      }
    })
  }
}

module.exports = Properties
