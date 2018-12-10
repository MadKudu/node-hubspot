import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

declare class Broadcast {
  get(opts?: {}): RequestPromise
  get(cb: RequestCallback): void
  get(opts: {}, cb: RequestCallback): void
}

export { Broadcast }
