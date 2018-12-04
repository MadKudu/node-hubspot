import { RequestCallback } from 'request'
import { RequestPromise } from 'request-promise'

declare class OAuth {
  getAuthorizationUrl(opts?: {}): string
  getAccessToken(data: { code: string }): RequestPromise
  getAccessToken(data: { code: string }, cb: RequestCallback): void
  refreshAccessToken(): RequestPromise
  refreshAccessToken(cb: RequestCallback): void
}

export { OAuth }
