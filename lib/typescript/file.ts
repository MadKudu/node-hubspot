import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

declare class File {
  get(opts?: {}): RequestPromise
  get(cb: RequestCallback): void
  get(opts: {}, cb: RequestCallback): void

  getOne(id: number): RequestPromise
  getOne(id: number, cb: RequestCallback): void
}

export { File }
