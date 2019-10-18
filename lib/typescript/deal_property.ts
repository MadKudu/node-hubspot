import { RequestPromise } from 'request-promise'
import { Groups } from './deal_property_group'

declare class Properties {
  get(query?: {}): RequestPromise

  getByName(name: string): RequestPromise

  create(data: {}): RequestPromise

  update(name: string, data: {}): RequestPromise

  upsert(name: string, data: {}): RequestPromise

  groups: Groups
}

export { Properties }
