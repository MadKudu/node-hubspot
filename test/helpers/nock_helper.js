const nock = require('nock')

class NockHelper {
  mockRateLimit() {
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
      nock.disableNetConnect()
      this.mockRateLimit()
      nock('http://api.hubapi.com', { encodedQueryParams: true })
        .get(path)
        .query({ hapikey: 'demo' })
        .reply(200, data)
    }
  }

  mockOauthEndpoint(path, data) {
    return () => {
      nock.disableNetConnect()
      nock('http://api.hubapi.com')
        .get(path)
        .reply(200, data)
    }
  }

  mockPostOauthEndpoint(path, data, query = {}) {
    return () => {
      nock.disableNetConnect()
      nock('http://api.hubapi.com', { encodedQueryParams: true })
        .post(path, data)
        .query(query)
        .reply(200, data)
    }
  }

  mockPutOauthEndpoint(path, data, query = {}) {
    return () => {
      nock.disableNetConnect()
      nock('http://api.hubapi.com', { encodedQueryParams: true })
        .put(path, data)
        .query(query)
        .reply(200, data)
    }
  }

  mockFuzzyPutOauthEndpoint(path, regex, data, query = {}) {
    return () => {
      nock.disableNetConnect()
      nock('http://api.hubapi.com', { encodedQueryParams: true })
        .put(path, regex)
        .query(query)
        .reply(200, data)
    }
  }

  resetNock() {
    nock.cleanAll()
    nock.enableNetConnect()
  }
}

module.exports = new NockHelper()
