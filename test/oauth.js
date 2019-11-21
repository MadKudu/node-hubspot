const { expect } = require('chai')
const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')

describe('oauth', () => {
  let hubspot

  describe('getAuthorizationUrl', () => {
    beforeEach(() => {
      hubspot = new Hubspot()
    })

    it('should return the correct authorizationUrl for a given app using provided params', () => {
      const params = {
        client_id: 'fake_client_id',
        scope: 'some scopes',
        redirect_uri: 'take_me_to_the_ballpark',
      }
      const expectedURL =
        'https://app.hubspot.com/oauth/authorize?client_id=fake_client_id&scope=some%20scopes&redirect_uri=take_me_to_the_ballpark'
      const uri = hubspot.oauth.getAuthorizationUrl(params)
      expect(uri).to.be.a('string')
      expect(uri).to.be.eq(expectedURL)
    })

    it('should return the correct authorizationUrl for a given app using Habspot constructor values', () => {
      hubspot = new Hubspot({
        clientId: 'fake_client_id',
        redirectUri: 'take_me_to_the_ballpark',
      })
      const params = {
        scope: 'some scopes',
      }
      const expectedURL =
        'https://app.hubspot.com/oauth/authorize?client_id=fake_client_id&redirect_uri=take_me_to_the_ballpark&scope=some%20scopes'
      const uri = hubspot.oauth.getAuthorizationUrl(params)
      expect(uri).to.be.a('string')
      expect(uri).to.be.eq(expectedURL)
    })

    it('should return the correct authorizationUrl for a given app and override initial params if provided', () => {
      hubspot = new Hubspot({
        clientId: 'fake_client_id',
        redirectUri: 'take_me_to_the_ballpark',
      })
      const params = {
        client_id: 'params_fake_client_id',
        scope: 'some scopes',
        redirect_uri: 'params_take_me_to_the_ballpark',
      }
      const expectedURL =
        'https://app.hubspot.com/oauth/authorize?client_id=params_fake_client_id&redirect_uri=params_take_me_to_the_ballpark&scope=some%20scopes'
      const uri = hubspot.oauth.getAuthorizationUrl(params)
      expect(uri).to.be.a('string')
      expect(uri).to.be.eq(expectedURL)
    })
  })

  describe('getPortalInfo', () => {
    const accessToken = 'fake_access_token'

    const clientProperties = {
      clientId: 'fake_client_id',
      clientSecret: 'fake_client_secret',
      redirectUri: 'some-redirect-uri',
    }
    const expectedResponse = {
      token: 'CJSP5qf1KhICAQEYs-gDIIGOBii1hQIyGQAf3xBKmlwHjX7OIpuIFEavB2-qYAGQsF4',
      user: 'test@hubspot.com',
      hub_domain: 'demo.hubapi.com',
      scopes: ['contacts', 'automation', 'oauth'],
      hub_id: 62515,
      app_id: 456,
      expires_in: 21588,
      user_id: 123,
      token_type: 'access',
    }

    const oauthTokenEndpoint = {
      path: `/oauth/v1/access-tokens/${accessToken}`,
      response: expectedResponse,
    }
    fakeHubspotApi.setupServer({ getEndpoints: [oauthTokenEndpoint] })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should return the correct info if token is provided', async () => {
        hubspot = new Hubspot(clientProperties)
        const data = await hubspot.oauth.getPortalInfo(accessToken)

        expect(data).to.be.a('object')
        expect(data).to.be.deep.equal(expectedResponse)
      })
    }

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should return the correct info if token is not provided', async () => {
        hubspot = new Hubspot(clientProperties)
        hubspot.setAccessToken(accessToken)
        const data = await hubspot.oauth.getPortalInfo()

        expect(data).to.be.a('object')
        expect(data).to.be.deep.equal(expectedResponse)
      })
    }
  })

  describe('getAccessToken', () => {
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
      it('should return a token from hubspot', () => {
        hubspot = new Hubspot(clientProperties)

        return hubspot.oauth.getAccessToken({ code }).then((data) => {
          expect(data).to.deep.equal(expectedResponse)
        })
      })
    }
  })

  describe('refreshAccessToken', () => {
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
      it('should return a token from hubspot', () => {
        hubspot = new Hubspot(clientProperties)

        return hubspot.oauth.refreshAccessToken().then((data) => {
          expect(data).to.deep.equal(expectedResponse)
        })
      })
    }
  })
})
