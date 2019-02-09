const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('workflows', function() {
  let workflowId = 2641273
  let contactId
  let contactEmail

  before(function() {
    return hubspot.contacts.get().then(data => {
      const firstContact = data.contacts[0]
      contactId = firstContact.vid
      contactEmail = firstContact['identity-profiles'][0].identities.find(
        obj => obj.type === 'EMAIL'
      ).value
    })
  })

  describe('get', function() {
    it('Should get all workflows', function() {
      return hubspot.workflows.getAll().then(data => {
        expect(data.workflows).to.be.a('array')
      })
    })

    it('Should get a specific workflow', function() {
      return hubspot.workflows.get(workflowId).then(data => {
        expect(data).to.be.a('object')
      })
    })
  })

  describe.skip('create', function() {})

  describe.skip('delete', function() {})

  describe('enroll', function() {
    it('Enrolls a contact into a workflow', function() {
      return hubspot.workflows.enroll(workflowId, contactEmail).then(data => {
        expect(true).to.equal(true)
      })
    })

    it('Unenrolls a contact into a workflow', function() {
      return hubspot.workflows.unenroll(workflowId, contactEmail).then(data => {
        expect(true).to.equal(true)
      })
    })
  })

  describe('current', function() {
    it('Gets the workflows of a contact', function() {
      return hubspot.workflows.current(contactId).then(data => {
        expect(data).to.be.an('array')
      })
    })
  })

  describe.skip('events')
})
