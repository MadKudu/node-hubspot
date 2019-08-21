import { RequestPromise } from 'request-promise'

export interface IHubspotCRMAssociation {
  fromObjectId: number
  toObjectId: number
  category: string
  definitionId: number
}

declare class Associations {
  create(data: IHubspotCRMAssociation): RequestPromise

  createBatch(data: IHubspotCRMAssociation[]): RequestPromise

  delete(data: IHubspotCRMAssociation): RequestPromise

  deleteBatch(data: IHubspotCRMAssociation[]): RequestPromise
}

export { Associations }
