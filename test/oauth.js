const { expect } = require('chai')
const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')

describe('oauth', function() {
  let hubspot

  describe('getAuthorizationUrl', function() {
    beforeEach(() => {
      hubspot = new Hubspot()
    })

    it('should return the correct authorizationUrl for a given app', function() {
      const params = {
        client_id: 'fake_client_id',
        scopes: 'some scopes',
        redirect_uri: 'take_me_to_the_ballpark',
      }
      const uri = hubspot.oauth.getAuthorizationUrl(params)
      expect(uri).to.be.a('string')
      expect(uri).to.contain('scopes=some%20scopes')
    })
  })

  describe('getAccessToken', function() {
    const code = 'a_fake_code'
    const clientProperties = {
      clientId: 'fake_client_id',
      clientSecret: 'fake_client_secret',
      redirectUri: 'some-redirect-uri',
    }
    const expectedResponse = {
      refresh_token: 'a_fake_refresh_token',
      access_token: 'a_fake_access_token',
      expires_in: 21600,
    }
    const oauthTokenEndpoint = {
      path: '/oauth/v1/token',
      request: {
        grant_type: 'authorization_code',
        client_id: clientProperties.clientId,
        client_secret: clientProperties.clientSecret,
        redirect_uri: clientProperties.redirectUri,
        code,
      },
      response: expectedResponse,
    }
    fakeHubspotApi.setupServer({ postEndpoints: [oauthTokenEndpoint] })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should return a token from hubspot', function() {
        hubspot = new Hubspot(clientProperties)

        return hubspot.oauth.getAccessToken({ code }).then(data => {
          expect(data).to.deep.equal(expectedResponse)
        })
      })
    }
  })

  describe('refreshAccessToken', function() {
    const clientProperties = {
      clientId: 'fake_client_id',
      clientSecret: 'fake_client_secret',
      redirectUri: 'some-redirect-uri',
      refreshToken: 'a_fake_refresh_token',
      accessToken: 'a_fake_access_token',
    }
    const expectedResponse = {
      refresh_token: 'a_new_fake_refresh_token',
      access_token: 'a_new_fake_access_token',
      expires_in: 21600,
    }
    const oauthTokenEndpoint = {
      path: '/oauth/v1/token',
      request: {
        grant_type: 'refresh_token',
        client_id: clientProperties.clientId,
        client_secret: clientProperties.clientSecret,
        redirect_uri: clientProperties.redirectUri,
        refresh_token: clientProperties.refreshToken,
      },
      response: expectedResponse,
    }
    fakeHubspotApi.setupServer({ postEndpoints: [oauthTokenEndpoint] })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should return a token from hubspot', function() {
        hubspot = new Hubspot(clientProperties)

        return hubspot.oauth.refreshAccessToken().then(data => {
          expect(data).to.deep.equal(expectedResponse)
        })
      })
    }
  })
})
