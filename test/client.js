const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')

describe('client', function () {
  let hubspot

  before(() => {
    hubspot = new Hubspot({ apiKey: 'demo' })
  })

  it('should instantiate all methods', function () {
    it('should heck to see if client has all endpoints defined', function () {
      expect(hubspot.campaigns).to.be.a('object')
      expect(hubspot.subscriptions).to.be.a('object')
      expect(hubspot.contacts).to.be.a('object')
      expect(hubspot.companies).to.be.a('object')
      expect(hubspot.deals).to.be.a('object')
      expect(hubspot.pipelines).to.be.a('object')
      expect(hubspot.broadcasts).to.be.a('object')
      expect(hubspot.lists).to.be.a('object')
      expect(hubspot.files).to.be.a('object')
      expect(hubspot.engagements).to.be.a('object')
      expect(hubspot.self).to.be.a('object')
    })
  })

  describe('getApiLimit', function () {
    it('should return the api limit', function () {
      return hubspot.getApiLimit().then(data => {
        // console.log(data)
        expect(data).to.be.an('object')
        expect(data.usageLimit).to.be.a('number')
        expect(data.currentUsage).to.be.a('number')
      })
    })

    it('should return from cache the second time', function () {
      return hubspot.getApiLimit().then(data => {
        // console.log(data)
        expect(data).to.be.an('object')
        expect(data.usageLimit).to.be.a('number')
        expect(data.currentUsage).to.be.a('number')
      })
    })
  })

  describe('OAuth2 - basic', function () {
    if (!process.env.access_token) { return } // hard to reproduce on CI. local testing only for now

    before(() => {
      hubspot = new Hubspot({ accessToken: process.env.access_token })
    })

    // can't figure out the scope for this

    // it('should return the api limit', function () {
    //   return hubspot.getApiLimit().then(data => {
    //     // console.log(data)
    //     expect(data).to.be.an('object')
    //     expect(data.usageLimit).to.be.a('number')
    //     expect(data.currentUsage).to.be.a('number')
    //   })
    // })

    it('should return the api limit', function () {
      return hubspot.contacts.get().then(data => { // access_key needs contacts scope
        expect(data.contacts).to.be.an('array')
      })
    })
  })
})
