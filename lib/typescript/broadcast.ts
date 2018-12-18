import { RequestPromise } from 'request-promise'

declare class Broadcast {
  get(opts?: {}): RequestPromise
}

export { Broadcast }
