const nock = require('nock')

class NockHelper {
  mockRateLimit() {
    nock.disableNetConnect()
    nock('http://api.hubapi.com', { encodedQueryParams: true })
      .get('/integrations/v1/limit/daily')
      .reply(200, [
        {
          name: 'api-calls-daily',
          usageLimit: 160000,
          currentUsage: 19742,
          collectedAt: Date.now(),
          fetchStatus: 'CACHED',
          resetsAt: Date.now() + 24 * 60 * 60 * 1000,
        },
      ])
  }

  mockEndpoint(path, data) {
    return () => {
      this.mockRateLimit()
      nock('http://api.hubapi.com', { encodedQueryParams: true })
        .get(path)
        .query({ hapikey: 'demo' })
        .reply(200, data)
    }
  }

  mockPostEndpoint(path, data) {
    return () => {
      this.mockRateLimit()
      nock('http://api.hubapi.com', { encodedQueryParams: true })
        .post(path)
        .reply(200, data)
    }
  }

  mockOAuth() {
    nock('http://api.hubapi.com')
      .post('/oauth/v1/token')
      .reply(200, {
        access_token: 'qwerty782912',
      })
  }

  resetNock() {
    nock.cleanAll()
    nock.enableNetConnect()
  }
}

module.exports = new NockHelper()
