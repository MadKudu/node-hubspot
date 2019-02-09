const { expect } = require('chai')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const { createTestContact, deleteTestContact } = require('./helpers/factories')

const Hubspot = require('..')
const emailsFromContacts = contacts =>
  contacts.flatMap(contact =>
    contact['identity-profiles'].map(
      profile =>
        profile.identities.find(identity => identity.type === 'EMAIL').value
    )
  )

describe('contacts', function() {
  const hubspot = new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'fake-token',
  })

  describe('get', function() {
    const count = 10
    const contactsGetEndpoint = {
      path: '/contacts/v1/lists/all/contacts/all',
      response: { contacts: [{}] },
    }
    const tenContactsGetEndpoint = {
      path: '/contacts/v1/lists/all/contacts/all',
      response: { contacts: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}] },
      query: { count },
    }
    fakeHubspotApi.setupServer({
      getEndpoints: [contactsGetEndpoint, tenContactsGetEndpoint],
    })

    it('should return a batch of contacts', function() {
      return hubspot.contacts.get().then(data => {
        expect(data).to.be.a('object')
        expect(data.contacts).to.be.a('array')
        expect(data.contacts[0]).to.be.an('object')
      })
    })

    it('should pass through a count', function() {
      return hubspot.contacts.get({ count }).then(data => {
        expect(data).to.be.a('object')
        expect(data.contacts).to.be.a('array')
      })
    })
  })

  describe('getRecentlyModified', function() {
    const recentlyModifiedContactsGetEndpoint = {
      path: '/contacts/v1/lists/recently_updated/contacts/recent',
      response: { contacts: [{}] },
    }
    fakeHubspotApi.setupServer({
      getEndpoints: [recentlyModifiedContactsGetEndpoint],
    })

    it('should return a list of contacts', function() {
      return hubspot.contacts.getRecentlyModified().then(data => {
        expect(data.contacts).to.be.an('array')
      })
    })
  })

  describe('getRecentlyCreated', function() {
    const recentlyCreatedContactsGetEndpoint = {
      path: '/contacts/v1/lists/all/contacts/recent',
      response: { contacts: [{}] },
    }
    fakeHubspotApi.setupServer({
      getEndpoints: [recentlyCreatedContactsGetEndpoint],
    })

    it('should return a list of contacts', function() {
      return hubspot.contacts.getRecentlyCreated().then(data => {
        expect(data.contacts).to.be.an('array')
      })
    })
  })

  describe('getById', function() {
    let contactId = 123
    const contactByIdEndpoint = {
      path: `/contacts/v1/contact/vid/${contactId}/profile`,
      response: { vid: contactId },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [contactByIdEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return createTestContact(hubspot).then(data => (contactId = data.vid))
      }
    })
    after(function() {
      if (process.env.NOCK_OFF) {
        return deleteTestContact(hubspot, contactId)
      }
    })

    it('should return a contact based on its id', function() {
      return hubspot.contacts.getById(contactId).then(data => {
        expect(data.vid).to.equal(contactId)
      })
    })
  })

  describe('getByIdBatch', function() {
    let contactIds = [123, 234, 345]
    const contactsByIdsEndpoint = {
      path: '/contacts/v1/contact/vids/batch',
      response: { '123': {}, '234': {}, '345': {} },
      query: { vid: contactIds },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [contactsByIdsEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get({ count: 3 }).then(data => {
          contactIds = data.contacts.map(contact => contact.vid)
        })
      }
    })

    it('should return a contact record based on a array of ids', function() {
      return hubspot.contacts.getByIdBatch(contactIds).then(data => {
        expect(data).to.be.an('object')
        expect(data).to.have.a.property(contactIds[0])
      })
    })
  })

  describe('getByEmail', function() {
    let email = 'testingapis@hubspot.com'
    const contactByEmailEndpoint = {
      path: `/contacts/v1/contact/email/${email}/profile`,
      response: { properties: {} },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [contactByEmailEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get({ count: 1 }).then(data => {
          email = emailsFromContacts(data.contacts)[0]
        })
      }
    })

    it('should return a contact record based on the email', function() {
      return hubspot.contacts.getByEmail(email).then(data => {
        expect(data).to.be.a('object')
        expect(data.properties).to.be.a('object')
      })
    })
  })

  describe('getByEmailBatch', function() {
    let emails = [
      'testingapis@hubspot.com',
      'testingapisawesomeandstuff@hubspot.com',
    ]
    const contactByEmailsEndpoint = {
      path: '/contacts/v1/contact/emails/batch',
      response: { properties: {} },
      query: { email: emails },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [contactByEmailsEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get({ count: 3 }).then(data => {
          emails = emailsFromContacts(data.contacts)
        })
      }
    })

    it('should return a contact record based on a array of emails', function() {
      return hubspot.contacts.getByEmailBatch(emails).then(data => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('update', function() {
    let contactId = 123
    const updateData = {
      properties: [
        {
          property: 'email',
          value: `new-email${Date.now()}@hubspot.com`,
        },
        {
          property: 'firstname',
          value: 'Updated',
        },
        {
          property: 'lastname',
          value: 'Lead',
        },
        {
          property: 'website',
          value: 'http://hubspot-updated-lead.com',
        },
        {
          property: 'lifecyclestage',
          value: 'customer',
        },
      ],
    }
    const updateContactEndpoint = {
      path: `/contacts/v1/contact/vid/${contactId}/profile`,
      request: updateData,
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({ postEndpoints: [updateContactEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get().then(data => {
          contactId = data.contacts[0].vid
        })
      }
    })

    it('should update an existing contact', function() {
      return hubspot.contacts.update(contactId, updateData).then(data => {
        expect(data).to.be.an('undefined')
      })
    })
  })

  describe('createOrUpdate', function() {
    const email = 'test@hubspot.com'
    const createOrUpdateData = {
      properties: [
        {
          property: 'email',
          value: email,
        },
        {
          property: 'firstname',
          value: 'Matt',
        },
        {
          property: 'lastname',
          value: 'Schnitt',
        },
        {
          property: 'website',
          value: 'http://hubspot.com',
        },
        {
          property: 'company',
          value: 'HubSpot',
        },
        {
          property: 'phone',
          value: '555-122-2323',
        },
        {
          property: 'address',
          value: '25 First Street',
        },
        {
          property: 'city',
          value: 'Cambridge',
        },
        {
          property: 'state',
          value: 'MA',
        },
        {
          property: 'zip',
          value: '02139',
        },
      ],
    }
    const createOrUpdateContactEndpoint = {
      path: `/contacts/v1/contact/createOrUpdate/email/${email}`,
      request: createOrUpdateData,
      response: {},
    }
    fakeHubspotApi.setupServer({
      postEndpoints: [createOrUpdateContactEndpoint],
    })

    it('should Create or Update a contact', function() {
      return hubspot.contacts
        .createOrUpdate(email, createOrUpdateData)
        .then(data => {
          expect(data).to.be.an('object')
        })
    })
  })

  describe('create', function() {
    const companyName = 'MadKudu'
    const createData = {
      properties: [
        {
          property: 'email',
          value: 'node-hubspot' + Date.now() + '@madkudu.com',
        },
        {
          property: 'firstname',
          value: 'Try',
        },
        {
          property: 'lastname',
          value: 'MadKudu',
        },
        {
          property: 'website',
          value: 'http://www.madkudu.com',
        },
        {
          property: 'company',
          value: companyName,
        },
      ],
    }
    const createErrorData = {
      properties: [
        {
          property: 'email',
          value: 'node-hubspot@hubspot.com',
        },
        {
          property: 'firstname',
          value: 'Test',
        },
      ],
    }
    const createContactEndpoint = {
      path: '/contacts/v1/contact',
      request: createData,
      response: { properties: { company: { value: companyName } } },
    }
    const createExisitingContactEndpoint = {
      path: '/contacts/v1/contact',
      request: createErrorData,
      responseError: 'Contact already exists',
    }
    fakeHubspotApi.setupServer({
      postEndpoints: [createContactEndpoint, createExisitingContactEndpoint],
    })

    it('should create a new contact', function() {
      return hubspot.contacts.create(createData).then(data => {
        expect(data).to.be.an('object')
        expect(data.properties.company.value).to.equal('MadKudu')
      })
    })

    it('should fail if the contact already exists', function() {
      return hubspot.contacts
        .create(createErrorData)
        .then(data => {
          throw new Error('This should have failed')
        })
        .catch(err => {
          expect(err instanceof Error).to.equal(true)
          expect(err.error.message).to.equal('Contact already exists')
        })
    })
  })

  describe('delete', function() {
    let contactId = 123
    const deleteContactEndpoint = {
      path: `/contacts/v1/contact/vid/${contactId}`,
      response: { vid: contactId },
    }
    fakeHubspotApi.setupServer({ deleteEndpoints: [deleteContactEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return createTestContact(hubspot).then(data => (contactId = data.vid))
      }
    })

    it('can delete', function() {
      return hubspot.contacts.delete(contactId).then(data => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('createOrUpdateBatch', function() {
    const contactIds = [123, 234, 345]
    const properties = [{ property: 'company', value: 'MadKudu ' }]
    let createOrUpdateData = contactIds.map(vid => ({ vid, properties }))
    const createOrUpdateContactsEndpoint = {
      path: '/contacts/v1/contact/batch',
      statusCode: 204,
      request: createOrUpdateData,
    }
    fakeHubspotApi.setupServer({
      postEndpoints: [createOrUpdateContactsEndpoint],
    })

    before(function() {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get({ count: 3 }).then(data => {
          createOrUpdateData = data.contacts.map(({ vid }) => ({
            vid,
            properties,
          }))
        })
      }
    })

    it('should update a batch of company', function() {
      return hubspot.contacts
        .createOrUpdateBatch(createOrUpdateData)
        .then(data => {
          expect(data).to.equal(undefined)
        })
    })
  })

  describe('search', function() {
    const query = 'example'
    const searchContactsEndpoint = {
      path: '/contacts/v1/search/query',
      query: { q: query },
      response: { contacts: [{}], query },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [searchContactsEndpoint] })

    it("should return contacts and some data associated with those contacts by the contact's email address or name.", function() {
      return hubspot.contacts.search('example').then(data => {
        expect(data.contacts).to.be.a('array')
        expect(data.query).to.equal('example')
      })
    })
  })
})
