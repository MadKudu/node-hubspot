import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

declare class Properties {
  get(): RequestPromise
  get(cb: RequestCallback): void

  getByName(name: string): RequestPromise
  getByName(name: string, cb: RequestCallback): void

  create(data: {}): RequestPromise
  create(data: {}, cb: RequestCallback): void

  update(name: string, data: {}): RequestPromise
  update(name: string, data: {}, cb: RequestCallback): void

  upsert(name: string, data: {}): RequestPromise
  // upsert(name: string, data: {}, cb: RequestCallback): void;

  getGroups(): RequestPromise
  getGroups(): RequestPromise

  createGroup(data: {}): void
  createGroup(data: {}, cb: RequestCallback): void

  updateGroup(name: string, data: {}): void
  updateGroup(name: string, data: {}, cb: RequestCallback): void

  deleteGroup(name: string): void
  deleteGroup(name: string, cb: RequestCallback): void

  delete(name: string): void
  delete(name: string, cb: RequestCallback): void
}

export { Properties }
