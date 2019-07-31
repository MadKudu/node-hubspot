const { expect } = require('chai')
const Hubspot = require('..')

describe('Owners', function() {
  describe('get', function() {
    it('Should return all owners', function() {
      const hubspot = new Hubspot({ apiKey: 'demo' })

      return hubspot.owners.get().then(data => {
        expect(data).to.be.a('array')
      })
    })
  })

  describe('getById', function() {
    it('should return one owner', function() {
      const hubspot = new Hubspot({ apiKey: 'demo' })

      return hubspot.owners.getById(66).then(data => {
        expect(data).to.be.a('object')
        expect(data).to.have.all.keys(
          'portalId',
          'ownerId',
          'type',
          'firstName',
          'lastName',
          'email',
          'createdAt',
          'updatedAt',
          'remoteList',
          'hasContactsAccess',
          'activeUserId',
          'userIdIncludingInactive',
          'isActive'
        )
        expect(data.remoteList[0]).to.have.all.keys(
          'id',
          'portalId',
          'ownerId',
          'remoteId',
          'remoteType',
          'active'
        )
      })
    })
  })
})
