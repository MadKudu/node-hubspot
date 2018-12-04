import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

declare class Engagement {
  create(data: {}): RequestPromise
  create(data: {}, cb: RequestCallback): void

  get(opts?: {}): RequestPromise
  get(cb: RequestCallback): void
  get(opts: {}, cb: RequestCallback): void

  getRecentlyModified(opts?: {}): RequestPromise
  getRecentlyModified(cb: RequestCallback): void
  getRecentlyModified(opts: {}, cb: RequestCallback): void

  getAssociated(objectType: string, objectId: number, opts?: {}): RequestPromise
  getAssociated(
    objectType: string,
    objectId: number,
    cb: RequestCallback,
  ): RequestPromise
  getAssociated(
    objectType: string,
    objectId: number,
    opts: {},
    cb: RequestCallback,
  ): RequestPromise
}

export { Engagement }
