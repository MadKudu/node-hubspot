const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

describe('workflows', () => {
  const workflowId = process.env.TEST_WORKFLOW_ID || 2641273
  let contactId

  before(() => {
    return hubspot.contacts.get().then((data) => {
      const firstContact = data.contacts[0]
      contactId = firstContact.vid
    })
  })

  describe('get', () => {
    it('Should get all workflows', () => {
      return hubspot.workflows.getAll().then((data) => {
        expect(data.workflows).to.be.a('array')
      })
    })

    it('Should get a specific workflow', () => {
      return hubspot.workflows
        .getAll()
        .then((data) => hubspot.workflows.get(data.workflows[0].id))
        .then((data) => {
          expect(data).to.be.a('object')
        })
    })
  })

  describe('create', () => {
    const payload = {
      name: 'Test Workflow',
      type: 'DRIP_DELAY',
      onlyEnrollsManually: true,
    }

    const workflowEndpoint = {
      path: '/automation/v3/workflows',
      request: payload,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [workflowEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should create an workflow', () => {
        return hubspot.workflows.create(payload).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('delete', () => {
    const workflowsEndpoint = {
      path: `/automation/v3/workflows/${workflowId}`,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      deleteEndpoints: [workflowsEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can delete an workflow', () => {
        return hubspot.workflows.delete(workflowId).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('enroll', () => {
    const email = 'fake_email'
    const workflowEndpoint = {
      path: `/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [workflowEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('Enrolls a contact into a workflow', () => {
        return hubspot.workflows.enroll(workflowId, email).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })
  describe('enroll', () => {
    const email = 'fake_email'
    const workflowEndpoint = {
      path: `/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      deleteEndpoints: [workflowEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('Unenrolls a contact into a workflow', () => {
        return hubspot.workflows.unenroll(workflowId, email).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('current', () => {
    it('Gets the workflows of a contact', () => {
      return hubspot.workflows.current(contactId).then((data) => {
        expect(data).to.be.an('array')
      })
    })
  })

  describe.skip('events', () => {})
})
