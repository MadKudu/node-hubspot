const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
let hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

describe('Engagements', () => {
  describe('Get All Engagements', () => {
    it('Should return engagement properties', () => {
      return hubspot.engagements.get().then((data) => {
        expect(data).to.be.an('object')
        expect(data.results).to.be.a('array')
        expect(data.results[0]).to.have.a.property('engagement')
      })
    })
  })

  describe('Get Recent Engagements', () => {
    // Required additional preconditions
    xit('Should return resent engagement properties', () => {
      return hubspot.engagements.getRecentlyModified().then((data) => {
        expect(data).to.be.an('object')
        expect(data.results).to.be.a('array')
        expect(data.results[0]).to.have.a.property('engagement')
        expect(data.total).to.be.above(0)
      })
    })
  })

  describe('Get Call Dispositions', () => {
    it('Should return a list of call dispositions', () => {
      return hubspot.engagements.getCallDispositions().then((data) => {
        expect(data).to.be.an('array')
        expect(data[0]).to.have.a.property('id')
        expect(data[0]).to.have.a.property('label')
      })
    })
  })

  describe('update', () => {
    const engagementId = 'fake_engagement_id'
    const clientProperties = {
      clientId: 'fake_client_id',
      clientSecret: 'fake_client_secret',
      redirectUri: 'some-redirect-uri',
      refreshToken: 'a_fake_refresh_token',
      accessToken: 'a_fake_access_token',
    }
    const expectedResponse = {
      updated: true,
    }
    const engagementsBody = {
      engagement: {
        ownerId: 1,
        timestamp: 1409172644778,
      },
      metadata: {
        body: 'a new note body',
      },
    }
    const engagementsEndpoint = {
      path: `/engagements/v1/engagements/${engagementId}`,
      request: engagementsBody,
      response: expectedResponse,
    }
    fakeHubspotApi.setupServer({ patchEndpoints: [engagementsEndpoint] })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should update engagement', () => {
        hubspot = new Hubspot(clientProperties)

        return hubspot.engagements.update(engagementId, engagementsBody).then((data) => {
          expect(data).to.be.an('object')
          expect(data).to.be.deep.equal(expectedResponse)
        })
      })
    }
  })

  // Test too brittle. First contactId doesn't necessarily has engagement

  // describe('Get Associated Engagements', function () {
  //   let contactId
  //
  //   before(function () {
  //     return hubspot.contacts.get().then(data => {
  //       contactId = data.contacts[0].vid
  //     })
  //   })
  //
  //   it('should return associated engagements for a contact id', function () {
  //     return hubspot.engagements.getAssociated('CONTACT', contactId).then(data => {
  //       expect(data).to.be.an('object')
  //       expect(data.results).to.be.a('array')
  //       expect(data.results[0]).to.have.a.property('engagement')
  //       expect(data.results[0]).to.have.a.property('associations')
  //       expect(data.results[0].associations).to.have.a.property('contactIds')
  //       expect(data.results[0].associations.contactIds[0]).to.equal(contactId)
  //     })
  //   })
  // })

  // describe('create', function () {
  //   it('Should create an engagement', function () {
  //     const payload = { 'engagement': { 'active': true, 'ownerId': 1, 'type': 'NOTE', 'timestamp': 1409172644778 }, 'associations': { 'contactIds': [2], 'companyIds': [ ], 'dealIds': [ ], 'ownerIds': [ ] }, 'metadata': { 'body': 'note body' } }
  //     return hubspot.engagements.create(payload).then(data => {
  //       expect(data.status).to.equal('error')
  //       expect(data.message).to.equal('one or more associations were invalid')
  //     })
  //   })
  // })
})
