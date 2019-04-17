import { RequestPromise } from 'request-promise'

declare class Form {
  get(opts?: {}): RequestPromise
}

export { Form }
