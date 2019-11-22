const nockHelper = require('./nock_helper')

class FakeHubSpotApi {
  setupServer({
    basePath = null,
    demo = false,
    getEndpoints = [],
    postEndpoints = [],
    putEndpoints = [],
    patchEndpoints = [],
    deleteEndpoints = [],
  } = {}) {
    let maybeAddHapiKeyToQuery = (x) => x
    if (demo) {
      maybeAddHapiKeyToQuery = (parameters) => {
        parameters.query = parameters.query || {}
        parameters.query.hapikey = parameters.query.hapikey || 'demo'
        return parameters
      }
    }

    beforeEach(() => {
      nockHelper.disableNetConnect()
      nockHelper.mockRateLimit()
      if (basePath) nockHelper.setBasePath(basePath)
      getEndpoints.map(maybeAddHapiKeyToQuery).map(nockHelper.mockGetEndpoint)
      postEndpoints.map(maybeAddHapiKeyToQuery).map(nockHelper.mockPostEndpoint)
      putEndpoints.map(maybeAddHapiKeyToQuery).map(nockHelper.mockPutEndpoint)
      patchEndpoints.map(maybeAddHapiKeyToQuery).map(nockHelper.mockPatchEndpoint)
      deleteEndpoints.map(maybeAddHapiKeyToQuery).map(nockHelper.mockDeleteEndpoint)
    })

    afterEach(() => {
      nockHelper.clearBasePath()
      nockHelper.resetNock()
    })
  }
}

module.exports = new FakeHubSpotApi()
