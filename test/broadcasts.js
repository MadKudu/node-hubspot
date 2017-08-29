const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('broadcasts', function () {
  describe('get', function () {
    it('Should return details on a set of broadcast messages', function () {
      return hubspot.broadcasts.get().then(data => {
        expect(data).to.be.a('array')
      })
    })
  })
})
