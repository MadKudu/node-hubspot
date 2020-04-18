import { RequestPromise } from 'request-promise'

export interface ITicket {
  subject: string
  content: string
  due_date: number
  hs_ticket_priority: string
  hs_pipeline: number
  hs_pipeline_stage: number
}

export interface ITicketUpdate {
  objectId: number
  properties: any[]
}

declare class Ticket {
  getAll(properties?: string[]): RequestPromise

  getById(id: number, properties?: string[]): RequestPromise

  getBatchById(ids: number[], properties?: string[]): RequestPromise

  create(data: ITicket): RequestPromise

  createBatch(data: ITicket[]): RequestPromise

  delete(id: number): RequestPromise

  deleteBatch(ids: number[]): RequestPromise

  update(id: number, data: {}): RequestPromise

  updateBatch(data: ITicketUpdate[]): RequestPromise
}

export { Ticket }
