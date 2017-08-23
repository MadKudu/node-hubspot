const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')

describe('oauth', function () {
  if (!process.env.access_token) { return } // hard to reproduce on CI. local testing only for now

  const hubspot = new Hubspot({ accessToken: process.env.access_token })

  describe('getAuthorizationUrl', function () {
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
    it('should return an accessToken, given a refreshToken', function () {
      const params = {
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        redirect_uri: process.env.redirect_uri,
        refresh_token: process.env.refresh_token
      }
      return hubspot.oauth.refreshAccessToken(params).then(res => {
        expect(res.refresh_token).to.equal(params.refresh_token)
        expect(res).to.have.a.property('access_token')
        expect(hubspot.auth.bearer).to.equal(res.access_token)
      })
    })
  })
})
