import { RequestPromise } from 'request-promise'

declare class Engagement {
  create(data: {}): RequestPromise

  get(opts?: {}): RequestPromise

  getRecentlyModified(opts?: {}): RequestPromise

  getAssociated(objectType: string, objectId: number, opts?: {}): RequestPromise
}

export { Engagement }
