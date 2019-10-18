var chai = require('chai')
var expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

describe('pages', () => {
  describe('get', () => {
    it('should return all pages', () => {
      return hubspot.pages.get().then((data) => {
        expect(data).to.be.an('object')
        expect(data.objects).to.be.a('array')
      })
    })

    it('should return only published pages', () => {
      return hubspot.pages.get({ is_draft: false }).then((data) => {
        expect(data).to.be.an('object')
        expect(data.objects).to.be.a('array')
      })
    })
  })
})
