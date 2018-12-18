import { RequestPromise } from 'request-promise'

declare class Groups {
  get(query?: {}): RequestPromise

  create(data: {}): RequestPromise

  update(name: string, data: {}): RequestPromise

  upsert(name: string, data: {}): RequestPromise
}

export { Groups }
