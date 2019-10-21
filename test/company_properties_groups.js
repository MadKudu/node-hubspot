const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

const group = {
  displayName: 'GROUP DIPLAY NAME',
  name: 'mk_group_fit_segment',
}

describe('companies.properties.groups', () => {
  describe('get', () => {
    it('should return the list of properties groups for companies', () => {
      return hubspot.companies.properties.groups.get().then((data) => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })

  describe('getAll', () => {
    it('should return the same thing as get', () => {
      return hubspot.companies.properties.groups.get().then((data) => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })

  describe('upsert (create)', () => {
    it('should create or update the properties group', () => {
      return hubspot.companies.properties.groups.upsert(group).then((data) => {
        expect(data).to.be.an('object')
        expect(data).to.have.a.property('name')
      })
    })
  })

  describe('update', () => {
    group.displayName = 'MadKudo Company Fit'

    it('should update the property', () => {
      return hubspot.companies.properties.groups
        .update(group.name, group)
        .then((data) => {
          expect(data).to.be.an('object')
          expect(data).to.have.a.property('name')
          expect(data.displayName).to.equal(group.displayName)
        })
    })
  })
})
