const { expect } = require('chai')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const Hubspot = require('..')

describe('Owners', function() {
  const ownersGetEndpoint = { path: '/owners/v2/owners', response: [] }
  fakeHubspotApi.setupServer({ demo: true, getEndpoints: [ownersGetEndpoint] })

  describe('get', function() {
    it('Should return all owners', function() {
      const hubspot = new Hubspot({ apiKey: 'demo' })

      return hubspot.owners.get().then(data => {
        expect(data).to.be.a('array')
      })
    })
  })

  describe('get with a callback', function() {
    it('Should invoke the callback with the owners', function() {
      const hubspot = new Hubspot({ apiKey: 'demo' })
      let result
      const fakeCallback = (_error, receivedValue) => (result = receivedValue)

      return hubspot.owners
        .get(fakeCallback)
        .then(() => expect(result).to.be.a('array'))
    })
  })
})
