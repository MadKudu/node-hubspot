class Timeline {
  constructor (client) {
    this.client = client
  }

  createEventType (applicationId, userId, data, cb) {
    return this.client._request(
      {
        method: 'POST',
        path: `/integrations/v1/${applicationId}/timeline/event-types?userId=${userId}`,
        body: data
      },
      cb
    )
  }

  updateEventType (eventId, applicationId, data, cb) {
    const parameters = {
      method: 'PUT',
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventId}`,
      body: data
    }

    return this.client._request(parameters, cb)
  }

  createEventTypeProperty (eventId, applicationId, userId, data, cb) {
    const parameters = {
      method: 'POST',
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventId}/properties?userId=${userId}`,
      body: data
    }

    return this.client._request(parameters, cb)
  }

  updateEventTypeProperty (eventId, applicationId, propertyId, data, cb) {
    const parameters = {
      method: 'PUT',
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventId}/properties/${propertyId}`,
      body: data
    }

    return this.client._request(parameters, cb)
  }

  createTimelineEvent (applicationId, eventTypeId, data, cb) {
    if (
      !this.client.clientId ||
      !this.client.clientSecret ||
      !this.client.redirectUri ||
      !this.client.refreshToken
    ) {
      return cb(
        new Error(
          'You must init hubspot with a clientId/clientSecret/redirectUri/refreshToken and call hubspot.refreshAccessToken()'
        )
      )
    }

    if (!data || (!data.email && !data.utk && !data.objectId)) {
      return cb(
        new Error(
          'You must specify at least one of those in data : objectId, email, utk'
        )
      )
    }

    if (!data.id) {
      data.id = guid()
    }

    data.eventTypeId = eventTypeId

    const parameters = {
      method: 'PUT',
      path: `/integrations/v1/${applicationId}/timeline/event`,
      body: data
    }

    return this.client._request(parameters, cb)
  }
}

function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}

module.exports = Timeline
