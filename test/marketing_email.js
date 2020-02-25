const { expect } = require('chai')

const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

describe('marketingEmail', () => {
  describe('getAll', () => {
    it('should return all the marketing emails', () => {
      return hubspot.marketingEmail.getAll().then((data) => {
        expect(data).to.be.an('object')
        expect(data.objects).to.be.a('array')
        expect(data.objects.length).to.be.above(0)
      })
    })

    it('should return a limited number of emails', () => {
      return hubspot.marketingEmail.get({ limit: 1 }).then((data) => {
        expect(data.objects).to.be.a('array')
        expect(data.objects.length).to.be.above(0)
      })
    })
  })

  describe('getById', () => {
    let id, name, author

    before(() => {
      return hubspot.marketingEmail.get().then((data) => {
        id = data.objects[0].id
        name = data.objects[0].name
        author = data.objects[0].author
      })
    })

    it('should return a email', () => {
      return hubspot.marketingEmail.getById(id).then((data) => {
        expect(data).to.be.a('object')
        expect(data.name).to.eq(name)
        expect(data.author).to.eq(author)
      })
    })
  })

  describe('create', () => {
    const payload = {
      name: 'CREATE: A test marketing email',
      abVariation: false,
      htmlTitle: 'htmlTitle',
      isPublished: false,
    }

    const emailEndpoint = {
      path: '/marketing-emails/v1/emails',
      request: payload,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [emailEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should create a marketing email', () => {
        return hubspot.marketingEmail.create(payload).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('update', () => {
    const id = 'mock_id'
    const payload = {
      fromName: 'Sample Author',
      emailBody: 'Example email body',
    }

    const emailEndpoint = {
      path: `/marketing-emails/v1/emails/${id}`,
      request: payload,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      putEndpoints: [emailEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can update a marketing email', () => {
        return hubspot.marketingEmail.update(id, payload).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('clone', () => {
    const id = 'mock_id'
    const payload = {
      name: 'New name of a cloned email',
    }

    const emailEndpoint = {
      path: `/marketing-emails/v1/emails/${id}/clone`,
      request: payload,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [emailEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can clone a marketing email', () => {
        return hubspot.marketingEmail.clone(id, payload).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('delete', () => {
    const id = 'mock_id'

    const emailEndpoint = {
      path: `/marketing-emails/v1/emails/${id}`,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      deleteEndpoints: [emailEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can delete a marketing email', () => {
        return hubspot.marketingEmail.delete(id).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('versions', () => {
    let id

    before(() => {
      return hubspot.marketingEmail.get().then((data) => {
        id = data.objects[0].id
      })
    })

    it('should return the versions of an email', () => {
      return hubspot.marketingEmail.versions(id).then((data) => {
        expect(data).to.be.an('array')
        expect(data.length).to.be.above(0)
        expect(data[0]).to.be.an('object')
        expect(data[0].id).to.be.eq(-1)
        expect(data[0].object).to.be.an('object')
        expect(data[0].object.id).to.be.eq(id)
      })
    })
  })

  describe('restore', () => {
    const id = 'mock_id'

    const emailEndpoint = {
      path: `/marketing-emails/v1/emails/${id}/restore-deleted`,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      putEndpoints: [emailEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can restore a marketing email', () => {
        return hubspot.marketingEmail.restore(id).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('hasBufferedChanges', () => {
    let id

    before(() => {
      return hubspot.marketingEmail.get().then((data) => {
        id = data.objects[0].id
      })
    })

    it('should return whether the email has buffered changes or not', () => {
      return hubspot.marketingEmail.hasBufferedChanges(id).then((data) => {
        expect(data).to.be.a('object')
        expect(data.has_changes).to.be.a('boolean')
      })
    })
  })

  describe('statistics', () => {
    it('should return all the marketing emails with statistics', () => {
      return hubspot.marketingEmail.statistics().then((data) => {
        expect(data).to.be.an('object')
        expect(data.objects).to.be.a('array')
        expect(data.objects.length).to.be.above(0)
        expect(data.objects[0].stats).to.be.an('object')
      })
    })

    it('should return a limited number of emails with statistics', () => {
      return hubspot.marketingEmail.statistics({ limit: 1 }).then((data) => {
        expect(data.objects).to.be.a('array')
        expect(data.objects.length).to.be.above(0)
        expect(data.objects[0].stats).to.be.an('object')
      })
    })
  })

  describe('statisticsById', () => {
    let id, name, author

    before(() => {
      return hubspot.marketingEmail.statistics().then((data) => {
        id = data.objects[0].id
        name = data.objects[0].name
        author = data.objects[0].author
      })
    })

    it('should return a email with statistics', () => {
      return hubspot.marketingEmail.statisticsById(id).then((data) => {
        expect(data).to.be.a('object')
        expect(data.name).to.eq(name)
        expect(data.author).to.eq(author)
        expect(data.stats).to.be.an('object')
      })
    })
  })
})
