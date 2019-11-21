import { RequestPromise } from 'request-promise'

import { Properties } from './company_property'

declare class Company {
  get(opts?: {}): RequestPromise

  getById(id: number): RequestPromise

  getRecentlyCreated(opts?: {}): RequestPromise

  getRecentlyModified(opts?: {}): RequestPromise

  getByDomain(domain: string): RequestPromise

  create(data: {}): RequestPromise

  addContactToCompany(data: { companyId: number; contactVid: number }): RequestPromise

  getContactIds(id: number, opts?: {}): RequestPromise

  getContacts(id: number, opts?: {}): RequestPromise

  update(id: number, data: {}): RequestPromise

  updateBatch(data: {}[]): RequestPromise

  delete(id: number): RequestPromise

  properties: Properties
}

export { Company }
