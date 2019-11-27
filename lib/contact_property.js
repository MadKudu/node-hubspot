class Properties {
  constructor(client) {
    this.client = client
  }

  getAll(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/properties/v1/contacts/properties',
      qs: options,
    })
  }

  get(options) {
    return this.getAll(options)
  }

  getByName(name) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/properties/v1/contacts/properties/named/${name}`,
    })
  }

  create(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/properties/v1/contacts/properties',
      body: data,
    })
  }

  update(name, data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/properties/v1/contacts/properties/named/${name}`,
      body: data,
    })
  }

  delete(name) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/properties/v1/contacts/properties/named/${name}`,
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

  getGroups() {
    return this.client.apiRequest({
      method: 'GET',
      path: '/properties/v1/contacts/groups',
    })
  }

  createGroup(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/properties/v1/contacts/groups',
      body: data,
    })
  }

  updateGroup(name, data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/properties/v1/contacts/groups/named/${name}`,
      body: data,
    })
  }

  deleteGroup(name) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/properties/v1/contacts/groups/named/${name}`,
    })
  }
}

module.exports = Properties
