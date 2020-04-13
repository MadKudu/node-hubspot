import { RequestPromise } from 'request-promise'

declare class Ticket {
  get(opts?: {}): RequestPromise
}

export { Ticket }
