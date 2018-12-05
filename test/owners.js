const chai = require('chai')
const expect = chai.expect
const nockHelper = require('./helpers/nock_helper')

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('Owners', function() {
  before(nockHelper.mockEndpoint('/owners/v2/owners', []))
  after(nockHelper.resetNock)
  describe('get', function() {
    it('Should return all owners', function() {
      return hubspot.owners.get().then(data => {
        expect(data).to.be.a('array')
      })
    })
  })
})
