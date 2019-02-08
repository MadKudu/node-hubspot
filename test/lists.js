const { expect } = require('chai')
const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const { createTestContact, deleteTestContact } = require('./helpers/factories')

describe('lists', function() {
  const hubspot = new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'some-fake-token',
  })
  const listProperties = { name: 'Test list name' }
  const createTestList = () => hubspot.lists.create(listProperties)
  const deleteTestList = listId => hubspot.lists.delete(listId)

  describe('get', function() {
    const listsEndpoint = {
      path: '/contacts/v1/lists',
      response: { lists: [] },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [listsEndpoint] })

    it('should return contact lists', function() {
      return hubspot.lists.get().then(data => {
        expect(data).to.be.a('object')
        expect(data.lists).to.be.a('array')
      })
    })
  })

  describe('getOne', function() {
    describe('when passed a listId', function() {
      let listId = 123
      const listEndpoint = {
        path: `/contacts/v1/lists/${listId}`,
        response: listProperties,
      }
      fakeHubspotApi.setupServer({ getEndpoints: [listEndpoint] })

      before(function() {
        if (process.env.NOCK_OFF) {
          return createTestList(listProperties).then(
            data => (listId = data.listId)
          )
        }
      })
      after(function() {
        if (process.env.NOCK_OFF) {
          return deleteTestList(listId)
        }
      })

      it('should return one contact list', function() {
        return hubspot.lists.getOne(listId).then(data => {
          expect(data).to.be.a('object')
          expect(data.name).to.equal(listProperties.name)
        })
      })
    })

    describe('when not passed a listId', function() {
      it('should return a rejected promise', function() {
        return hubspot.lists
          .getOne()
          .then(data => {
            throw new Error('I should have thrown an error')
          })
          .catch(error => {
            expect(error.message).to.equal('id parameter must be provided.')
          })
      })
    })
  })

  describe('create', function() {
    let listId
    const createListEndpoint = {
      path: '/contacts/v1/lists',
      request: listProperties,
      response: listProperties,
    }
    fakeHubspotApi.setupServer({ postEndpoints: [createListEndpoint] })

    after(function() {
      if (process.env.NOCK_OFF) {
        return deleteTestList(listId)
      }
    })

    it('should return the created list', function() {
      return hubspot.lists.create(listProperties).then(data => {
        listId = data.listId
        expect(data).to.be.a('object')
      })
    })
  })

  describe('delete', function() {
    let listId
    const deleteListEndpoint = {
      path: `/contacts/v1/lists/${listId}`,
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({ deleteEndpoints: [deleteListEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return createTestList(listProperties).then(
          data => (listId = data.listId)
        )
      }
    })

    it('should return a 204', function() {
      return hubspot.lists.delete(listId).then(data => {
        expect(data).to.be.an('undefined')
      })
    })
  })

  describe('getContacts', function() {
    describe('when passed a listId', function() {
      let listId = 123
      const listContactsEndpoint = {
        path: `/contacts/v1/lists/${listId}/contacts/all`,
        response: { contacts: [] },
      }
      fakeHubspotApi.setupServer({ getEndpoints: [listContactsEndpoint] })

      before(function() {
        if (process.env.NOCK_OFF) {
          return createTestList(listProperties).then(
            data => (listId = data.listId)
          )
        }
      })
      after(function() {
        if (process.env.NOCK_OFF) {
          return deleteTestList(listId)
        }
      })

      it('should return contacts', function() {
        return hubspot.lists.getContacts(listId).then(data => {
          expect(data).to.be.a('object')
          expect(data.contacts).to.be.an('array')
        })
      })
    })

    describe('when not passed a listId', function() {
      it('should return a rejected promise', function() {
        return hubspot.lists
          .getContacts()
          .then(data => {
            throw new Error('I should have thrown an error')
          })
          .catch(error => {
            expect(error.message).to.equal('id parameter must be provided.')
          })
      })
    })
  })

  describe('getRecentContacts', function() {
    describe('when passed a listId', function() {
      let listId = 123
      const listContactsEndpoint = {
        path: `/contacts/v1/lists/${listId}/contacts/recent`,
        response: { contacts: [] },
      }
      fakeHubspotApi.setupServer({ getEndpoints: [listContactsEndpoint] })

      before(function() {
        if (process.env.NOCK_OFF) {
          return createTestList(listProperties).then(
            data => (listId = data.listId)
          )
        }
      })
      after(function() {
        if (process.env.NOCK_OFF) {
          return deleteTestList(listId)
        }
      })

      it('should return contacts', function() {
        return hubspot.lists.getRecentContacts(listId).then(data => {
          expect(data).to.be.a('object')
          expect(data.contacts).to.be.an('array')
        })
      })
    })

    describe('when not passed a listId', function() {
      it('should return a rejected promise', function() {
        return hubspot.lists
          .getRecentContacts()
          .then(data => {
            throw new Error('I should have thrown an error')
          })
          .catch(error => {
            expect(error.message).to.equal('id parameter must be provided.')
          })
      })
    })
  })

  describe('addContacts', function() {
    describe('when a id and contactBody is provided', function() {
      let listId = 123
      let contactId = 234
      const addContactToListEndpoint = {
        path: `/contacts/v1/lists/${listId}/add`,
        request: { vids: [contactId] },
        response: { contacts: [] },
      }
      fakeHubspotApi.setupServer({ postEndpoints: [addContactToListEndpoint] })

      before(function() {
        if (process.env.NOCK_OFF) {
          return Promise.all([
            createTestContact(hubspot).then(data => (contactId = data.vid)),
            createTestList(listProperties).then(data => (listId = data.listId)),
          ])
        }
      })
      after(function() {
        if (process.env.NOCK_OFF) {
          return Promise.all([
            deleteTestContact(hubspot, contactId),
            deleteTestList(listId),
          ])
        }
      })

      it('should return results', function() {
        return hubspot.lists
          .addContacts(listId, { vids: [contactId] })
          .then(data => {
            expect(data).to.be.a('object')
          })
      })
    })

    describe('when not passed a listId', function() {
      it('should return a rejected promise', function() {
        return hubspot.lists
          .addContacts()
          .then(data => {
            throw new Error('I should have thrown an error')
          })
          .catch(error => {
            expect(error.message).to.equal('id parameter must be provided.')
          })
      })
    })

    describe('when passed a listId but not contactBody', function() {
      it('should return a rejected promise', function() {
        return hubspot.lists
          .addContacts(123)
          .then(data => {
            throw new Error('I should have thrown an error')
          })
          .catch(error => {
            expect(error.message).to.equal(
              'contactBody parameter must be provided.'
            )
          })
      })
    })
  })
})
