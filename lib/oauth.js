const _ = require('lodash')
const qs = require('querystring')

class OAuth {
  constructor (client) {
    this.client = client
  }

  getAuthorizationUrl (data) {
    const params = {
      client_id: this.client.clientId,
      redirect_uri: this.client.redirectUri
    }
    _.extend(params, data)
    return 'https://app.hubspot.com/oauth/authorize?' + qs.stringify(params)
  }

  getAccessToken (data, cb) {
    const form = {
      grant_type: 'authorization_code',
      client_id: this.client.clientId,
      client_secret: this.client.clientSecret,
      redirect_uri: this.client.redirectUri
    }
    _.extend(form, data)
    return this.client._request({
      method: 'POST',
      path: '/oauth/v1/token',
      form
    }, cb)
  }

  refreshAccessToken (data, cb) {
    const form = {
      grant_type: 'refresh_token',
      client_id: this.client.clientId,
      client_secret: this.client.clientSecret,
      redirect_uri: this.client.redirectUri,
      refresh_token: this.client.refreshToken
    }
    _.extend(form, data)
    return this.client._request({
      method: 'POST',
      path: '/oauth/v1/token',
      form
    }).then(results => {
      this.client.setAccessToken(results.access_token) // refresh the new access_token on the client
      // cb(null, results)
      return results
    })
    // callback not implemented/test
    // .catch(err => {
    //   cb(err)
    //   throw err
    // })
  }
}

module.exports = OAuth
