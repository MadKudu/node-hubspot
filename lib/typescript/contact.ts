import { RequestPromise } from 'request-promise'
import { Properties } from './contact_property'

declare class Contact {
  get(opts?: {}): RequestPromise

  getByEmail(email: string): RequestPromise

  getByEmailBatch(email: string[]): RequestPromise

  getById(number: string): RequestPromise

  getByIdBatch(ids: number[]): RequestPromise

  getByToken(utk: string): RequestPromise

  update(id: number, data: {}): RequestPromise

  create(data: {}): RequestPromise

  createOrUpdateBatch(data: any[]): RequestPromise

  search(query: string): RequestPromise

  getRecentlyCreated(opts: {}): RequestPromise

  getRecentlyModified(opts: {}): RequestPromise

  createOrUpdate(email: string, data: {}): RequestPromise

  delete(id: number): RequestPromise

  properties: Properties
}

export { Contact }
