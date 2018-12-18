import { RequestPromise } from 'request-promise'

declare class File {
  get(opts?: {}): RequestPromise

  getOne(id: number): RequestPromise
}

export { File }
