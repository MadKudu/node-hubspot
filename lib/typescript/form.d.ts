import { RequestPromise } from 'request-promise'

declare class Form {
  getAll(opts?: {}): RequestPromise

  get(opts?: {}): RequestPromise

  getById(guid: string): RequestPromise

  getFields(guid: string): RequestPromise

  getSingleField(guid: string, fieldName: string): RequestPromise

  getSubmissions(guid: string, opts?: {}): RequestPromise

  submit(portalId: string, formId: string, data: {}): RequestPromise

  create(data: {}): RequestPromise

  update(guid: string, data: {}): RequestPromise

  delete(guid: string): RequestPromise

  getUploadedFileByUrl(url: string): RequestPromise
}

export { Form }
