import { RequestPromise } from 'request-promise'

declare class Engagement {
  create(data: {}): RequestPromise

  get(opts?: {}): RequestPromise

  update(engagementId: string, data: {}): RequestPromise

  getRecentlyModified(opts?: {}): RequestPromise

  getAssociated(objectType: string, objectId: number, opts?: {}): RequestPromise

  getCallDispositions(): RequestPromise
}

export { Engagement }
