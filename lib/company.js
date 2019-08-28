const Property = require('./company_property')

class Company {
  constructor(client) {
    this.client = client
    this.properties = new Property(this.client)
  }

  getById(id) {
    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/' + id,
    })
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/paged',
      qs: options,
      qsStringifyOptions: {
        arrayFormat: 'repeat',
      },
    })
  }

  getAll(options) {
    return this.get(options)
  }

  getRecentlyCreated(options) {
    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/recent/created',
      qs: options,
    })
  }

  getRecentlyModified(options) {
    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/recent/modified',
      qs: options,
    })
  }

  getByDomain(domain) {
    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/domain/' + domain,
    })
  }

  create(data) {
    return this.client._request({
      method: 'POST',
      path: '/companies/v2/companies/',
      body: data,
    })
  }

  delete(id) {
    return this.client._request({
      method: 'DELETE',
      path: '/companies/v2/companies/' + id,
    })
  }

  update(id, data) {
    return this.client._request({
      method: 'PUT',
      path: '/companies/v2/companies/' + id,
      body: data,
    })
  }

  updateBatch(data) {
    return this.client._request({
      method: 'POST',
      path: '/companies/v1/batch-async/update',
      body: data,
    })
  }

  addContactToCompany(data) {
    if (!data || !data.companyId || !data.contactVid) {
      return Promise.reject(
        new Error('companyId and contactVid params must be provided')
      )
    }

    return this.client._request({
      method: 'PUT',
      path:
        '/companies/v2/companies/' +
        data.companyId +
        '/contacts/' +
        data.contactVid,
    })
  }

  getContactIds(id, options) {
    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/' + id + '/vids',
      qs: options,
    })
  }

  getContacts(id, options) {
    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/' + id + '/contacts',
      qs: options,
    })
  }
}

module.exports = Company
