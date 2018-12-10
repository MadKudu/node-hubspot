import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

import { Properties } from './company_property'

declare class Company {
  get(opts?: {}): RequestPromise
  get(cb: RequestCallback): void
  get(opts: {}, cb: RequestCallback): void

  getById(id: number): RequestPromise
  getById(id: number, cb: RequestCallback): void

  getRecentlyCreated(opts?: {}): RequestPromise
  getRecentlyCreated(cb: RequestCallback): void
  getRecentlyCreated(opts: {}, cb: RequestCallback): void

  getRecentlyModified(opts?: {}): RequestPromise
  getRecentlyModified(cb: RequestCallback): void
  getRecentlyModified(opts: {}, cb: RequestCallback): void

  getByDomain(domain: string): RequestPromise
  getByDomain(domain: string, cb: RequestCallback): void

  create(data: {}): RequestPromise
  create(data: {}, cb: RequestCallback): void

  addContactToCompany(data: {
    companyId: number
    contactVid: number
  }): RequestPromise
  addContactToCompany(
    data: { companyId: number; contactVid: number },
    cb: RequestCallback,
  ): void

  getContactIds(id: number, opts?: {}): RequestPromise
  getContactIds(id: number, cb: RequestCallback): void
  getContactIds(id: number, opts: {}, cb: RequestCallback): void

  getContacts(id: number, opts?: {}): RequestPromise
  getContacts(id: number, cb: RequestCallback): void
  getContacts(id: number, opts: {}, cb: RequestCallback): void

  update(id: number, data: {}): RequestPromise
  update(id: number, data: {}, cb: RequestCallback): void

  updateBatch(data: {}[]): RequestPromise
  updateBatch(data: {}[], cb: RequestCallback): void

  delete(id: number): RequestPromise
  delete(id: number, cb: RequestCallback): void

  properties: Properties
}

export { Company }
