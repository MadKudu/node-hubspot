const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')

describe('client', function() {
  this.timeout(10000)
  let hubspot

  describe('apiKey', function() {
    before(() => {
      hubspot = new Hubspot({ apiKey: 'demo' })
    })

    it('should instantiate all methods', function() {
      expect(hubspot.campaigns).to.be.an('object')
      expect(hubspot.subscriptions).to.be.an('object')
      expect(hubspot.contacts).to.be.an('object')
      expect(hubspot.companies).to.be.an('object')
      expect(hubspot.deals).to.be.an('object')
      expect(hubspot.pipelines).to.be.an('object')
      expect(hubspot.broadcasts).to.be.an('object')
      expect(hubspot.lists).to.be.an('object')
      expect(hubspot.files).to.be.an('object')
      expect(hubspot.engagements).to.be.an('object')
      expect(hubspot.workflows).to.be.an('object')
    })

    describe('getApiLimit', function() {
      it('should return the api limit', function() {
        return hubspot.getApiLimit().then(data => {
          expect(data).to.be.an('object')
          expect(data.usageLimit).to.be.a('number')
          expect(data.currentUsage).to.be.a('number')
        })
      })

      it('should return from cache the second time', function() {
        return hubspot.getApiLimit().then(data => {
          // console.log(data)
          expect(data).to.be.an('object')
          expect(data.usageLimit).to.be.a('number')
          expect(data.currentUsage).to.be.a('number')
        })
      })
    })
  })

  describe('bad apiKey', function() {
    it('should instantiate all methods', async () => {
      const hubspot = new Hubspot({ apiKey: 'bad' })
      try {
        await hubspot.getApiLimit()
      } catch (e) {
        expect(e instanceof Error).to.equal(true)
        expect(e.name).to.equal('StatusCodeError')
        expect(e.statusCode).to.equal(401)
      }
    })
  })

  describe('accessToken', function() {
    it('should fail if no auth at all', function(done) {
      const hubspot = new Hubspot()
      hubspot.contacts
        .get()
        .then(data => {
          // access_key needs contacts scope
          throw new Error('this call should have failed')
        })
        .catch(() => done())
    })

    it('should work with an accessToken', function() {
      if (!process.env.accessToken) {
        return
      } // hard to reproduce on CI. local testing only for now
      const hubspot = new Hubspot({ accessToken: process.env.accessToken })
      return hubspot.contacts.get().then(data => {
        // access_key used for test needs `contacts` scope
        expect(data.contacts).to.be.an('array')
      })
    })

    it('should work if we have a refreshToken and refresh the access_token', function() {
      if (!process.env.refreshToken) {
        return
      } // hard to reproduce on CI. local testing only for now
      const params = {
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        redirectUri: process.env.redirectUri,
        refreshToken: process.env.refreshToken,
      }
      const hubspot = new Hubspot(params)
      return hubspot
        .refreshAccessToken()
        .then(() => hubspot.contacts.get())
        .then(data => {
          // access_key needs contacts scope
          expect(data.contacts).to.be.an('array')
        })
    })
  })
})
