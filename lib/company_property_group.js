class Groups {
  constructor(client) {
    this.client = client
  }

  getAll(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/properties/v1/companies/groups',
      qs: options,
    })
  }

  get(options) {
    return this.getAll(options)
  }

  create(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/properties/v1/companies/groups',
      body: data,
    })
  }

  update(name, data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/properties/v1/companies/groups/named/${name}`,
      body: data,
    })
  }

  upsert(data) {
    return this.create(data).catch((err) => {
      if (err.statusCode === 409) {
        // if 409, the property group already exists, update it
        return this.update(data.name, data)
      } else {
        throw err
      }
    })
  }
}

module.exports = Groups
