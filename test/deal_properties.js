const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

const property = {
  name: 'mk_deal_fit_segment',
  label: 'MadKudu Deal Fit',
  groupName: 'dealinformation',
  description: 'MadKudu Deal Fit',
  type: 'string',
  fieldType: 'text',
  formField: false,
  displayOrder: -1,
  options: [],
}

describe('deals.properties', () => {
  describe('get', () => {
    it('should return the list of properties for deals', () => {
      return hubspot.deals.properties.get().then((data) => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })

  describe('getAll', () => {
    it('should return the same thing as get', () => {
      return hubspot.deals.properties.get().then((data) => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })

  describe('getByName', () => {
    let propertyName

    before(() => {
      return hubspot.deals.properties.get().then((results) => {
        // console.log(results)
        propertyName = results[0].name
      })
    })

    it('should get a property by name', () => {
      return hubspot.deals.properties
        .getByName(propertyName)
        .then((results) => {
          // console.log(results)
          expect(results).to.be.an('object')
          expect(results).to.have.a.property('name')
        })
    })
  })

  describe('upsert (create)', () => {
    it('should create or update the property', () => {
      return hubspot.deals.properties.upsert(property).then((data) => {
        expect(data).to.be.an('object')
        expect(data).to.have.a.property('name')
      })
    })
  })

  describe('delete', () => {
    const testDeleteProperty = {
      name: 'delete_test_property_' + Date.now(),
      label: 'node-hubspot test property',
      groupName: 'dealinformation',
      description: 'Test property',
      type: 'string',
      fieldType: 'text',
      formField: false,
      displayOrder: -1,
      options: [],
    }

    it('should delete a property', () => {
      return hubspot.deals.properties
        .upsert(testDeleteProperty)
        .then((data) => {
          expect(data).to.be.an('object')
          expect(data).to.have.a.property('name')
          return hubspot.deals.properties.delete(testDeleteProperty.name)
        })
    })
  })

  describe('update', () => {
    property.label = 'MadKudo Company Fit'

    it('should update the property', () => {
      return hubspot.deals.properties
        .update(property.name, property)
        .then((data) => {
          expect(data).to.be.an('object')
          expect(data).to.have.a.property('name')
          expect(data.label).to.equal(property.label)
        })
    })
  })
})
