import { RequestPromise } from 'request-promise'

declare class OAuth {
  getAuthorizationUrl(opts?: {}): string
  getAccessToken(data: { code: string }): RequestPromise
  refreshAccessToken(): RequestPromise
  getPortalInfo(token?: string): RequestPromise
}

export { OAuth }
