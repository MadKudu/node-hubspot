import { RequestPromise } from 'request-promise'

declare class Pipeline {
  get(opts?: {}): RequestPromise

  getById(number: string): RequestPromise
}

export { Pipeline }
