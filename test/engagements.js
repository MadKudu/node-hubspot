const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('Engagements', function () {
  describe('Get All Engagements', function () {
    it('Should return engagement properties', function () {
      return hubspot.engagements.get().then(data => {
        expect(data).to.be.an('object')
        expect(data.results).to.be.a('array')
        expect(data.results[0]).to.have.a.property('engagement')
      })
    })
  })

  describe('Get Recent Engagements', function () {
    it('Should return engagement properties', function () {
      return hubspot.engagements.getRecentlyModified().then(data => {
        expect(data).to.be.an('object')
        expect(data.results).to.be.a('array')
        expect(data.results[0]).to.have.a.property('engagement')
        expect(data.total).to.be.above(0)
      })
    })
  })

  describe('Get Associated Engagements', function () {
    let contactId

    before(function () {
      return hubspot.contacts.get().then(data => {
        contactId = data.contacts[0].vid
      })
    })

    it('should return associated engagements for a contact id', function () {
      return hubspot.engagements.getAssociated('CONTACT', contactId).then(data => {
        expect(data).to.be.an('object')
        expect(data.results).to.be.a('array')
        expect(data.results[0]).to.have.a.property('engagement')
        expect(data.results[0]).to.have.a.property('associations')
        expect(data.results[0].associations).to.have.a.property('contactIds')
        expect(data.results[0].associations.contactIds[0]).to.equal(contactId)
      })
    })
  })
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
