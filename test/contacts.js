const { expect } = require('chai')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const { createTestContact, deleteTestContact } = require('./helpers/factories')

const Hubspot = require('..')

const emailsFromContacts = (contacts) =>
  contacts.flatMap((contact) =>
    contact['identity-profiles']
      .filter((el) => {
        return el.identities.length > 0
      })
      .map((profile) => profile.identities.find((identity) => identity.type === 'EMAIL').value)
  )

describe('contacts', () => {
  const hubspot = new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'fake-token',
  })

  describe('get', () => {
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

    it('should return a batch of contacts', () => {
      return hubspot.contacts.get().then((data) => {
        expect(data).to.be.a('object')
        expect(data.contacts).to.be.a('array')
        expect(data.contacts[0]).to.be.an('object')
      })
    })

    it('should pass through a count', () => {
      return hubspot.contacts.get({ count }).then((data) => {
        expect(data).to.be.a('object')
        expect(data.contacts).to.be.a('array')
      })
    })
  })

  describe('getRecentlyModified', () => {
    const recentlyModifiedContactsGetEndpoint = {
      path: '/contacts/v1/lists/recently_updated/contacts/recent',
      response: { contacts: [{}] },
    }
    fakeHubspotApi.setupServer({
      getEndpoints: [recentlyModifiedContactsGetEndpoint],
    })

    it('should return a list of contacts', () => {
      return hubspot.contacts.getRecentlyModified().then((data) => {
        expect(data.contacts).to.be.an('array')
      })
    })
  })

  describe('getRecentlyCreated', () => {
    const recentlyCreatedContactsGetEndpoint = {
      path: '/contacts/v1/lists/all/contacts/recent',
      response: { contacts: [{}] },
    }
    fakeHubspotApi.setupServer({
      getEndpoints: [recentlyCreatedContactsGetEndpoint],
    })

    it('should return a list of contacts', () => {
      return hubspot.contacts.getRecentlyCreated().then((data) => {
        expect(data.contacts).to.be.an('array')
      })
    })
  })

  describe('getById', () => {
    let contactId = 123
    const contactByIdEndpoint = {
      path: `/contacts/v1/contact/vid/${contactId}/profile`,
      response: { vid: contactId },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [contactByIdEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return createTestContact(hubspot).then((data) => (contactId = data.vid))
      }
    })
    after(() => {
      if (process.env.NOCK_OFF) {
        return deleteTestContact(hubspot, contactId)
      }
    })

    it('should return a contact based on its id', () => {
      return hubspot.contacts.getById(contactId).then((data) => {
        expect(data.vid).to.equal(contactId)
      })
    })
  })

  describe('getByIdBatch', () => {
    let contactIds = [123, 234, 345]
    const contactsByIdsEndpoint = {
      path: '/contacts/v1/contact/vids/batch',
      response: { '123': {}, '234': {}, '345': {} },
      query: { vid: contactIds },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [contactsByIdsEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get({ count: 3 }).then((data) => {
          contactIds = data.contacts.map((contact) => contact.vid)
        })
      }
    })

    it('should return a contact record based on a array of ids', () => {
      return hubspot.contacts.getByIdBatch(contactIds).then((data) => {
        expect(data).to.be.an('object')
        expect(data).to.have.a.property(contactIds[0])
      })
    })
  })

  describe('getByEmail', () => {
    let email = 'testingapis@hubspot.com'
    const contactByEmailEndpoint = {
      path: `/contacts/v1/contact/email/${email}/profile`,
      response: { properties: {} },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [contactByEmailEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get({ count: 1 }).then((data) => {
          email = emailsFromContacts(data.contacts)[0]
        })
      }
    })

    it('should return a contact record based on the email', () => {
      return hubspot.contacts.getByEmail(email).then((data) => {
        expect(data).to.be.a('object')
        expect(data.properties).to.be.a('object')
      })
    })
  })

  describe('getByEmailBatch', () => {
    let emails = ['testingapis@hubspot.com', 'testingapisawesomeandstuff@hubspot.com']
    const contactByEmailsEndpoint = {
      path: '/contacts/v1/contact/emails/batch',
      response: { properties: {} },
      query: { email: emails },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [contactByEmailsEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get({ count: 3 }).then((data) => {
          emails = emailsFromContacts(data.contacts)
        })
      }
    })

    it('should return a contact record based on a array of emails', () => {
      return hubspot.contacts.getByEmailBatch(emails).then((data) => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('update', () => {
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

    before(() => {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get().then((data) => {
          contactId = data.contacts[0].vid
        })
      }
    })

    it('should update an existing contact', () => {
      return hubspot.contacts.update(contactId, updateData).then((data) => {
        expect(data).to.be.an('undefined')
      })
    })
  })

  describe('createOrUpdate', () => {
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

    it('should Create or Update a contact', () => {
      return hubspot.contacts.createOrUpdate(email, createOrUpdateData).then((data) => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('updateByEmail', () => {
    const email = 'test@hubspot.com'
    const updateByEmailData = {
      properties: [
        {
          property: 'firstname',
          value: 'Updated',
        },
        {
          property: 'lastname',
          value: 'Record',
        },
        {
          property: 'website',
          value: 'http://updated.example.com',
        },
        {
          property: 'lifecyclestage',
          value: 'customer',
        },
      ],
    }
    const updateByEmailEndpoint = {
      path: `/contacts/v1/contact/email/${email}/profile`,
      request: updateByEmailData,
      response: {
        updated: true,
      },
    }
    fakeHubspotApi.setupServer({
      postEndpoints: [updateByEmailEndpoint],
    })

    it('should Create or Update a contact', () => {
      return hubspot.contacts.updateByEmail(email, updateByEmailData).then((data) => {
        expect(data).to.be.an('object')
        expect(data.updated).to.be.eq(true)
      })
    })
  })

  describe('create', () => {
    const companyName = 'MadKudu'
    const createData = {
      properties: [
        {
          property: 'email',
          value: `node-hubspot${Date.now()}@madkudu.com`,
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

    it('should create a new contact', () => {
      return hubspot.contacts.create(createData).then((data) => {
        expect(data).to.be.an('object')
        expect(data.properties.company.value).to.equal('MadKudu')
      })
    })

    it('should fail if the contact already exists', () => {
      return hubspot.contacts
        .create(createErrorData)
        .then((data) => {
          throw new Error('This should have failed')
        })
        .catch((err) => {
          expect(err instanceof Error).to.equal(true)
          expect(err.error.message).to.equal('Contact already exists')
        })
    })
  })

  describe('delete', () => {
    let contactId = 123
    const deleteContactEndpoint = {
      path: `/contacts/v1/contact/vid/${contactId}`,
      response: { vid: contactId },
    }
    fakeHubspotApi.setupServer({ deleteEndpoints: [deleteContactEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return createTestContact(hubspot).then((data) => (contactId = data.vid))
      }
    })

    it('can delete', () => {
      return hubspot.contacts.delete(contactId).then((data) => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('createOrUpdateBatch', () => {
    const contactIds = [123, 234, 345]
    const properties = [{ property: 'company', value: 'MadKudu ' }]
    let createOrUpdateData = contactIds.map((vid) => ({ vid, properties }))
    const createOrUpdateContactsEndpoint = {
      path: '/contacts/v1/contact/batch',
      statusCode: 204,
      request: createOrUpdateData,
    }
    fakeHubspotApi.setupServer({
      postEndpoints: [createOrUpdateContactsEndpoint],
    })

    before(() => {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get({ count: 3 }).then((data) => {
          createOrUpdateData = data.contacts.map(({ vid }) => ({
            vid,
            properties,
          }))
        })
      }
    })

    it('should update a batch of company', () => {
      return hubspot.contacts.createOrUpdateBatch(createOrUpdateData).then((data) => {
        expect(data).to.equal(undefined)
      })
    })
  })

  describe('search', () => {
    const query = 'example'
    const searchContactsEndpoint = {
      path: '/contacts/v1/search/query',
      query: { q: query },
      response: { contacts: [{}], query },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [searchContactsEndpoint] })

    it("should return contacts and some data associated with those contacts by the contact's email address or name.", () => {
      return hubspot.contacts.search('example').then((data) => {
        expect(data.contacts).to.be.a('array')
        expect(data.query).to.equal('example')
      })
    })
  })

  describe('merge', () => {
    let primaryVid = process.env.MERGE_FROM_ID || 12345
    let secondaryVid = process.env.MERGE_TO_ID || 3456
    const mergeData = { vidToMerge: secondaryVid }

    let c = []

    const mergeEndpoint = {
      path: `/contacts/v1/contact/merge-vids/${primaryVid}`,
      statusCode: 200,
      request: mergeData,
      response: { success: true },
    }
    fakeHubspotApi.setupServer({
      postEndpoints: [mergeEndpoint],
    })

    before(() => {
      if (process.env.NOCK_OFF) {
        return hubspot.contacts.get({ count: 2 }).then((data) => {
          c = data.contacts.map((a) => a.vid)
          primaryVid = c[0]
          secondaryVid = c[1]
        })
      }
    })

    it('should merge the {primaryVid} contact in {secondaryVid} contact ', () => {
      return hubspot.contacts.merge(primaryVid, secondaryVid).then((data) => {
        expect(data.success).to.be.equal(true)
      })
    })
  })

  describe('addSecondaryEmail', () => {
    const vid = 123
    const secondaryEmail = 'test-sec@hubspot.com'
    const addSecondaryEmailEndpoint = {
      path: `/contacts/v1/secondary-email/${vid}/email/${secondaryEmail}`,
      statusCode: 200,
      response: {
        vid,
        secondaryEmails: ['test-sec@hubspot.com'],
      },
    }
    fakeHubspotApi.setupServer({
      putEndpoints: [addSecondaryEmailEndpoint],
    })

    it('should Create or Update a contact', () => {
      return hubspot.contacts.addSecondaryEmail(vid, secondaryEmail).then((data) => {
        expect(data).to.be.an('object')
        expect(data.vid).to.be.eq(123)
        expect(data.secondaryEmails).to.be.eql(['test-sec@hubspot.com'])
      })
    })
  })
})
