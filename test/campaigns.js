const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const { expect } = require('chai')
const hubspot = () =>
  new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'fake-token',
  })

describe('campaigns', () => {
  describe('get', () => {
    const campaignsGetEndpoint = {
      path: '/email/public/v1/campaigns',
      response: { campaigns: [] },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [campaignsGetEndpoint] })

    it('Should return campaigns with IDs', () => {
      return hubspot()
        .campaigns.get()
        .then((data) => {
          expect(data.campaigns).to.be.an('array')
        })
    })
  })

  describe('getOne', () => {
    describe('successfully', () => {
      let campaignId = process.env.EMAIL_CAMPAIGN_ID || 345
      const campaignGetEndpoint = {
        path: `/email/public/v1/campaigns/${campaignId}`,
        response: { id: campaignId },
      }

      fakeHubspotApi.setupServer({
        getEndpoints: [campaignGetEndpoint],
      })

      beforeEach(() => {
        if (process.env.NOCK_OFF) {
          return hubspot()
            .campaigns.get()
            .then((data) => {
              campaignId = data.campaigns[0].id
            })
        }
      })

      it('Should return a campaign', () => {
        return hubspot()
          .campaigns.getOne(campaignId)
          .then((data) => {
            expect(data.id).to.eq(Number(campaignId))
          })
      })
    })

    describe('unsuccessfully', () => {
      it('Should error when not passed an id', () => {
        return hubspot()
          .campaigns.getOne()
          .catch((error) => {
            expect(error.message).to.eq('id parameter must be provided.')
          })
      })
    })
  })

  describe('getById', () => {
    const campaignsByIdEndpoint = {
      path: '/email/public/v1/campaigns/by-id',
      response: { campaigns: [] },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [campaignsByIdEndpoint] })

    it('Should return a campaign', () => {
      return hubspot()
        .campaigns.getById()
        .then((data) => {
          expect(data.campaigns).to.be.an('array')
        })
    })
  })

  describe('events', () => {
    const eventsGetEndpoint = {
      path: '/email/public/v1/events',
      response: { events: [] },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [eventsGetEndpoint] })

    it('Should return events', () => {
      return hubspot()
        .campaigns.events()
        .then((data) => {
          expect(data.events).to.be.an('array')
        })
    })
  })
})
