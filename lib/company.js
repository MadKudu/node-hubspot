const Property = require('./company_property')

class Company {
  constructor (client) {
    this.client = client
    this.properties = new Property(this.client)
  }

  getById (id, cb) {
    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/' + id
    }, cb)
  }

  get (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/paged',
      qs: options,
      qsStringifyOptions: {
        arrayFormat: 'repeat'
      }
    }, cb)
  }

  getAll (options, cb) {
    return this.get(options, cb)
  }

  getRecentlyCreated (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/recent/created',
      qs: options
    }, cb)
  }

  getRecentlyModified (options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/recent/modified',
      qs: options
    }, cb)
  }

  getByDomain (domain, cb) {
    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/domain/' + domain
    }, cb)
  }

  create (data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/companies/v2/companies/',
      body: data
    }, cb)
  }

  delete (id, cb) {
    return this.client._request({
      method: 'DELETE',
      path: '/companies/v2/companies/' + id
    }, cb)
  }

  update (id, data, cb) {
    return this.client._request({
      method: 'PUT',
      path: '/companies/v2/companies/' + id,
      body: data
    }, cb)
  }

  updateBatch (data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/companies/v1/batch-async/update',
      body: data
    }, cb)
  }

  addContactToCompany (data, cb) {
    if (!data || !data.companyId || !data.contactVid) {
      return cb(new Error('companyId and contactVid params must be provided'))
    }

    return this.client._request({
      method: 'PUT',
      path: '/companies/v2/companies/' + data.companyId + '/contacts/' + data.contactVid
    }, cb)
  }

  getContactIds (id, options, cb) {
    if (typeof options === 'function') {
      cb = options
      options = {}
    }

    return this.client._request({
      method: 'GET',
      path: '/companies/v2/companies/' + id + '/vids',
      qs: options
    }, cb)
  }
}

module.exports = Company
