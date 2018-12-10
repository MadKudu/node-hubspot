import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'
import { Properties } from './contact_property'

declare class Contact {
  get(opts?: {}): RequestPromise
  get(cb: RequestCallback): void
  get(opts: {}, cb: RequestCallback): void

  getByEmail(email: string): RequestPromise
  getByEmail(email: string, cb: RequestCallback): void

  getByEmailBatch(email: string[]): RequestPromise
  getByEmailBatch(email: string[], cb: RequestCallback): void

  getById(number: string): RequestPromise
  getById(number: string, cb: RequestCallback): void

  getByIdBatch(ids: number[]): RequestPromise
  getByIdBatch(ids: number[], cb: RequestCallback): void

  getByToken(utk: string): RequestPromise
  getByToken(utk: string, cb: RequestCallback): void

  update(id: number, data: {}): RequestPromise
  update(id: number, data: {}, cb: RequestCallback): void

  create(data: {}): RequestPromise
  create(data: {}, cb: RequestCallback): void

  createOrUpdateBatch(data: any[]): RequestPromise
  createOrUpdateBatch(data: any[], cb: RequestCallback): void

  search(query: string): RequestPromise
  search(query: string, cb: RequestCallback): void

  getRecentlyCreated(opts: {}): RequestPromise
  getRecentlyCreated(cb: RequestCallback): void
  getRecentlyCreated(opts: {}, cb: RequestCallback): void

  getRecentlyModified(opts: {}): RequestPromise
  getRecentlyModified(cb: RequestCallback): void
  getRecentlyModified(opts: {}, cb: RequestCallback): void

  createOrUpdate(email: string, data: any[]): RequestPromise
  createOrUpdate(email: string, data: any[], cb: RequestCallback): void

  delete(id: number): RequestPromise
  delete(id: number, cb: RequestCallback): void

  properties: Properties
}

export { Contact }
