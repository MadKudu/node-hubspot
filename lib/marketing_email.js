class MarketingEmail {
  constructor(client) {
    this.client = client
  }

  getAll(options) {
    return this.get(options)
  }

  get(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/marketing-emails/v1/emails',
      qs: options,
    })
  }

  getById(id) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/marketing-emails/v1/emails/${id}`,
    })
  }

  create(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/marketing-emails/v1/emails',
      body: data,
    })
  }

  update(id, data) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/marketing-emails/v1/emails/${id}`,
      body: data,
    })
  }

  delete(id) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/marketing-emails/v1/emails/${id}`,
    })
  }
}

module.exports = MarketingEmail
