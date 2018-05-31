// const chai = require('chai')
// const expect = chai.expect
const nockHelper = require('./helpers/nock_helper')

const Hubspot = require('..')

describe('timeline', function() {
  let hubspot

  before(() => {
    nockHelper.mockRateLimit()
    nockHelper.mockOAuth()

    nockHelper.mockPostEndpoint(
      /\/integrations\/v1\/[0-9]+\/timeline\/event-types'/,
      {
        id: 261,
        name: 'Test Event Type',
        headerTemplate:
          '# Title for event {{id}}\nThis is an event for {{objectType}}',
        detailTemplate:
          'This event happened on {{#formatDate timestamp}}{{/formatDate}}',
        applicationId: 123,
        objectType: 'CONTACT',
      },
    )

    const params = {
      clientId: '111',
      clientSecret: 'abcdef',
      redirectUri: 'https://example.com',
      refreshToken: 'azerty123',
    }
    hubspot = new Hubspot(params)
    hubspot.oauth.refreshAccessToken()
  })
  after(nockHelper.resetNock)

  describe('EventType', () => {
    it('should create an event type', async () => {
      const result = await hubspot.timeline.createEventType(
        123, // applicationId
        123456, // userId
        {
          name: 'New Event Type', // name
          headerTemplate:
            '# Title for event {{id}}\nThis is an event for {{objectType}}', // headerTemplate
          detailTemplate:
            'This event happened on {{#formatDate timestamp}}{{/formatDate}}', // detailTemplate
        },
      )
      console.log('result')
      console.log(result)
    })
  })

  // describe('EventTypeProperty', () => {
  //   it('should create an event type property', () => {
  //     return hubspot.timeline
  //       .createEventTypeProperty(
  //         '123-567-890', // eventId
  //         123, // applicationId
  //         100, // userId
  //         {
  //           name: 'EventTypePropertyName', // name
  //           label: 'label', // label
  //           propertyType: 'String', // propertyType
  //         },
  //       )
  //       .then(res => {})
  //   })
  // })

  // describe('TimelineEvent', () => {
  //   it('should create an event timeline event', () => {
  //     return hubspot.timeline
  //       .createEventTypeProperty(
  //         123, // applicationId
  //         222, // eventTypeId,
  //         {
  //           objectId: 321,
  //           data: {
  //             presentationId: '123',
  //           },
  //         },
  //       )
  //       .then(res => {})
  //   })
  // })
})
