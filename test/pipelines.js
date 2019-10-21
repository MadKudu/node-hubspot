const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

describe('Pipelines', () => {
  describe('get', () => {
    it('Should return all deal pipelines for a given portal', () => {
      return hubspot.pipelines.get().then((data) => {
        expect(data).to.be.a('array')
        expect(data[0]).to.have.a.property('pipelineId')
      })
    })
  })
})
