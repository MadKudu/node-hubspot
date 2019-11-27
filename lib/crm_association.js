class Associations {
  constructor(client) {
    this.client = client
  }

  create(data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: '/crm-associations/v1/associations',
      body: data,
    })
  }

  createBatch(data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: '/crm-associations/v1/associations/create-batch',
      body: data,
    })
  }

  delete(data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: '/crm-associations/v1/associations/delete',
      body: data,
    })
  }

  deleteBatch(data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: '/crm-associations/v1/associations/delete-batch',
      body: data,
    })
  }
}

module.exports = Associations
