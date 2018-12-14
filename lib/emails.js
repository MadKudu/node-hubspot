class Email {
  constructor(client) {
    this.client = client
  }

  sendTransactionalEmail(data, cb) {
    return this.client._request(
      {
        method: 'POST',
        path: '/email/public/v1/singleEmail/send',
        body: data,
      },
      cb,
    )
  }
}

module.exports = Email
