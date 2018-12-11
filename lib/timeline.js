const guid = require('./utils/guid')

class Timeline {
  constructor(client) {
    this.client = client
  }

  createEventType(applicationId, userId, data, cb) {
    data['applicationId'] = data['applicationId'] || applicationId
    const parameters = {
      method: 'POST',
      path: `/integrations/v1/${applicationId}/timeline/event-types?userId=${userId}`,
      body: data,
    }
    return this.client._request(parameters, cb)
  }

  updateEventType(applicationId, eventTypeId, data, cb) {
    data['applicationId'] = data['applicationId'] || applicationId
    const parameters = {
      method: 'PUT',
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventTypeId}`,
      body: data,
    }

    return this.client._request(parameters, cb)
  }

  createEventTypeProperty(applicationId, eventTypeId, userId, data, cb) {
    const parameters = {
      method: 'POST',
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventTypeId}/properties?userId=${userId}`,
      body: data,
    }

    return this.client._request(parameters, cb)
  }

  updateEventTypeProperty(applicationId, eventTypeId, propertyId, data, cb) {
    data['id'] = data['id'] || propertyId
    const parameters = {
      method: 'PUT',
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventTypeId}/properties`,
      body: data,
    }

    return this.client._request(parameters, cb)
  }

  createTimelineEvent(applicationId, eventTypeId, data, cb) {
    if (!data.id) {
      data.id = guid()
    }

    data.eventTypeId = data.eventTypeId || eventTypeId

    const parameters = {
      method: 'PUT',
      path: `/integrations/v1/${applicationId}/timeline/event`,
      body: data,
    }

    return this.client._request(parameters, cb)
  }
}

module.exports = Timeline
