const Group = require('./deal_property_group')

class Properties {
  constructor(client) {
    this.client = client
    this.groups = new Group(this.client)
  }

  getAll(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/properties/v1/deals/properties',
      qs: options,
    })
  }

  get(options) {
    return this.getAll(options)
  }

  getByName(name) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/properties/v1/deals/properties/named/${name}`,
    })
  }

  create(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/properties/v1/deals/properties',
      body: data,
    })
  }

  update(name, data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/properties/v1/deals/properties/named/${name}`,
      body: data,
    })
  }

  delete(name) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/properties/v1/deals/properties/named/${name}`,
    })
  }

  upsert(data) {
    return this.create(data).catch((err) => {
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
