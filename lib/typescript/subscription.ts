import { RequestPromise } from 'request-promise'

declare class Subscription {
  get(opts?: {}): RequestPromise
}

export { Subscription }
