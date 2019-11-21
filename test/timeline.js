const { expect } = require('chai')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const Hubspot = require('..')

const userId = process.env.USER_ID || 23456
const applicationId = process.env.APPLICATION_ID || 12345

describe('timeline', () => {
  const headerTemplate = '# Title for event {{id}}\nThis is an event for {{objectType}}'
  const detailTemplate = 'This event happened on {{#formatDate timestamp}}{{/formatDate}}'
  const hubspot = new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'some-fake-token',
  })
  const createEventType = () =>
    hubspot.timelines.createEventType(applicationId, userId, {
      name: 'Test Event Type',
      headerTemplate,
      detailTemplate,
    })
  const createEventTypeProperty = (eventTypeId) =>
    hubspot.timelines.createEventTypeProperty(applicationId, eventTypeId, userId, {
      name: 'NumericProperty',
      label: 'Numeric Property',
      propertyType: 'Numeric',
    })

  describe('createEventType', () => {
    const createEventTypeEndpoint = {
      path: `/integrations/v1/${applicationId}/timeline/event-types`,
      response: {
        name: 'Test Event Type',
        headerTemplate,
        detailTemplate,
        applicationId,
      },
      query: { userId },
    }
    fakeHubspotApi.setupServer({ postEndpoints: [createEventTypeEndpoint] })

    it('should create an event type', () => {
      return hubspot.timelines
        .createEventType(applicationId, userId, {
          name: 'Test Event Type',
          headerTemplate,
          detailTemplate,
        })
        .then((data) => {
          expect(data.headerTemplate).to.eq(headerTemplate)
          expect(data.detailTemplate).to.eq(detailTemplate)
        })
    })
  })

  describe('updateEventType', () => {
    let eventTypeId = 123
    const updateEventTypeEndpoint = {
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventTypeId}`,
      response: {
        name: 'Edited Event Type',
        headerTemplate,
        detailTemplate,
        applicationId,
      },
    }
    fakeHubspotApi.setupServer({ putEndpoints: [updateEventTypeEndpoint] })

    beforeEach(() => {
      if (process.env.NOCK_OFF) {
        return createEventType().then((data) => (eventTypeId = data.id))
      }
    })

    it('should update an event type', () => {
      return hubspot.timelines
        .updateEventType(applicationId, eventTypeId, {
          name: 'Edited Event Type',
          headerTemplate,
          detailTemplate,
        })
        .then((data) => {
          expect(data.name).to.eq('Edited Event Type')
        })
    })
  })

  describe('createEventTypeProperty', () => {
    let eventTypeId = 123
    const createEventTypePropertyEndpoint = {
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventTypeId}/properties`,
      response: {
        name: 'NumericProperty',
        label: 'Numeric Property',
        propertyType: 'Numeric',
      },
      query: { userId },
    }
    fakeHubspotApi.setupServer({
      postEndpoints: [createEventTypePropertyEndpoint],
    })

    beforeEach(() => {
      if (process.env.NOCK_OFF) {
        return createEventType().then((data) => {
          eventTypeId = data.id
        })
      }
    })

    it('should create an event type property', () => {
      return hubspot.timelines
        .createEventTypeProperty(applicationId, eventTypeId, userId, {
          name: 'NumericProperty',
          label: 'Numeric Property',
          propertyType: 'Numeric',
        })
        .then((data) => {
          expect(data.name).to.eq('NumericProperty')
        })
    })
  })

  describe('updateEventTypeProperty', () => {
    let eventTypeId = 123
    let eventTypePropertyId = 234
    const updateEventTypePropertyEndpoint = {
      path: `/integrations/v1/${applicationId}/timeline/event-types/${eventTypeId}/properties`,
      response: {
        name: 'NumericProperty',
        label: 'A new label',
        propertyType: 'Numeric',
        id: eventTypePropertyId,
      },
    }
    fakeHubspotApi.setupServer({
      putEndpoints: [updateEventTypePropertyEndpoint],
    })

    beforeEach(() => {
      if (process.env.NOCK_OFF) {
        return createEventType().then((data) => {
          eventTypeId = data.id
          return createEventTypeProperty(eventTypeId).then((data) => {
            eventTypePropertyId = data.id
          })
        })
      }
    })

    it('should update an event type property', () => {
      return hubspot.timelines
        .updateEventTypeProperty(applicationId, eventTypeId, eventTypePropertyId, {
          name: 'NumericProperty',
          label: 'A new label',
          propertyType: 'Numeric',
        })
        .then((data) => {
          expect(data.label).to.eq('A new label')
        })
    })
  })

  describe('createTimelineEvent', () => {
    let eventTypeId = 123
    const createTimelineEventEndpoint = {
      path: `/integrations/v1/${applicationId}/timeline/event`,
      request: (body) => {
        return !!body.id && body.email === 'test@test.com' && body.eventTypeId === eventTypeId
      },
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({
      putEndpoints: [createTimelineEventEndpoint],
    })

    beforeEach(() => {
      if (process.env.NOCK_OFF) {
        return createEventType().then((data) => {
          eventTypeId = data.id
        })
      }
    })

    it('should create an event', () => {
      return hubspot.timelines
        .createTimelineEvent(applicationId, eventTypeId, {
          email: 'test@test.com',
        })
        .then((data) => {
          expect(data).to.be.an('undefined')
        })
    })
  })
})
