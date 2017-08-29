const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('Owners', function () {
  describe('get', function () {
    it('Should return all owners', function () {
      return hubspot.owners.get().then(data => {
        expect(data).to.be.a('array')
      })
    })
  })
})
