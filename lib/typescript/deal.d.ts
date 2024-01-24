import { RequestPromise } from 'request-promise'
import { Properties } from './deal_property'

declare class Deal {
  get(opts?: {}): RequestPromise

  getRecentlyCreated(opts?: {}): RequestPromise

  getRecentlyModified(opts?: {}): RequestPromise

  getById(id: number, opts?: {}): RequestPromise

  getAssociated(objectType: string, objectId: number, opts?: {}): RequestPromise

  deleteById(id: number): RequestPromise

  updateById(id: number, data: {}): RequestPromise

  create(data: {}): RequestPromise

  updateBatch(data: {}[]): RequestPromise

  associate(id: number, objectType: string, associatedObjectId: number): RequestPromise

  removeAssociation(id: number, objectType: string, associatedObjectId: number): RequestPromise

  properties: Properties
}

export { Deal }
