const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const apiKey = { apiKey: process.env.HUBSPOT_API_KEY || 'demo' }
const hubspot = new Hubspot(apiKey)

describe('tickets', () => {
  describe('get', () => {
    it('should return all tickets', () => {
      return hubspot.ticket.get().then((data) => {
        expect(data).to.be.an('object')
        expect(data.objects).to.be.a('array')
      })
    })
  })
})
