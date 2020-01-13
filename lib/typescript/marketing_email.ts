import { RequestPromise } from 'request-promise'

declare class MarketingEmail {
  getAll(opts?: {}): RequestPromise

  get(opts?: {}): RequestPromise

  getById(id: string): RequestPromise

  create(data: {}): RequestPromise

  update(id: string, data: {}): RequestPromise

  delete(id: string): RequestPromise
}

export { MarketingEmail }
