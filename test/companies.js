const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const apiKey = { apiKey: process.env.HUBSPOT_API_KEY || 'demo' }
const hubspot = new Hubspot(apiKey)

describe('companies', () => {
  describe('get', () => {
    it('should return all companies', () => {
      return hubspot.companies.get().then((data) => {
        expect(data).to.be.an('object')
        expect(data.companies).to.be.a('array')
      })
    })

    it('should return a limited number of companies', () => {
      // you need to run the tests at least 6 times to have enough companies for this test to pass
      return hubspot.companies.get({ limit: 5 }).then((data) => {
        expect(data).to.be.an('object')
        expect(data.companies).to.be.a('array')
        expect(data.companies.length).to.eq(5)
        expect(data['has-more']).to.eq(true)
      })
    })

    it('should return the requested properties', () => {
      return hubspot.companies.get({ limit: 5, properties: ['name', 'country', 'city'] }).then((data) => {
        expect(data.companies).to.be.a('array')
        expect(data.companies[0].properties.name.value).to.be.a('string')
      })
    })
  })

  describe('getById', () => {
    let companyId

    before(() => {
      return hubspot.companies.get().then((data) => {
        companyId = data.companies[0].companyId
      })
    })

    it('should return a company', () => {
      return hubspot.companies.getById(companyId).then((data) => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('getRecentlyCreated', () => {
    it('should return recently created companies', () => {
      return hubspot.companies.getRecentlyCreated().then((data) => {
        expect(data).to.be.an('object')
        expect(data.results).to.be.a('array')
      })
    })
  })

  describe('getRecentlyModified', () => {
    it('should return recently modified companies', () => {
      return hubspot.companies.getRecentlyModified().then((data) => {
        expect(data).to.be.an('object')
        expect(data.results).to.be.a('array')
      })
    })
  })

  describe('getByDomain', () => {
    const domain = 'fake_domain'
    const payload = {
      limit: 2,
      requestOptions: {
        properties: ['domain', 'createdate', 'name', 'hs_lastmodifieddate'],
      },
      offset: {
        isPrimary: true,
        companyId: 0,
      },
    }

    const companiesEndpoint = {
      path: `/companies/v2/domains/${domain}/companies`,
      request: payload,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [companiesEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it(`should returns a list of all companies that have a matching 
      domain to the specified domain in the request URL`, () => {
        return hubspot.companies.getByDomain(domain, payload).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('create', () => {
    const payload = {
      properties: [
        { name: 'name', value: 'A company name' },
        { name: 'description', value: 'A company description' },
      ],
    }

    const companiesEndpoint = {
      path: '/companies/v2/companies',
      request: payload,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [companiesEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should create a company in a given portal', () => {
        return hubspot.companies.create(payload).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('delete', () => {
    const id = 'fake_id'

    const companiesEndpoint = {
      path: `/companies/v2/companies/${id}`,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      deleteEndpoints: [companiesEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('can delete', () => {
        return hubspot.companies.delete(id).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('getContactIds', () => {
    let companyId

    before(() => {
      return hubspot.companies.get().then((data) => {
        companyId = data.companies[0].companyId
      })
    })

    it('should return a list of contact vids', () => {
      const payload = { count: 10 }
      return hubspot.companies.getContactIds(companyId, payload).then((data) => {
        expect(data).to.be.an('object')
        expect(data).to.have.property('vids')
        expect(data).to.have.property('vidOffset')
        expect(data).to.have.property('hasMore')
        expect(data.vids).to.be.an('array')
      })
    })
  })

  describe('getContacts', () => {
    let companyId

    before(() => {
      return hubspot.companies.get().then((data) => {
        companyId = data.companies[0].companyId
      })
    })

    it('should return a list of contact objects', () => {
      const payload = { count: 10 }
      return hubspot.companies.getContacts(companyId, payload).then((data) => {
        expect(data).to.be.an('object')
        expect(data).to.have.property('contacts')
        expect(data).to.have.property('vidOffset')
        expect(data).to.have.property('hasMore')
        expect(data.contacts).to.be.an('array')
      })
    })
  })

  describe('updateBatch', () => {
    const payload = [
      {
        objectId: 'fake_id',
        properties: [{ name: 'about_us', value: 'Thumbs up!' }],
      },
      {
        objectId: 'fake_id1',
        properties: [{ name: 'about_us', value: 'Thumbs up!!!' }],
      },
    ]

    const companiesEndpoint = {
      path: '/companies/v1/batch-async/update',
      request: payload,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [companiesEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should update a batch of company', () => {
        return hubspot.companies.updateBatch(payload).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.equal(true)
        })
      })
    }
  })

  describe('addContactToCompany', () => {
    const data = { companyId: 322620707, contactVid: 123123 }

    const companiesEndpoint = {
      path: `/companies/v2/companies/${data.companyId}/contacts/${data.contactVid}`,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      putEndpoints: [companiesEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should add contact to a specific company', () => {
        return hubspot.companies.addContactToCompany(data).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })
})
