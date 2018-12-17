const { expect } = require('chai')
const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')

describe('broadcasts', function() {
  const broadcastsGetEndpoint = {
    path: '/broadcast/v1/broadcasts',
    response: [],
  }
  fakeHubspotApi.setupServer({ getEndpoints: [broadcastsGetEndpoint] })

  describe('get', function() {
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
