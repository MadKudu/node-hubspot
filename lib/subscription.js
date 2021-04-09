class Subscription {
  constructor(client) {
    this.client = client
  }

  get(options) {
    return this.client.apiRequest({
      method: 'GET',
      path: '/email/public/v1/subscriptions/timeline',
      qs: options,
    })
  }

  unsubscribe(email) {
    return this.client.apiRequest({
      method: 'PUT',
      path: `/email/public/v1/subscriptions/${email}`,
      body: {
        unsubscribeFromAll: true,
      },
    })
  }

  async subscribeToAll(email) {
    const subscriptionsTypes = await this.client.apiRequest({
      method: 'GET',
      path: `/email/public/v1/subscriptions`,
    })

    const subscriptionStatuses = subscriptionsTypes.subscriptionDefinitions
      .filter((subscriptionDefinition) => subscriptionDefinition.active)
      .map((subscriptionDefinition) => ({
        id: subscriptionDefinition.id,
        subscribed: true,
        optState: 'OPT_IN',
      }))

    return this.client.apiRequest({
      method: 'PUT',
      path: `/email/public/v1/subscriptions/${email}`,
      body: {
        subscriptionStatuses,
      },
    })
  }
}

module.exports = Subscription
