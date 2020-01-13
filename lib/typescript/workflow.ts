import { RequestPromise } from 'request-promise'

declare class Workflow {
  get(workflowId: number): RequestPromise

  getAll(): RequestPromise

  create(data: {}): RequestPromise

  delete(workflowId: string): RequestPromise

  enroll(workflowId: number, email: string): RequestPromise

  unenroll(workflowId: number, email: string): RequestPromise

  current(contactId: string): RequestPromise
}

export { Workflow }
