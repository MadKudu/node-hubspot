const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('campaigns', function () {
  describe('get', function () {
    it('Should return campaign IDs with recent activity associated with the portal', function () {
      return hubspot.campaigns.get().then(data => {
        expect(data.campaigns).to.be.an('array')
        expect(data.hasMore).to.equal(true)
      })
    })
  })

  describe('getOne', function () {
    it('Should return campaign IDs with recent activity associated with the portal.', function () {
      return hubspot.campaigns.getOne('by-id').then(data => {
        expect(data.campaigns).to.be.an('array')
        expect(data.hasMore).to.equal(true)
      })
    })
  })

  describe('events', function () {
    it('Should return campaign IDs with recent activity associated with the portal', function () {
      return hubspot.campaigns.events().then(data => {
        expect(data.events).to.be.an('array')
        expect(data.hasMore).to.equal(true)
      })
    })
  })

  describe('getById', function () {
    // it('Should return campaign IDs with recent activity associated with the portal', function () {
    //   return hubspot.campaigns.getById().then(data => {
    //     expect(data.campaigns).to.be.an('array')
    //     expect(data.hasMore).to.equal(true)
    //   })
    // })
  })
})
