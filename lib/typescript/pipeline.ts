import { RequestPromise } from 'request-promise'

declare class Pipeline {
  get(opts?: {}): RequestPromise
}

export { Pipeline }
