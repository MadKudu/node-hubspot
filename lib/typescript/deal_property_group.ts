import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

declare class Groups {
  get(query?: {}): RequestPromise
  get(query: {}, cb: RequestCallback): void

  create(data: {}): RequestPromise
  create(data: {}, cb: RequestCallback): void

  update(name: string, data: {}): RequestPromise
  update(name: string, data: {}, cb: RequestCallback): void

  upsert(name: string, data: {}): RequestPromise
  // upsert(name: string, data: {}, cb: RequestCallback): void;
}

export { Groups }
