import { RequestPromise } from 'request-promise'

declare class Owner {
  get(opts?: {}): RequestPromise
}

export { Owner }
