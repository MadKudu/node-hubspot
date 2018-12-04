const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

const group = {
  displayName: 'GROUP DIPLAY NAME',
  name: 'mk_group_fit_segment',
}

describe('deals.properties.groups', function() {
  describe('get', function() {
    it('should return the list of properties groups for deals', function() {
      return hubspot.deals.properties.groups.get().then(data => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })

  describe('getAll', function() {
    it('should return the same thing as get', function() {
      return hubspot.deals.properties.groups.get().then(data => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })

  describe('upsert (create)', function() {
    it('should create or update the properties group', function() {
      return hubspot.deals.properties.groups.upsert(group).then(data => {
        expect(data).to.be.an('object')
        expect(data).to.have.a.property('name')
      })
    })
  })

  describe('update', function() {
    group.displayName = 'MadKudo Company Fit'

    it('should update the property', function() {
      return hubspot.deals.properties.groups
        .update(group.name, group)
        .then(data => {
          expect(data).to.be.an('object')
          expect(data).to.have.a.property('name')
          expect(data.displayName).to.equal(group.displayName)
        })
    })
  })
})
