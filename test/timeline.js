// const chai = require('chai')
// const expect = chai.expect

// const Hubspot = require('..')

// describe('timeline', function () {
//   let hubspot

//   before(() => {
//     const params = {
//       clientId: process.env.clientId,
//       clientSecret: process.env.clientSecret,
//       redirectUri: process.env.redirectUri,
//       refreshToken: process.env.refreshToken
//     }
//     hubspot = new Hubspot(params)
//     hubspot.oauth.refreshAccessToken()
//   })

//   describe('EventType', function () {
//     it('should create an event type', function () {
//       return hubspot.timeline
//         .createEventType(
//           123, // applicationId
//           123456, // userId
//           {
//             name: 'New Event Type', // name
//             headerTemplate:
//               '# Title for event {{id}}\nThis is an event for {{objectType}}', // headerTemplate
//             detailTemplate:
//               'This event happened on {{#formatDate timestamp}}{{/formatDate}}' // detailTemplate
//           }
//         )
//         .then(res => {})
//     })
//   })

//   describe('EventTypeProperty', function () {
//     it('should create an event type property', function () {
//       return hubspot.timeline
//         .createEventTypeProperty(
//           '123-567-890', // eventId
//           123, // applicationId
//           100, // userId
//           {
//             name: 'EventTypePropertyName', // name
//             label: 'label', // label
//             propertyType: 'String' // propertyType
//           }
//         )
//         .then(res => {})
//     })
//   })

//   describe('TimelineEvent', function () {
//     it('should create an event timeline event', function () {
//       return hubspot.timeline
//         .createEventTypeProperty(
//           123, // applicationId
//           222, // eventTypeId,
//           {
//             objectId: 321,
//             data: {
//               presentationId: '123'
//             }
//           }
//         )
//         .then(res => {})
//     })
//   })
// })
