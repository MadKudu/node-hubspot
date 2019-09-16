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


  describe('getPortalInfo', function() {
    beforeEach(() => {
      hubspot = new Hubspot()
    })
    
    const accessToken = "fake_access_token"
    const getPortalInfoEndpoint = {
      path: `/oauth/v1/token/${accessToken}`,
      response: {
        "token": accessToken,
        "user": "test@hubspot.com",
        "hub_domain": "demo.hubapi.com",
        "scopes": [
          "contacts",
          "automation",
          "oauth"
        ],
        "hub_id": 62515,
        "app_id": 456,
        "expires_in": 21588,
        "user_id": 123,
        "token_type": "access"
      }
    }
    fakeHubspotApi.setupServer({ postEndpoints: [getPortalInfoEndpoint] })

    it('should return the Portal metadata for a given portal', function() {
      return hubspot.oauth.getPortalInfo(accessToken).then(response => {
        console.log(response)
        expect(response).to.be.a('object')
        expect(response).to.contain('hub_id')
      })
    })
  })
})
