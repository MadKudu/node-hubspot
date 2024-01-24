import { RequestPromise } from 'request-promise'

declare class Emails {
  sendTransactionalEmail(data: {}): RequestPromise
}

export { Emails }
