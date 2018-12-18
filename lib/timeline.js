const guid = require('./utils/guid')

class Timeline {
  constructor(client) {
    this.client = client
  }

  createEventType(applicationId, userId, data) {
    data['applicationId'] = data['applicationId'] || applicationId
    const parameters = {
      method: 'POST',
      path: `/integrations/v1/${applicationId}/timeline/event-types?userId=${userId}`,
      body: data,
    }
    return this.client._request(parameters)
  }

  updateEventType(applicationId, eventTypeId, data) {
    data['applicationId'] = data['applicationId'] || applicationId
    const parameters = {
      method: 'PUT',
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventTypeId}`,
      body: data,
    }

    return this.client._request(parameters)
  }

  createEventTypeProperty(applicationId, eventTypeId, userId, data) {
    const parameters = {
      method: 'POST',
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventTypeId}/properties?userId=${userId}`,
      body: data,
    }

    return this.client._request(parameters)
  }

  updateEventTypeProperty(applicationId, eventTypeId, propertyId, data) {
    data['id'] = data['id'] || propertyId
    const parameters = {
      method: 'PUT',
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventTypeId}/properties`,
      body: data,
    }

    return this.client._request(parameters)
  }

  createTimelineEvent(applicationId, eventTypeId, data) {
    if (!data.id) {
      data.id = guid()
    }

    data.eventTypeId = data.eventTypeId || eventTypeId

    const parameters = {
      method: 'PUT',
      path: `/integrations/v1/${applicationId}/timeline/event`,
      body: data,
    }

    return this.client._request(parameters)
  }
}

module.exports = Timeline
