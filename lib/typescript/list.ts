import { RequestPromise } from 'request-promise'

declare class List {
  get(opts?: {}): RequestPromise

  getOne(id: number): RequestPromise

  getByIdBatch(ids: number[]): RequestPromise

  create(data: {}): RequestPromise

  delete(id: number): RequestPromise

  getContacts(id: number): RequestPromise

  getRecentContacts(id: number): RequestPromise

  getRecentUpdates(opts?: {}): RequestPromise

  addContacts(id: number, contactBody: {}): RequestPromise

  removeContacts(id: number, contactBody: {}): RequestPromise
}

export { List }
