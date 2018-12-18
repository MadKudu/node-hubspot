import { RequestPromise } from 'request-promise'

declare class List {
  get(opts?: {}): RequestPromise

  getOne(id: number): RequestPromise

  getContacts(id: number): RequestPromise

  getRecentContacts(id: number): RequestPromise

  addContacts(id: number, contactBody: {}): RequestPromise
}

export { List }
