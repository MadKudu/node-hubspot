import { RequestPromise } from 'request-promise'

declare class Ticket {
  getAll(opts?: {}): RequestPromise

  create(data: {}): RequestPromise

  delete(id: number): RequestPromise
}

export { Ticket }
