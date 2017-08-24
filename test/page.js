var chai = require('chai')
var expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('pages', function () {
  describe('get', function () {
    it('should return all pages', function () {
      return hubspot.pages.get().then(data => {
        expect(data).to.be.an('object')
        expect(data.objects).to.be.a('array')
      })
    })

    it('should return only published pages', function () {
      return hubspot.pages.get({is_draft: false}).then(data => {
        expect(data).to.be.an('object')
        expect(data.objects).to.be.a('array')
      })
    })
  })
})
