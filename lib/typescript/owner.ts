import { RequestPromise } from 'request-promise'

declare class Owner {
  get(opts?: {}): RequestPromise

  getById(number: string): RequestPromise
}

export { Owner }
