class Ticket {
  constructor(client) {
    this.client = client
  }

  getAll(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/crm-objects/v1/objects/tickets/paged',
      qs: options,
    })
  }

  create(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/crm-objects/v1/objects/tickets',
      body: data,
    })
  }

  delete(id) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/crm-objects/v1/objects/tickets/${id}`,
    })
  }
}

module.exports = Ticket
