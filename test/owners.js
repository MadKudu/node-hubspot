const { expect } = require('chai')
const nockHelper = require('./helpers/nock_helper')
const Hubspot = require('..')

describe('Owners', function() {
  describe('get', function() {
    before(nockHelper.mockEndpoint('/owners/v2/owners', []))
    after(nockHelper.resetNock)

    it('Should return all owners', function() {
      const hubspot = new Hubspot({ apiKey: 'demo' })

      return hubspot.owners.get().then(data => {
        expect(data).to.be.a('array')
      })
    })
  })

  describe('get with a callback', function() {
    before(nockHelper.mockEndpoint('/owners/v2/owners', []))
    after(nockHelper.resetNock)

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
