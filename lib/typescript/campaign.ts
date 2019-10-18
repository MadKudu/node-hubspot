import { RequestPromise } from 'request-promise'

declare class Campaign {
  get(opts?: {}): RequestPromise

  getOne(id: number, appId: number): RequestPromise

  events(opts?: {}): RequestPromise
}

export { Campaign }
