import { RequestPromise } from 'request-promise'

export interface IHubspotTicket {
  subject: string
  content: string
  due_date: number
  hs_ticket_priority: string
  hs_pipeline: number
  hs_pipeline_stage: number
}

declare class Ticket {
  getAll(opts?: {}): RequestPromise

  create(data: IHubspotTicket): RequestPromise

  createBatch(data: IHubspotTicket[]): RequestPromise

  delete(id: number): RequestPromise

  update(id: number, data: {}): RequestPromise
}

export { Ticket }
