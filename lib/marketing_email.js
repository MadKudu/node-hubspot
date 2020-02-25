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

  clone(id, data) {
    return this.client.apiRequest({
      method: 'POST',
      path: `/marketing-emails/v1/emails/${id}/clone`,
      body: data,
    })
  }

  delete(id) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/marketing-emails/v1/emails/${id}`,
    })
  }

  versions(id) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/marketing-emails/v1/emails/${id}/versions`,
    })
  }

  restore(id) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/marketing-emails/v1/emails/${id}/restore-deleted`,
    })
  }

  hasBufferedChanges(id) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/marketing-emails/v1/emails/${id}/has-buffered-changes`,
    })
  }

  statistics(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/marketing-emails/v1/emails/with-statistics`,
      qs: options,
    })
  }

  statisticsById(id) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/marketing-emails/v1/emails/with-statistics/${id}`,
    })
  }
}

module.exports = MarketingEmail
