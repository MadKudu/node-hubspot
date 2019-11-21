const { expect } = require('chai')
const Hubspot = require('..')

describe('Owners', () => {
  describe('get', () => {
    it('Should return all owners', () => {
      const hubspot = new Hubspot({
        apiKey: process.env.HUBSPOT_API_KEY || 'demo',
      })

      return hubspot.owners.get().then((data) => {
        expect(data).to.be.a('array')
      })
    })
  })

  describe('getById', () => {
    it('should return one owner', () => {
      const hubspot = new Hubspot({
        apiKey: process.env.HUBSPOT_API_KEY || 'demo',
      })

      return hubspot.owners.getById(process.env.OWNER_ID || 66).then((data) => {
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
          'activeSalesforceId',
          'userIdIncludingInactive',
          'isActive'
        )
        expect(data.remoteList[0]).to.have.all.keys('id', 'portalId', 'ownerId', 'remoteId', 'remoteType', 'active')
      })
    })
  })
})
