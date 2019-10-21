const { expect } = require('chai')

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

describe('forms', () => {
  describe('getAll', () => {
    it('should return all forms', () => {
      return hubspot.forms.getAll().then((data) => {
        expect(data).to.be.a('array')
        expect(data.length).to.be.above(0)
      })
    })

    it('should return a limited number of forms', () => {
      return hubspot.forms.get({ limit: 5 }).then((data) => {
        expect(data).to.be.a('array')
        expect(data.length).to.eq(5)
      })
    })
  })

  describe('getById', () => {
    let formGuid, name

    before(() => {
      return hubspot.forms.get({ limit: 1 }).then((data) => {
        formGuid = data[0].guid
        name = data[0].name
      })
    })

    it('should return a form', () => {
      return hubspot.forms.getById(formGuid).then((data) => {
        expect(data).to.be.a('object')
        expect(data.name).to.eq(name)
      })
    })
  })

  describe('getFields', () => {
    let formGuid

    before(() => {
      return hubspot.forms.get({ limit: 1 }).then((data) => {
        formGuid = data[0].guid
      })
    })

    it('should return all fields', () => {
      return hubspot.forms.getFields(formGuid).then((data) => {
        expect(data).to.be.a('array')
      })
    })
  })

  describe('getSingleField', () => {
    let formGuid, fieldName

    before(() => {
      return hubspot.forms
        .get({ limit: 1, offset: 10 })
        .then((data) => {
          formGuid = data[0].guid
          return hubspot.forms.getFields(formGuid)
        })
        .then((data) => {
          fieldName = data[0].name
        })
    })

    it('should return a single field', () => {
      return hubspot.forms.getSingleField(formGuid, fieldName).then((data) => {
        expect(data).to.be.a('object')
        expect(data.name).to.eq(fieldName)
      })
    })
  })

  describe('getSubmissions', () => {
    let formGuid

    before(() => {
      return hubspot.forms.get({ limit: 1, offset: 5 }).then((data) => {
        formGuid = data[0].guid
      })
    })

    it('should return sugmissions', () => {
      return hubspot.forms.getSubmissions(formGuid).then((data) => {
        expect(data).to.be.a('object')
        expect(data.results).to.be.a('array')
      })
    })
  })

  describe('create', () => {
    it('should create a form', () => {
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

      return hubspot.forms.create(payload).then((data) => {
        expect(data.name).to.eq('CREATE: A test form')
        expect(data.submitText).to.eq('Submit')
        return hubspot.forms.delete(data.guid)
      })
    })
  })

  describe('update', () => {
    let formGuid

    before(() => {
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

      return hubspot.forms.create(payload).then((data) => {
        formGuid = data.guid
      })
    })
    after(() => {
      return hubspot.forms.delete(formGuid)
    })

    it('can update a form', () => {
      const payload = {
        name: 'UPDATE: A new name',
        redirect: 'http://hubspot.com',
      }

      return hubspot.forms.update(formGuid, payload).then((data) => {
        expect(data.name).to.eq('UPDATE: A new name')
        expect(data.redirect).to.eq('http://hubspot.com')
      })
    })
  })

  describe('delete', () => {
    let formGuid

    before(() => {
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

      return hubspot.forms.create(payload).then((data) => {
        formGuid = data.guid
      })
    })

    it('can delete a form', () => {
      return hubspot.forms.delete(formGuid)
    })
  })
})
