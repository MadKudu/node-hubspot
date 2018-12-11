const { expect } = require('chai')
const nockHelper = require('./helpers/nock_helper')
const Hubspot = require('..')

describe('broadcasts', function() {
  describe('get', function() {
    before(nockHelper.mockOauthEndpoint('/broadcast/v1/broadcasts', []))
    after(nockHelper.resetNock)

    it('Should return details on a set of broadcast messages', function() {
      const hubspot = new Hubspot({
        accessToken: process.env.ACCESS_TOKEN || 'fake-token',
      })

      return hubspot.broadcasts
        .get()
        .then(data => expect(data).to.be.a('array'))
    })
  })

  describe('get with a callback', function() {
    before(nockHelper.mockOauthEndpoint('/broadcast/v1/broadcasts', []))
    after(nockHelper.resetNock)

    it('Should invoke the callback with the broadcasts', function() {
      const hubspot = new Hubspot({
        accessToken: process.env.ACCESS_TOKEN || 'fake-token',
      })
      let result
      const fakeCallback = (_error, receivedValue) => (result = receivedValue)

      return hubspot.broadcasts
        .get(fakeCallback)
        .then(() => expect(result).to.be.a('array'))
    })
  })
})
