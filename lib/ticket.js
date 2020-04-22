class Ticket {
  constructor(client) {
    this.client = client
  }

  getAll(properties) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/crm-objects/v1/objects/tickets/paged',
      qs: { properties },
    })
  }

  getById(id, properties) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/crm-objects/v1/objects/tickets/${id}`,
      qs: { properties },
    })
  }

  getBatchById(ids, properties) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/crm-objects/v1/objects/tickets/batch-read',
      body: { ids },
      qs: { properties },
    })
  }

  create(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/crm-objects/v1/objects/tickets',
      body: data,
    })
  }

  createBatch(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/crm-objects/v1/objects/tickets/batch-create',
      body: data,
    })
  }

  delete(id) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/crm-objects/v1/objects/tickets/${id}`,
    })
  }

  deleteBatch(ids) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/crm-objects/v1/objects/tickets/batch-delete',
      body: { ids },
    })
  }

  update(id, data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/crm-objects/v1/objects/tickets/${id}`,
      body: data,
    })
  }

  updateBatch(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/crm-objects/v1/objects/tickets/batch-update',
      body: data,
    })
  }
}

module.exports = Ticket
