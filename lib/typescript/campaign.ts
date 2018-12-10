import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

declare class Campaign {
  get(opts?: {}): RequestPromise
  get(cb: RequestCallback): void
  get(opts: {}, cb: RequestCallback): void

  getOne(id: number, appId: number): RequestPromise
  getOne(id: number, appId: number, cb: RequestCallback): void

  events(opts?: {}): RequestPromise
  events(cb: RequestCallback): void
  events(opts: {}, cb: RequestCallback): void
}

export { Campaign }
