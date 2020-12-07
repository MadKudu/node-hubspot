import { RequestPromise } from 'request-promise'

declare class MarketingEmail {
  getAll(opts?: {}): RequestPromise

  get(opts?: {}): RequestPromise

  getById(id: string): RequestPromise

  create(data: {}): RequestPromise

  update(id: string, data: {}): RequestPromise

  clone(id: string, data: {}): RequestPromise

  delete(id: string): RequestPromise

  versions(id: string): RequestPromise

  restore(id: string): RequestPromise

  hasBufferedChanges(id: string): RequestPromise

  statistics(opts?: {}): RequestPromise

  statisticsById(id: string): RequestPromise
}

export { MarketingEmail }
