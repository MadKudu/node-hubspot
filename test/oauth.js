const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')

describe('oauth', function () {
  let hubspot

  describe('getAuthorizationUrl', function () {
    beforeEach(() => {
      hubspot = new Hubspot()
    })

    it('should return the correct authorizationUrl for a given app', function () {
      const params = {
        client_id: 'fake_client_id',
        scopes: 'some scopes',
        redirect_uri: 'take_me_to_the_ballpark'
      }
      const uri = hubspot.oauth.getAuthorizationUrl(params)
      expect(uri).to.be.a('string')
      expect(uri).to.contain('scopes=some%20scopes')
    })
  })

  describe('refreshAccessToken', function () {
    it('should return (and refresh) an accessToken, given a refreshToken - constructor', function () {
      const params = {
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        redirectUri: process.env.redirectUri,
        refreshToken: process.env.refreshToken
      }
      const hubspot = new Hubspot(params)
      if (!process.env.refreshToken) { return } // hard to reproduce on CI. local testing only for now
      return hubspot.oauth.refreshAccessToken().then(res => {
        expect(res.refresh_token).to.equal(params.refreshToken)
        expect(res).to.have.a.property('access_token')
        expect(hubspot.auth.bearer).to.equal(res.access_token)
      })
    })

    it('should return (and refresh) an accessToken, given a refreshToken - params', function () {
      const hubspot = new Hubspot({ accessToken: process.env.accessToken })
      if (!process.env.refreshToken) { return } // hard to reproduce on CI. local testing only for now
      const params = {
        client_id: process.env.clientId,
        client_secret: process.env.clientSecret,
        redirect_uri: process.env.redirectUri,
        refresh_token: process.env.refreshToken
      }
      return hubspot.oauth.refreshAccessToken(params).then(res => {
        expect(res.refresh_token).to.equal(params.refresh_token)
        expect(res).to.have.a.property('access_token')
        expect(hubspot.auth.bearer).to.equal(res.access_token)
      })
    })
  })
})
