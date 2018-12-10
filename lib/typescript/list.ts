import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

declare class List {
  get(opts?: {}): RequestPromise
  get(cb: RequestCallback): void
  get(opts: {}, cb: RequestCallback): void

  getOne(id: number): RequestPromise
  getOne(id: number, cb: RequestCallback): void

  getContacts(id: number): RequestPromise
  getContacts(id: number, cb: RequestCallback): void
  getContacts(id: number, opts: {}, cb: RequestCallback): void

  getRecentContacts(id: number): RequestPromise
  getRecentContacts(id: number, cb: RequestCallback): void
  getRecentContacts(id: number, opts: {}, cb: RequestCallback): void

  addContacts(id: number, contactBody: {}): RequestPromise
  addContacts(id: number, contactBody: {}, cb: RequestCallback): void
}

export { List }
