const { expect } = require('chai')
const nockHelper = require('./helpers/nock_helper')
const Hubspot = require('..')

const userId = process.env.USER_ID || 23456
const applicationId = process.env.APPLICATION_ID || 12345

describe('timeline', function() {
  const hubspot = new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'some-fake-token',
  })
  const headerTemplate =
    '# Title for event {{id}}\nThis is an event for {{objectType}}'
  const detailTemplate =
    'This event happened on {{#formatDate timestamp}}{{/formatDate}}'
  const createEventType = () =>
    hubspot.timelines.createEventType(applicationId, userId, {
      name: 'Test Event Type',
      headerTemplate,
      detailTemplate,
    })
  const createEventTypeProperty = eventTypeId =>
    hubspot.timelines.createEventTypeProperty(
      applicationId,
      eventTypeId,
      userId,
      {
        name: 'NumericProperty',
        label: 'Numeric Property',
        propertyType: 'Numeric',
      },
    )

  describe('createEventType', () => {
    beforeEach(
      nockHelper.mockPostOauthEndpoint(
        `/integrations/v1/${applicationId}/timeline/event-types`,
        {
          name: 'Test Event Type',
          headerTemplate,
          detailTemplate,
          applicationId,
        },
        { userId },
      ),
    )
    afterEach(nockHelper.resetNock)

    it('should create an event type', async () => {
      return hubspot.timelines
        .createEventType(applicationId, userId, {
          name: 'Test Event Type',
          headerTemplate,
          detailTemplate,
        })
        .then(data => {
          expect(data.headerTemplate).to.eq(headerTemplate)
          expect(data.detailTemplate).to.eq(detailTemplate)
        })
    })
  })

  describe('updateEventType', () => {
    let eventTypeId
    beforeEach(() => {
      if (process.env.NOCK_OFF) {
        return createEventType().then(data => (eventTypeId = data.id))
      } else {
        eventTypeId = 123
        return nockHelper.mockPutOauthEndpoint(
          `/integrations/v1/${applicationId}/timeline/event-types/123`,
          {
            name: 'Edited Event Type',
            headerTemplate,
            detailTemplate,
            applicationId,
          },
        )()
      }
    })
    afterEach(nockHelper.resetNock)

    it('should update an event type', async () => {
      return hubspot.timelines
        .updateEventType(applicationId, eventTypeId, {
          name: 'Edited Event Type',
          headerTemplate,
          detailTemplate,
        })
        .then(data => {
          expect(data.name).to.eq('Edited Event Type')
        })
    })
  })

  describe('createEventTypeProperty', () => {
    let eventTypeId
    beforeEach(() => {
      if (process.env.NOCK_OFF) {
        return createEventType().then(data => (eventTypeId = data.id))
      } else {
        eventTypeId = 123
        return nockHelper.mockPostOauthEndpoint(
          `/integrations/v1/${applicationId}/timeline/event-types/123/properties`,
          {
            name: 'NumericProperty',
            label: 'Numeric Property',
            propertyType: 'Numeric',
          },
          { userId },
        )()
      }
    })
    afterEach(nockHelper.resetNock)

    it('should create an event type property', async () => {
      return hubspot.timelines
        .createEventTypeProperty(applicationId, eventTypeId, userId, {
          name: 'NumericProperty',
          label: 'Numeric Property',
          propertyType: 'Numeric',
        })
        .then(data => {
          expect(data.name).to.eq('NumericProperty')
        })
    })
  })

  describe('updateEventTypeProperty', () => {
    let eventTypeId
    let eventTypePropertyId
    beforeEach(() => {
      if (process.env.NOCK_OFF) {
        return createEventType().then(data => {
          eventTypeId = data.id
          return createEventTypeProperty(eventTypeId).then(
            data => (eventTypePropertyId = data.id),
          )
        })
      } else {
        eventTypeId = 123
        eventTypePropertyId = 234
        return nockHelper.mockPutOauthEndpoint(
          `/integrations/v1/${applicationId}/timeline/event-types/123/properties`,
          {
            name: 'NumericProperty',
            label: 'A new label',
            propertyType: 'Numeric',
            id: eventTypePropertyId,
          },
        )()
      }
    })
    afterEach(nockHelper.resetNock)

    it('should update an event type property', async () => {
      return hubspot.timelines
        .updateEventTypeProperty(
          applicationId,
          eventTypeId,
          eventTypePropertyId,
          {
            name: 'NumericProperty',
            label: 'A new label',
            propertyType: 'Numeric',
          },
        )
        .then(data => {
          expect(data.label).to.eq('A new label')
        })
    })
  })

  describe('createTimelineEvent', () => {
    let eventTypeId
    beforeEach(() => {
      if (process.env.NOCK_OFF) {
        return createEventType().then(data => (eventTypeId = data.id))
      } else {
        eventTypeId = 123
        return nockHelper.mockFuzzyPutOauthEndpoint(
          `/integrations/v1/${applicationId}/timeline/event`,
          body =>
            !!body.id &&
            body.email === 'test@test.com' &&
            body.eventTypeId === eventTypeId,
          undefined,
        )()
      }
    })
    afterEach(nockHelper.resetNock)

    it('should create an event', async () => {
      return hubspot.timelines
        .createTimelineEvent(applicationId, eventTypeId, {
          email: 'test@test.com',
        })
        .then(data => {
          expect(data).to.be.an('undefined')
        })
    })
  })
})
