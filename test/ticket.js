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
        expect(data.objects).to.be.an('array')
      })
    })

    it('should return all tickets with properties', () => {
      const properties = ['subject', 'content', 'hs_pipeline', 'hs_pipeline_stage']
      return hubspot.tickets.getAll(properties).then((data) => {
        expect(data).to.be.an('object')
        expect(data.objects).to.be.an('array')
      })
    })
  })

  describe('getById', () => {
    let ticketId

    before(() => {
      return hubspot.tickets.getAll().then((data) => {
        ticketId = data.objects[0].objectId
      })
    })

    it('should return a ticket by ID', () => {
      return hubspot.tickets.getById(ticketId).then((data) => {
        expect(data).to.be.an('object')
      })
    })

    it('should return a ticket by ID with properties', () => {
      const properties = ['subject', 'content', 'hs_pipeline', 'hs_pipeline_stage']
      return hubspot.tickets.getById(ticketId, properties).then((data) => {
        expect(data).to.be.an('object')
        expect(data.properties).to.be.an('object')
      })
    })
  })

  describe('getBatchById', () => {
    const ticketIds = ['fake_id_1', 'fake_id_2']

    const ticketsByIdEndpoint = {
      path: '/crm-objects/v1/objects/tickets/batch-read',
      request: { ids: ticketIds },
      response: { success: true },
    }
    fakeHubspotApi.setupServer({ postEndpoints: [ticketsByIdEndpoint], demo: true })

    it('should return multiple tickets by IDs', () => {
      return hubspot.tickets.getBatchById(ticketIds).then((data) => {
        expect(data).to.be.an('object')
        expect(data.success).to.be.eq(true)
      })
    })
  })

  describe('getBatchById with properties', () => {
    const ticketIds = ['fake_id_1', 'fake_id_2']

    const ticketsByIdEndpoint = {
      path: '/crm-objects/v1/objects/tickets/batch-read',
      query: { properties: ['subject', 'content', 'hs_pipeline', 'hs_pipeline_stage'] },
      request: { ids: ticketIds },
      response: { success: true },
    }
    fakeHubspotApi.setupServer({ postEndpoints: [ticketsByIdEndpoint], demo: true })

    it('should return multiple tickets by IDs with properties', () => {
      const properties = ['subject', 'content', 'hs_pipeline', 'hs_pipeline_stage']
      return hubspot.tickets.getBatchById(ticketIds, properties).then((data) => {
        expect(data).to.be.an('object')
        expect(data.success).to.be.eq(true)
      })
    })
  })

  describe('create', () => {
    const subjectValue = 'This is an example ticket'
    const newTicket = {
      properties: [
        {
          name: 'subject',
          value: subjectValue,
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
      response: { properties: { subject: { value: subjectValue } } },
    }

    fakeHubspotApi.setupServer({ postEndpoints: [ticketsEndpoint], demo: true })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should create a ticket in a given portal', () => {
        return hubspot.tickets.create(newTicket).then((data) => {
          expect(data).to.be.an('object')
          expect(data.properties.subject.value).to.equal(subjectValue)
        })
      })
    }
  })

  describe('createBatch', () => {
    const subjectValue = 'This is an example ticket'
    const anotherSubjectValue = 'This is another example ticket'
    const newTickets = [
      [
        {
          name: 'subject',
          value: subjectValue,
        },
        {
          name: 'content',
          value: 'Here are the details of the ticket.',
        },
        {
          name: 'hs_pipeline',
          value: 0,
        },
        {
          name: 'hs_pipeline_stage',
          value: 1,
        },
        {
          name: 'hs_ticket_priority',
          value: 'HIGH',
        },
      ],
      [
        {
          name: 'subject',
          value: anotherSubjectValue,
        },
        {
          name: 'content',
          value: 'Here are the details of the ticket.',
        },
        {
          name: 'hs_pipeline',
          value: 0,
        },
        {
          name: 'hs_pipeline_stage',
          value: 1,
        },
        {
          name: 'hs_ticket_priority',
          value: 'HIGH',
        },
      ],
    ]

    const ticketsEndpoint = {
      path: '/crm-objects/v1/objects/tickets/batch-create',
      request: newTickets,
      response: [{ subject: { value: subjectValue } }, { subject: { value: anotherSubjectValue } }],
    }

    fakeHubspotApi.setupServer({ postEndpoints: [ticketsEndpoint], demo: true })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should create multiple tickets in a given portal', () => {
        return hubspot.tickets.createBatch(newTickets).then((data) => {
          expect(data).to.be.an('array')
          expect(data[0].subject.value).to.equal(subjectValue)
          expect(data[1].subject.value).to.equal(anotherSubjectValue)
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

    fakeHubspotApi.setupServer({ deleteEndpoints: [ticketsEndpoint], demo: true })

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

  describe('deleteBatch', () => {
    const ids = ['fake_id_one', 'fake_id_two']

    const ticketsEndpoint = {
      path: '/crm-objects/v1/objects/tickets/batch-delete',
      request: { ids },
      response: { success: true },
    }

    fakeHubspotApi.setupServer({ postEndpoints: [ticketsEndpoint], demo: true })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should delete multiple tickets in a given portal', () => {
        return hubspot.tickets.deleteBatch(ids).then((data) => {
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

    fakeHubspotApi.setupServer({ putEndpoints: [ticketsEndpoint], demo: true })

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

  describe('updateBatch', () => {
    const newSubject = 'NEW SUBJECT'
    const anotherSubject = 'ANOTHER SUBJECT'
    const newData = [
      {
        objectId: 'mock_id_one',
        properties: [
          {
            name: 'subject',
            value: newSubject,
          },
          {
            name: 'content',
            value: 'NEW TICKET...',
          },
        ],
      },
      {
        objectId: 'mock_id_two',
        properties: [
          {
            name: 'subject',
            value: anotherSubject,
          },
          {
            name: 'content',
            value: 'ANOTHER TICKET...',
          },
        ],
      },
    ]

    const ticketsEndpoint = {
      path: `/crm-objects/v1/objects/tickets/batch-update`,
      request: newData,
      response: [
        { properties: { subject: { value: newSubject } } },
        { properties: { subject: { value: anotherSubject } } },
      ],
    }

    fakeHubspotApi.setupServer({ postEndpoints: [ticketsEndpoint], demo: true })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can update multiple tickets', () => {
        return hubspot.tickets.updateBatch(newData).then((data) => {
          expect(data).to.be.an('array')
          expect(data[0].properties.subject.value).to.equal(newSubject)
          expect(data[1].properties.subject.value).to.equal(anotherSubject)
        })
      })
    }
  })
})
