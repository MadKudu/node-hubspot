const { expect } = require('chai')

const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
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
        expect(data.length).to.lte(5)
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
        .get({ limit: 1 })
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
      return hubspot.forms.get({ limit: 1 }).then((data) => {
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

    const formEndpoint = {
      path: '/forms/v2/forms',
      request: payload,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [formEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should create a form', () => {
        return hubspot.forms.create(payload).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('update', () => {
    const formGuid = 'fake_guid'
    const payload = {
      name: 'UPDATE: A new name',
      redirect: 'http://hubspot.com',
    }

    const formEndpoint = {
      path: `/forms/v2/forms/${formGuid}`,
      request: payload,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      putEndpoints: [formEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can update a form', () => {
        return hubspot.forms.update(formGuid, payload).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('delete', () => {
    const formGuid = 'fake_guid'

    const formEndpoint = {
      path: `/forms/v2/forms/${formGuid}`,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      deleteEndpoints: [formEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can delete a form', () => {
        return hubspot.forms.delete(formGuid).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })
})
