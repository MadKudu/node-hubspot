import { RequestPromise } from 'request-promise'

declare class Subscription {
  get(opts?: {}): RequestPromise
  subscribeToAll(email: string): RequestPromise
  unsubscribe(email: string): RequestPromise
}

export { Subscription }
