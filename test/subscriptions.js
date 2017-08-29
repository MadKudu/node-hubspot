const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('subscriptions', function () {
  describe('get', function () {
    it('Should return a list of subscriptions', function () {
      return hubspot.subscriptions.get().then(data => {
        expect(data.timeline).to.be.a('array')
        expect(data.hasMore).to.equal(true)
      })
    })
  })
})
