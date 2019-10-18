const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
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
})
