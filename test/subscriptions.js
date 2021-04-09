const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

describe('subscriptions', () => {
  describe('get', () => {
    // you need to have at least 3 contacts with subscription for the test to work in your hubspot account
    // refer to this documentation > https://knowledge.hubspot.com/articles/kcs_article/contacts/manage-your-subscription-preferences-and-types
    it('Should return a list of subscriptions', () => {
      return hubspot.subscriptions.get().then((data) => {
        expect(data.timeline).to.be.a('array')
        expect(data.hasMore).to.equal(true)
      })
    })
  })

  describe('subscribeToAll', () => {
    const getEndpoint = {
      path: `/email/public/v1/subscriptions`,
      response: {
        subscriptionDefinitions: [
          {
            id: 10,
            portalId: 1,
            name: 'Product & Marketing Information',
            description: 'New product feature updates & Marketing offers.',
            active: true,
            internal: false,
            category: 'Marketing',
            channel: 'Email',
            order: 0,
            internalName: 'MARKETING_INFORMATION',
          },
          {
            id: 11,
            portalId: 1,
            name: 'One to One',
            description: 'One to One emails',
            active: true,
            internal: true,
            category: 'Sales',
            channel: 'Email',
            order: 5,
            internalName: 'ONE_TO_ONE',
          },
        ],
      },
    }

    const email = 'example@domain.com'
    const expectedBody = {
      subscriptionStatuses: [
        {
          id: 10,
          subscribed: true,
          optState: 'OPT_IN',
        },
        {
          id: 11,
          subscribed: true,
          optState: 'OPT_IN',
        },
      ],
    }
    const formEndpoint = {
      path: `/email/public/v1/subscriptions/${email}`,
      request: expectedBody,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      putEndpoints: [formEndpoint],
      getEndpoints: [getEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('Should return success', () => {
        return hubspot.subscriptions.subscribeToAll(email).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.equal(true)
        })
      })
    }
  })
})
