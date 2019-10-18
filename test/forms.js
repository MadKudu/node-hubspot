const { expect } = require('chai')

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

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

  describe('create', function() {
    it('should create a form', function() {
      const payload = {
        name: 'CREATE: A test form',
        submitText: 'Submit',
        formFieldGroups: [
          {
            fields: [
              {
                name: 'firstname',
                label: 'First name',
                defaultValue: '',
                placeholder: 'Enter first name',
              },
            ],
          },
        ],
      }

      return hubspot.forms.create(payload).then(data => {
        expect(data.name).to.eq('CREATE: A test form')
        expect(data.submitText).to.eq('Submit')
        return hubspot.forms.delete(data.guid)
      })
    })
  })

  describe('update', function() {
    let formGuid

    before(function() {
      const payload = {
        name: 'UPDATE: A new name',
        submitText: 'Submit',
        formFieldGroups: [
          {
            fields: [
              {
                name: 'firstname',
                label: 'First name',
                defaultValue: '',
                placeholder: 'Enter first name',
              },
            ],
          },
        ],
      }

      return hubspot.forms.create(payload).then(data => {
        formGuid = data.guid
      })
    })
    after(function() {
      return hubspot.forms.delete(formGuid)
    })

    it('can update a form', function() {
      const payload = {
        name: 'UPDATE: A new name',
        redirect: 'http://hubspot.com',
      }

      return hubspot.forms.update(formGuid, payload).then(data => {
        expect(data.name).to.eq('UPDATE: A new name')
        expect(data.redirect).to.eq('http://hubspot.com')
      })
    })
  })

  describe('delete', function() {
    let formGuid

    before(function() {
      const payload = {
        name: 'DELETE: A new name',
        submitText: 'Submit',
        formFieldGroups: [
          {
            fields: [
              {
                name: 'firstname',
                label: 'First name',
                defaultValue: '',
                placeholder: 'Enter first name',
              },
            ],
          },
        ],
      }

      return hubspot.forms.create(payload).then(data => {
        formGuid = data.guid
      })
    })

    it('can delete a form', function() {
      return hubspot.forms.delete(formGuid)
    })
  })
})
