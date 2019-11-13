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
    const email = 'example@domain.com'
    const expectedBody = { subscribed: true }
    const formEndpoint = {
      path: `/email/public/v1/subscriptions/${email}`,
      request: expectedBody,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      putEndpoints: [formEndpoint],
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
