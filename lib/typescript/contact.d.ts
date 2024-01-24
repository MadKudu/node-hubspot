import { RequestPromise } from 'request-promise'
import { Properties } from './contact_property'

declare class Contact {
  get(opts?: {}): RequestPromise

  getAll(opts?: {}): RequestPromise

  getRecentlyModified(opts: {}): RequestPromise

  getRecentlyCreated(opts: {}): RequestPromise

  getByEmail(email: string): RequestPromise

  getByEmailBatch(email: string[]): RequestPromise

  getById(
    number: string,
    opts?: {
      property?: string[]
      propertyMode?: string
      formSubmissionMode?: string
      showListMemberships?: boolean
    }
  ): RequestPromise

  getByIdBatch(ids: number[]): RequestPromise

  getByToken(utk: string): RequestPromise

  delete(id: number): RequestPromise

  update(id: number, data: {}): RequestPromise

  create(data: {}): RequestPromise

  createOrUpdate(email: string, data: {}): RequestPromise

  updateByEmail(email: string, data: {}): RequestPromise

  createOrUpdateBatch(data: any[]): RequestPromise

  merge(primaryVid: string, secondaryVid: string): RequestPromise

  search(query: string, opts?: {}): RequestPromise

  addSecondaryEmail(vid: string, secondaryEmail: string): RequestPromise

  properties: Properties
}

export { Contact }
