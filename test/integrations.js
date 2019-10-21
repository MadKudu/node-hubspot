const { expect } = require('chai')
const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')

describe('integrations', () => {
  const hubspot = new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'some-fake-token',
  })

  describe('getAccountDetails', () => {
    const integrationsEndpoint = {
      path: '/integrations/v1/me',
      response: { integrations: [] },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [integrationsEndpoint] })

    it('should return account details', () => {
      return hubspot.integrations.getAccountDetails().then((data) => {
        expect(data).to.be.a('object')
        expect(data.integrations).to.be.a('array')
      })
    })
  })
})
