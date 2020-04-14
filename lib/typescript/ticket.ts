import { RequestPromise } from 'request-promise'

declare class Ticket {
  getAll(opts?: {}): RequestPromise
}

export { Ticket }
