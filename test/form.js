const { expect } = require('chai')

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('forms', function() {
  describe('getAll', function() {
    it('should return all forms', function() {
      return hubspot.forms.getAll().then(data => {
        expect(data).to.be.a('array')
        expect(data.length).to.be.above(0)
      })
    })

    it('should return a limited number of forms', function() {
      return hubspot.forms.get({ limit: 5 }).then(data => {
        expect(data).to.be.a('array')
        expect(data.length).to.eq(5)
      })
    })
  })

  describe('getById', function() {
    let formGuid, name

    before(function() {
      return hubspot.forms.get({ limit: 1 }).then(data => {
        formGuid = data[0].guid
        name = data[0].name
      })
    })

    it('should return a form', function() {
      return hubspot.forms.getById(formGuid).then(data => {
        expect(data).to.be.a('object')
        expect(data.name).to.eq(name)
      })
    })
  })

  describe('getFields', function() {
    let formGuid

    before(function() {
      return hubspot.forms.get({ limit: 1 }).then(data => {
        formGuid = data[0].guid
      })
    })

    it('should return all fields', function() {
      return hubspot.forms.getFields(formGuid).then(data => {
        expect(data).to.be.a('array')
      })
    })
  })

  describe('getSingleField', function() {
    let formGuid, fieldName

    before(function() {
      return hubspot.forms
        .get({ limit: 1, offset: 10 })
        .then(data => {
          formGuid = data[0].guid
          return hubspot.forms.getFields(formGuid)
        })
        .then(data => {
          fieldName = data[0].name
        })
    })

    it('should return a single field', function() {
      return hubspot.forms.getSingleField(formGuid, fieldName).then(data => {
        expect(data).to.be.a('object')
        expect(data.name).to.eq(fieldName)
      })
    })
  })

  describe('getSubmissions', function() {
    let formGuid

    before(function() {
      return hubspot.forms.get({ limit: 1, offset: 5 }).then(data => {
        formGuid = data[0].guid
      })
    })

    it('should return sugmissions', function() {
      return hubspot.forms.getSubmissions(formGuid).then(data => {
        expect(data).to.be.a('object')
        expect(data.results).to.be.a('array')
      })
    })
  })
})
