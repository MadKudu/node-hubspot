import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

import { Groups } from './company_property_group'

declare class Properties {
  get(query?: {}): RequestPromise
  get(cb: RequestCallback): void
  get(query: {}, cb: RequestCallback): void

  getByName(name: string): RequestPromise
  getByName(name: string, cb: RequestCallback): void

  create(data: {}): RequestPromise
  create(data: {}, cb: RequestCallback): void

  update(name: string, data: {}): RequestPromise
  update(name: string, data: {}, cb: RequestCallback): void

  upsert(name: string, data: {}): RequestPromise
  // upsert(name: string, data: {}, cb: RequestCallback): void;

  groups: Groups
}

export { Properties }
