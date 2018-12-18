import { RequestPromise } from 'request-promise'

declare class Properties {
  get(): RequestPromise

  getByName(name: string): RequestPromise

  create(data: {}): RequestPromise

  update(name: string, data: {}): RequestPromise

  upsert(name: string, data: {}): RequestPromise

  getGroups(): RequestPromise
  getGroups(): RequestPromise

  createGroup(data: {}): void

  updateGroup(name: string, data: {}): void

  deleteGroup(name: string): void

  delete(name: string): void
}

export { Properties }
