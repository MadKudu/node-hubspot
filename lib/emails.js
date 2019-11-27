class Email {
  constructor(client) {
    this.client = client
  }

  sendTransactionalEmail(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/email/public/v1/singleEmail/send',
      body: data,
    })
  }
}

module.exports = Email
