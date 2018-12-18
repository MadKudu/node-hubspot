import { RequestPromise } from 'request-promise'

declare class Page {
  get(opts?: {}): RequestPromise
}

export { Page }
