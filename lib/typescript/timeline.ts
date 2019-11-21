import { RequestPromise } from 'request-promise'

declare class Timeline {
  createEventType(applicationId: number, userId: number, data: {}): RequestPromise

  updateEventType(applicationId: number, eventTypeId: number, data: {}): RequestPromise

  createEventTypeProperty(applicationId: number, eventTypeId: number, userId: number, data: {}): RequestPromise

  updateEventTypeProperty(applicationId: number, eventTypeId: number, propertyId: number, data: {}): RequestPromise

  createTimelineEvent(applicationId: number, eventTypeId: number, data: {}): RequestPromise
}
export { Timeline }
