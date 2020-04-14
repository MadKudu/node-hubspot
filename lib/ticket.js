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
}

module.exports = Ticket
