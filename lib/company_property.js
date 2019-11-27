const Group = require('./company_property_group')

class Properties {
  constructor(client) {
    this.client = client
    this.groups = new Group(this.client)
  }

  getAll(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/properties/v1/companies/properties',
      qs: options,
    })
  }

  get(options) {
    return this.getAll(options)
  }

  getByName(name) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/properties/v1/companies/properties/named/${name}`,
    })
  }

  create(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/properties/v1/companies/properties',
      body: data,
    })
  }

  update(name, data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/properties/v1/companies/properties/named/${name}`,
      body: data,
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
