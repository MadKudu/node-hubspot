const qs = require('querystring')

class OAuth {
  constructor(client) {
    this.client = client
  }

  getAuthorizationUrl(newData) {
    const initialParams = {}
    if (this.client.clientId) initialParams.client_id = this.client.clientId
    if (this.client.redirectUri) initialParams.redirect_uri = this.client.redirectUri

    const params = Object.assign({}, initialParams, newData)
    return `https://app.hubspot.com/oauth/authorize?${qs.stringify(params)}`
  }

  getAccessToken(newData) {
    const initialData = {
      grant_type: 'authorization_code',
      client_id: this.client.clientId,
      client_secret: this.client.clientSecret,
      redirect_uri: this.client.redirectUri,
    }
    const form = Object.assign({}, initialData, newData)

    return this.client.apiRequest({
      method: 'POST',
      path: '/oauth/v1/token',
      form,
    })
  }

  refreshAccessToken(newData) {
    const initialData = {
      grant_type: 'refresh_token',
      client_id: this.client.clientId,
      client_secret: this.client.clientSecret,
      redirect_uri: this.client.redirectUri,
      refresh_token: this.client.refreshToken,
    }
    const form = Object.assign({}, initialData, newData)

    return this.client
      .apiRequest({
        method: 'POST',
        path: '/oauth/v1/token',
        form,
      })
      .then((results) => {
        const updatedAt = Math.floor(Date.now() / 1000) // current timestamp in seconds
        this.client.setAccessToken(results.access_token, results.expires_in, updatedAt) // refresh the new access_token on the client
        return results
      })
  }

  getPortalInfo(accessToken) {
    const token = accessToken || this.client.accessToken
    return this.client.apiRequest({
      method: 'GET',
      path: `/oauth/v1/access-tokens/${token}`,
    })
  }
}

module.exports = OAuth
