const { expect } = require('chai')
const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')

describe('contacts.properties', function() {
  const hubspot = new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'fake-token',
  })
  const contactPropertyProperties = {
    name: 'mk_customer_fit_segment',
    label: 'MadKudu Customer Fit',
    description: 'MadKudu Customer Fit',
    type: 'string',
    groupName: 'contactinformation',
    fieldType: 'text',
    options: [],
  }
  const deleteTestContactPropertyGroup = name =>
    hubspot.contacts.properties.deleteGroup(name)
  const createTestContactPropertyGroup = properties =>
    hubspot.contacts.properties.createGroup(properties)

  const deleteTestContactProperty = name =>
    hubspot.contacts.properties.delete(name)
  const createTestContactProperty = properties =>
    hubspot.contacts.properties.create(properties)

  describe('get', function() {
    const getAllEndpoint = {
      path: '/properties/v1/contacts/properties',
      response: [{}],
    }
    fakeHubspotApi.setupServer({ getEndpoints: [getAllEndpoint] })

    it('should return the list of properties for contacts', function() {
      return hubspot.contacts.properties.get().then(data => {
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
      })
    })
  })

  describe('getAll', function() {
    const getAllEndpoint = {
      path: '/properties/v1/contacts/properties',
      response: [{}],
    }
    fakeHubspotApi.setupServer({ getEndpoints: [getAllEndpoint] })

    it('should return the same thing as get', function() {
      return hubspot.contacts.properties.get().then(data => {
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
      })
    })
  })

  describe('getByName', function() {
    const getByNameEndpoint = {
      path: `/properties/v1/contacts/properties/named/${
        contactPropertyProperties.name
      }`,
      response: contactPropertyProperties,
    }
    fakeHubspotApi.setupServer({ getEndpoints: [getByNameEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return createTestContactProperty(contactPropertyProperties)
      }
    })
    after(function() {
      if (process.env.NOCK_OFF) {
        return deleteTestContactProperty(contactPropertyProperties.name)
      }
    })

    it('should get a property by name', function() {
      return hubspot.contacts.properties
        .getByName(contactPropertyProperties.name)
        .then(results => {
          expect(results).to.be.an('object')
          expect(results).to.have.a.property('name')
        })
    })
  })

  describe('delete', function() {
    const deleteEndpoint = {
      path: `/properties/v1/contacts/properties/named/${
        contactPropertyProperties.name
      }`,
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({ deleteEndpoints: [deleteEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return createTestContactProperty(contactPropertyProperties)
      }
    })

    it('can delete', function() {
      return hubspot.contacts.properties
        .delete(contactPropertyProperties.name)
        .then(data => {
          expect(data).to.be.an('undefined')
        })
    })
  })

  describe('create', function() {
    const createEndpoint = {
      path: '/properties/v1/contacts/properties',
      response: contactPropertyProperties,
    }
    fakeHubspotApi.setupServer({ postEndpoints: [createEndpoint] })

    after(function() {
      if (process.env.NOCK_OFF) {
        return deleteTestContactProperty(contactPropertyProperties.name)
      }
    })

    it('should create the property', function() {
      return hubspot.contacts.properties
        .create(contactPropertyProperties)
        .then(data => {
          expect(data.description).to.eq(contactPropertyProperties.description)
        })
    })
  })

  describe('update', function() {
    const description = 'Updated display name'
    const updateEndpoint = {
      path: `/properties/v1/contacts/properties/named/${
        contactPropertyProperties.name
      }`,
      response: { ...contactPropertyProperties, description },
    }
    fakeHubspotApi.setupServer({ putEndpoints: [updateEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return createTestContactProperty(contactPropertyProperties)
      }
    })
    after(function() {
      if (process.env.NOCK_OFF) {
        return deleteTestContactProperty(contactPropertyProperties.name)
      }
    })

    it('should update the property', function() {
      return hubspot.contacts.properties
        .update(contactPropertyProperties.name, {
          ...contactPropertyProperties,
          description,
        })
        .then(data => {
          expect(data.description).to.eq(description)
        })
    })
  })

  describe('upsert', function() {
    describe("when the record doesn't exists", function() {
      const createEndpoint = {
        path: '/properties/v1/contacts/properties',
        response: contactPropertyProperties,
      }
      fakeHubspotApi.setupServer({ postEndpoints: [createEndpoint] })

      after(function() {
        if (process.env.NOCK_OFF) {
          return deleteTestContactProperty(contactPropertyProperties.name)
        }
      })

      it('should create the property', function() {
        return hubspot.contacts.properties
          .upsert(contactPropertyProperties)
          .then(data => {
            expect(data.description).to.eq(
              contactPropertyProperties.description
            )
          })
      })
    })

    describe('when the record already exists', function() {
      const description = 'Updated display name'
      const createEndpoint = {
        path: '/properties/v1/contacts/properties',
        statusCode: 409,
      }
      const updateEndpoint = {
        path: `/properties/v1/contacts/properties/named/${
          contactPropertyProperties.name
        }`,
        response: { ...contactPropertyProperties, description },
      }
      fakeHubspotApi.setupServer({
        postEndpoints: [createEndpoint],
        putEndpoints: [updateEndpoint],
      })

      before(function() {
        if (process.env.NOCK_OFF) {
          return createTestContactProperty(contactPropertyProperties)
        }
      })
      after(function() {
        if (process.env.NOCK_OFF) {
          return deleteTestContactProperty(contactPropertyProperties.name)
        }
      })

      it('should update the property', function() {
        return hubspot.contacts.properties
          .upsert({ ...contactPropertyProperties, description })
          .then(data => {
            expect(data.description).to.eq(description)
          })
      })
    })
  })

  describe('groups', () => {
    describe('getGroups', () => {
      const getGroupsEndpoint = {
        path: '/properties/v1/contacts/groups',
        response: [],
      }
      fakeHubspotApi.setupServer({ getEndpoints: [getGroupsEndpoint] })

      it('should return groups', function() {
        return hubspot.contacts.properties.getGroups().then(data => {
          expect(data).to.be.an('array')
        })
      })
    })

    describe('createGroup', function() {
      const name = 'test_group'
      const createGroupEndpoint = {
        path: '/properties/v1/contacts/groups',
        response: {},
      }
      fakeHubspotApi.setupServer({ postEndpoints: [createGroupEndpoint] })

      after(function() {
        if (process.env.NOCK_OFF) {
          return deleteTestContactPropertyGroup(name)
        }
      })

      it('returns a 200', function() {
        return hubspot.contacts.properties
          .createGroup({ name })
          .then(data => expect(data).to.be.a('object'))
      })
    })

    describe('updateGroup', function() {
      const name = 'test_group'
      const displayName = 'Updated display name'
      const updateGroupEndpoint = {
        path: `/properties/v1/contacts/groups/named/${name}`,
        request: { displayName },
        response: { name, displayName },
      }
      fakeHubspotApi.setupServer({ putEndpoints: [updateGroupEndpoint] })

      before(function() {
        if (process.env.NOCK_OFF) {
          return createTestContactPropertyGroup({
            name,
            displayName: 'something',
          })
        }
      })
      after(function() {
        if (process.env.NOCK_OFF) {
          return deleteTestContactPropertyGroup(name)
        }
      })

      it('returns a 200', function() {
        return hubspot.contacts.properties
          .updateGroup(name, { displayName })
          .then(data => expect(data.displayName).to.eq(displayName))
      })
    })

    describe('deleteGroup', function() {
      const name = 'test_group'
      const deleteGroupEndpoint = {
        path: `/properties/v1/contacts/groups/named/${name}`,
        statusCode: 204,
      }
      fakeHubspotApi.setupServer({ deleteEndpoints: [deleteGroupEndpoint] })

      before(function() {
        if (process.env.NOCK_OFF) {
          return createTestContactPropertyGroup({
            name,
            displayName: 'something',
          })
        }
      })

      it('returns a 204', function() {
        return hubspot.contacts.properties
          .deleteGroup(name)
          .then(data => expect(data).to.be.an('undefined'))
      })
    })
  })
})
