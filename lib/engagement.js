class Engagement {
  constructor (client) {
    this.client = client
  }

  create (data, cb) {
    return this.client._request({
      method: 'POST',
      path: '/engagements/v1/engagements',
      body: data
    }, cb)
  }
}

module.exports = Engagement
