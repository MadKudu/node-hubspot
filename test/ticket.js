const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const apiKey = { apiKey: process.env.HUBSPOT_API_KEY || 'demo' }
const hubspot = new Hubspot(apiKey)

describe('tickets', () => {
  describe('getAll', () => {
    it('should return all tickets', () => {
      return hubspot.tickets.getAll().then((data) => {
        expect(data).to.be.an('object')
        expect(data.objects).to.be.a('array')
      })
    })
  })

  describe('create', () => {
    const newTicket = {
      properties: [
        {
          name: 'subject',
          value: 'This is an example ticket',
        },
        {
          name: 'content',
          value: 'Here are the details of the ticket.',
        },
        {
          name: 'hs_pipeline',
          value: '0',
        },
        {
          name: 'hs_pipeline_stage',
          value: '1',
        },
      ],
    }

    const ticketsEndpoint = {
      path: '/crm-objects/v1/objects/tickets',
      request: newTicket,
      response: { properties: { subject: { value: 'This is an example ticket' } } },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [ticketsEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should create a ticket in a given portal', () => {
        return hubspot.tickets.create(newTicket).then((data) => {
          expect(data).to.be.an('object')
          expect(data.properties.subject.value).to.equal('This is an example ticket')
        })
      })
    }
  })

  describe('delete', () => {
    const id = 'fake_id'

    const ticketsEndpoint = {
      path: `/crm-objects/v1/objects/tickets/${id}`,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      deleteEndpoints: [ticketsEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can delete', () => {
        return hubspot.tickets.delete(id).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('update', () => {
    const id = 'mock_id'
    const newData = {
      properties: [
        {
          name: 'content',
          value: 'This is now an updated ticket marked as high priority.',
        },
      ],
    }

    const ticketsEndpoint = {
      path: `/crm-objects/v1/objects/tickets/${id}`,
      request: newData,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      putEndpoints: [ticketsEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can update a ticket', () => {
        return hubspot.tickets.update(id, newData).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })
})
