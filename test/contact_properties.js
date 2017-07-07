const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('contacts.properties', function () {
  describe('get', function () {
    it('should return the list of properties for contacts', function () {
      return hubspot.contacts.properties.get().then(data => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })
})
