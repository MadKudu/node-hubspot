const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

const property = {
  name: 'mk_customer_fit_segment',
  label: 'MadKudu Customer Fit',
  groupName: 'contactinformation',
  description: 'MadKudu Customer Fit',
  type: 'string',
  fieldType: 'text',
  formField: false,
  displayOrder: -1,
  options: []
}

describe('contacts.properties', function () {
  describe('get', function () {
    it('should return the list of properties for contacts', function () {
      return hubspot.contacts.properties.get().then(data => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })

  describe('getAll', function () {
    it('should return the same thing as get', function () {
      return hubspot.contacts.properties.get().then(data => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0]).to.be.an('object')
        expect(data[0]).to.have.a.property('name')
      })
    })
  })

  describe('groups', () => {
    describe('getGroups', () => {
      it('should return groups', function () {
        return hubspot.contacts.properties.getGroups().then(data => {
          // console.log(data)
          expect(data).to.be.an('array')
          expect(data[0]).to.have.a.property('name')
        })
      })
    })

    describe('createGroup', () => {
      let name, createdGroup

      beforeEach(() => {
        name = 'test_group_' + Date.now()

        return hubspot.contacts.properties.createGroup({
          name,
          displayName: 'Test Group'
        }).then(data => {
          createdGroup = data
        })
      })

      afterEach(done => {
        // ignore error in the case where group was deleted
        hubspot.contacts.properties.deleteGroup(name).then(() => done(), () => done())
      })

      it('resolves with the created group', () => {
        expect(createdGroup).to.be.an('object')
        expect(createdGroup).to.have.a.property('name')
        expect(createdGroup).to.have.a.property('displayName')
      })

      it('can update the group with updateGroup', () => {
        return hubspot.contacts.properties.updateGroup(name, { displayName: 'Updated display name' }).then(data => {
          expect(data).to.be.an('object')
          expect(data).to.have.a.property('name')
          expect(data).to.have.a.property('displayName')
        })
      })

      it('can delete the group with deleteGroup', () => {
        return hubspot.contacts.properties.deleteGroup(name)
      })
    })
  })

  describe('getByName', function () {
    let propertyName

    before(() => {
      return hubspot.contacts.properties.get()
        .then(results => {
          // console.log(results)
          propertyName = results[0].name
        })
    })

    it('should get a property by name', function () {
      return hubspot.contacts.properties.getByName(propertyName).then(results => {
        // console.log(results)
        expect(results).to.be.an('object')
        expect(results).to.have.a.property('name')
      })
    })
  })

  describe('upsert', function () {
    it('should create or update the property', function () {
      return hubspot.contacts.properties.upsert(property).then(data => {
        expect(data).to.be.an('object')
        expect(data).to.have.a.property('name')
      })
    })
  })

  describe('delete', function () {
    const testDeleteProperty = {
      name: 'delete_test_property_' + Date.now(),
      label: 'node-hubspot test property',
      groupName: 'contactinformation',
      description: 'Test property',
      type: 'string',
      fieldType: 'text',
      formField: false,
      displayOrder: -1,
      options: []
    }
    it('can delete', function () {
      return hubspot.contacts.properties.upsert(testDeleteProperty).then(data => {
        expect(data).to.be.an('object')
        expect(data).to.have.a.property('name')
        return hubspot.contacts.properties.delete(testDeleteProperty.name)
      })
    })
  })

  describe('update', function () {
    property.label = 'MadKudo Customer Fit'

    it('should update the property', function () {
      return hubspot.contacts.properties.update(property.name, property).then(data => {
        expect(data).to.be.an('object')
        expect(data).to.have.a.property('name')
        expect(data.label).to.equal(property.label)
      })
    })
  })
})
