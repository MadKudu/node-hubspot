import { RequestPromise } from 'request-promise'

export declare class Owner {
  get(opts?: {}): RequestPromise
  getById(ownerId: number | string, opts?: {}): RequestPromise
}

export enum OwnerType {
  person = 'PERSON',
}

export enum RemoteType {
  hubspot = 'HUBSPOT',
}

export interface OwnerRemote {
  portalId: number
  ownerId: number
  remoteId: string
  remoteType: RemoteType
  active: boolean
}

export interface OwnerInterface {
  portalId: number
  ownerId: number
  type: OwnerType
  firstName: string
  lastName: string
  email: string
  createdAt: number
  updatedAt: number
  remoteList: OwnerRemote[]
  hasContactsAccess: boolean
  activeUserId: number
  userIdIncludingInactive: number
  isActive: boolean
}
