const nock = require('nock')

class NockHelper {
  mockRateLimit() {
    nock.disableNetConnect()
    nock('http://api.hubapi.com', { encodedQueryParams: true })
      .get('/integrations/v1/limit/daily')
      .query({ hapikey: 'demo' })
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

  resetNock() {
    nock.cleanAll()
    nock.enableNetConnect()
  }
}

module.exports = new NockHelper()
