const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const { expect } = require('chai')
const hubspot = () =>
  new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'fake-token',
  })

describe('campaigns', function() {
  describe('get', function() {
    const campaignsGetEndpoint = {
      path: '/email/public/v1/campaigns',
      response: { campaigns: [] },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [campaignsGetEndpoint] })

    it('Should return campaigns with IDs', function() {
      return hubspot()
        .campaigns.get()
        .then(data => {
          expect(data.campaigns).to.be.an('array')
        })
    })

    it('Should invoke a callback', function() {
      let result
      const fakeCallback = (_error, receivedValue) => (result = receivedValue)

      return hubspot()
        .campaigns.get(fakeCallback)
        .then(() => expect(result.campaigns).to.be.a('array'))
    })
  })

  describe('getOne', function() {
    const hubspotDemo = new Hubspot({ apiKey: 'demo' })

    describe('successfully', function() {
      let campaignId = 345
      const campaignGetEndpoint = {
        path: `/email/public/v1/campaigns/${campaignId}`,
        response: { id: campaignId },
      }
      fakeHubspotApi.setupServer({
        demo: true,
        getEndpoints: [campaignGetEndpoint],
      })

      beforeEach(() => {
        if (process.env.NOCK_OFF) {
          return hubspotDemo.campaigns.get().then(data => {
            campaignId = data.campaigns[0].id
          })
        }
      })

      it('Should return a campaign', function() {
        return hubspotDemo.campaigns.getOne(campaignId).then(data => {
          expect(data.id).to.eq(campaignId)
        })
      })

      it('Should take a callback as the second argument', function() {
        let result
        const fakeCallback = (_error, receivedValue) => (result = receivedValue)

        return hubspotDemo.campaigns
          .getOne(campaignId, fakeCallback)
          .then(() => {
            expect(result.id).to.eq(campaignId)
          })
      })
    })

    describe('unsuccessfully', function() {
      it('Should error when passed a callback as the first argument', function() {
        let result
        const fakeCallback = error => (result = error)

        return hubspotDemo.campaigns.getOne(fakeCallback).catch(() => {
          expect(result.message).to.eq('id parameter must be provided.')
        })
      })

      it('Should error when not passed an id', function() {
        return hubspotDemo.campaigns.getOne().catch(error => {
          expect(error.message).to.eq('id parameter must be provided.')
        })
      })
    })
  })

  describe('getById', function() {
    const campaignsByIdEndpoint = {
      path: '/email/public/v1/campaigns/by-id',
      response: { campaigns: [] },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [campaignsByIdEndpoint] })

    it('Should return a campaign', function() {
      return hubspot()
        .campaigns.getById()
        .then(data => {
          expect(data.campaigns).to.be.an('array')
        })
    })

    it('Should invoke a callback', function() {
      let result
      const fakeCallback = (_error, receivedValue) => (result = receivedValue)

      return hubspot()
        .campaigns.getById(fakeCallback)
        .then(() => expect(result.campaigns).to.be.a('array'))
    })
  })

  describe('events', function() {
    const eventsGetEndpoint = {
      path: '/email/public/v1/events',
      response: { events: [] },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [eventsGetEndpoint] })

    it('Should return events', function() {
      return hubspot()
        .campaigns.events()
        .then(data => {
          expect(data.events).to.be.an('array')
        })
    })

    it('Should invoke a callback', function() {
      let result
      const fakeCallback = (_error, receivedValue) => (result = receivedValue)

      return hubspot()
        .campaigns.events(fakeCallback)
        .then(() => expect(result.events).to.be.a('array'))
    })
  })
})
