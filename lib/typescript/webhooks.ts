import { RequestPromise } from 'request-promise'

declare class Webhooks {
  getSubscription(appId: number): RequestPromise

  createSubscription(appId: number, subscription: {}): RequestPromise

  updateSubscription(appId: number, subscriptionId: string, subscription: {}): RequestPromise

  deleteSubscription(appId: number, subscriptionId: string): RequestPromise

  viewSettings(appId: number): RequestPromise

  updateSettings(appId: number, settings: {}): RequestPromise
}

export { Webhooks }
