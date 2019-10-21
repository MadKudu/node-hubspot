import { RequestPromise } from 'request-promise'

declare class Integrations {
  getAccountDetails(): RequestPromise
}

export { Integrations }
