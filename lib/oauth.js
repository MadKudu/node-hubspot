const _ = require('lodash')
const qs = require('querystring')

class OAuth {
  constructor (client) {
    this.client = client
  }

  getAuthorizationUrl (data) {
    const params = {
      scope: data.scope,
      client_id: data.client_id,
      redirect_uri: data.redirect_uri
    }
    return 'https://app.hubspot.com/oauth/authorize?' + qs.stringify(params)
  }

  getAccessToken (data, cb) {
    const form = _.extend({}, data, { grant_type: 'authorization_code' })
    return this.client._request({
      method: 'POST',
      path: '/oauth/v1/token',
      form
    }, cb)
  }

  refreshAccessToken (data) {
    const form = _.extend({}, data, { grant_type: 'refresh_token' })
    return this.client._request({
      method: 'POST',
      path: '/oauth/v1/token',
      form
    }).then(results => {
      this.client.setAccessToken(results.access_token) // refresh the new access_token on the client
      return results
    })
  }
}

module.exports = OAuth
