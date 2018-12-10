import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'
import { Properties } from './deal_property'

declare class Deal {
  get(opts?: {}): RequestPromise
  get(cb: RequestCallback): void
  get(opts: {}, cb: RequestCallback): void

  getRecentlyCreated(opts?: {}): RequestPromise
  getRecentlyCreated(cb: RequestCallback): void
  getRecentlyCreated(opts: {}, cb: RequestCallback): void

  getRecentlyModified(opts?: {}): RequestPromise
  getRecentlyModified(cb: RequestCallback): void
  getRecentlyModified(opts: {}, cb: RequestCallback): void

  getById(id: number): RequestPromise
  getById(id: number, cb: RequestCallback): void

  getAssociated(objectType: string, objectId: number, opts?: {}): RequestPromise
  getAssociated(
    objectType: string,
    objectId: number,
    cb: RequestCallback,
  ): RequestPromise
  getAssociated(
    objectType: string,
    objectId: number,
    opts: {},
    cb: RequestCallback,
  ): RequestPromise

  deleteById(id: number): RequestPromise
  deleteById(id: number, cb: RequestCallback): void

  updateById(id: number, data: {}): RequestPromise
  updateById(id: number, data: {}, cb: RequestCallback): void

  create(data: {}): RequestPromise
  create(data: {}, cb: RequestCallback): void

  associate(
    id: number,
    objectType: string,
    associatedObjectId: number,
  ): RequestPromise
  associate(
    id: number,
    objectType: string,
    associatedObjectId: number,
    cb: RequestCallback,
  ): RequestPromise

  removeAssociation(
    id: number,
    objectType: string,
    associatedObjectId: number,
  ): RequestPromise
  removeAssociation(
    id: number,
    objectType: string,
    associatedObjectId: number,
    cb: RequestCallback,
  ): RequestPromise

  properties: Properties
}

export { Deal }
