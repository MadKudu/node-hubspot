const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('Lists', function() {
  describe('Get Lists', function() {
    it('Should return contact lists', function() {
      return hubspot.lists.get().then(data => {
        expect(data).to.be.a('object')
        expect(data.lists).to.be.a('array')
      })
    })
  })

  describe('Get List by Id', function() {
    it('Should return one contact in a list', function() {
      return hubspot.lists.getOne(1).then(data => {
        expect(data).to.be.a('object')
        expect(data).to.have.a.property('name')
      })
    })
  })

  describe('Get Contacts In A List', function() {
    let listId

    // obtain a valid listID
    before(function() {
      return hubspot.lists.get().then(data => {
        listId = data.lists[0].listId
      })
    })

    it('Should return all contacts in a list', function() {
      return hubspot.lists.getContacts(listId).then(data => {
        expect(data).to.be.a('object')
        expect(data.contacts).to.be.a('array')
      })
    })
  })

  describe('Get recently updated and created contacts', function() {
    let listId

    // obtain a valid listID
    before(function() {
      return hubspot.lists.get().then(data => {
        listId = data.lists[0].listId
      })
    })

    it('Should a list of recently_updated contacts', function() {
      return hubspot.lists.getRecentContacts(listId).then(data => {
        expect(data).to.be.a('object')
        expect(data.contacts).to.be.a('array')
      })
    })
  })

  describe('Add existing contacts to a list', function() {
    //   it('Should add contact to a list of contacts', function () {
    //     return hubspot.lists.addContacts(5, {
    //       'vids': [61571], 'emails': ['testingapis@hubspot.com']
    //     }).then(data => {
    //       expect(data).to.be.a('object')
    //       expect(data.updated).to.be.a('array')
    //     })
    //   })
  })
})
