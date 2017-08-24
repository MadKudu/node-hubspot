const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('Pipelines', function () {
  describe('get', function () {
    it('Should return all deal pipelines for a given portal', function () {
      return hubspot.pipelines.get().then(data => {
        expect(data).to.be.a('array')
        expect(data[0]).to.have.a.property('pipelineId')
      })
    })
  })
})
