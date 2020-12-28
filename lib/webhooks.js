class Webhooks {
  constructor(client) {
    this.client = client
  }

  getSubscription(appId) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/webhooks/v1/${appId}/subscriptions`,
    })
  }

  createSubscription(appId, subscription) {
    return this.client.apiRequest({
      method: 'POST',
      path: `/webhooks/v1/${appId}/subscriptions`,
      body: subscription,
    })
  }

  updateSubscription(appId, subscriptionId, subscription) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/webhooks/v1/${appId}/subscriptions/${subscriptionId}`,
      body: subscription,
    })
  }

  deleteSubscription(appId, subscriptionId) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/webhooks/v1/${appId}/subscriptions/${subscriptionId}`,
    })
  }

  viewSettings(appId) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/webhooks/v1/${appId}/settings`,
    })
  }

  updateSettings(appId, settings) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/webhooks/v1/${appId}/settings`,
      body: settings,
    })
  }
}

module.exports = Webhooks
