const { expect } = require('chai')
const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')

describe('deals', () => {
  const hubspot = new Hubspot({
    accessToken: process.env.ACCESS_TOKEN || 'fake-token',
  })
  const dealProperties = [
    {
      value: 'MadKudu',
      name: 'dealname',
    },
    {
      value: 'appointmentscheduled',
      name: 'dealstage',
    },
    {
      value: 'default',
      name: 'pipeline',
    },
    {
      value: Date.now(),
      name: 'closedate',
    },
    {
      value: '60000',
      name: 'amount',
    },
    {
      value: 'newbusiness',
      name: 'dealtype',
    },
  ]
  const companyProperties = [
    { name: 'name', value: 'A company name' },
    { name: 'description', value: 'A company description' },
  ]
  const createTestDeal = () => hubspot.deals.create({ properties: dealProperties })
  const deleteTestDeal = (dealId) => hubspot.deals.deleteById(dealId)
  const createTestCompany = () => hubspot.companies.create({ properties: companyProperties })
  const createDealWithCompany = () =>
    hubspot.companies.create({ properties: companyProperties }).then((companyData) => {
      return hubspot.deals
        .create({
          associations: {
            associatedCompanyIds: [companyData.companyId],
          },
          properties: dealProperties,
        })
        .then((dealData) => {
          return {
            dataCompanyId: companyData.companyId,
            dataDealId: dealData.dealId,
          }
        })
    })
  const deleteTestCompany = (companyId) => hubspot.companies.delete(companyId)

  describe('get', () => {
    const dealsEndpoint = {
      path: '/deals/v1/deal/paged',
      response: { deals: [] },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [dealsEndpoint] })

    it('Should return deal properties', () => {
      return hubspot.deals.get().then((data) => {
        expect(data).to.be.a('object')
        expect(data.deals).to.be.an('array')
      })
    })
  })

  describe('getRecentlyCreated', () => {
    const recentlyCreatedDealsEndpoint = {
      path: '/deals/v1/deal/recent/created',
      response: { results: [] },
    }
    fakeHubspotApi.setupServer({
      getEndpoints: [recentlyCreatedDealsEndpoint],
    })

    it('Returns Recently Created Deals', () => {
      return hubspot.deals.getRecentlyCreated().then((data) => {
        expect(data.results).to.be.an('array')
      })
    })
  })

  describe('getRecentlyModified', () => {
    const recentlyModifiedDealsEndpoint = {
      path: '/deals/v1/deal/recent/modified',
      response: { results: [] },
    }
    fakeHubspotApi.setupServer({
      getEndpoints: [recentlyModifiedDealsEndpoint],
    })

    it('Returns Recently Modified Deals', () => {
      return hubspot.deals.getRecentlyModified().then((data) => {
        expect(data.results).to.be.an('array')
      })
    })
  })

  describe('getById', () => {
    let dealId = 123
    const dealEndpoint = {
      path: `/deals/v1/deal/${dealId}`,
      response: {},
    }
    fakeHubspotApi.setupServer({ getEndpoints: [dealEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return createTestDeal().then((data) => {
          dealId = data.dealId
        })
      }
    })
    after(() => {
      if (process.env.NOCK_OFF) {
        return deleteTestDeal(dealId)
      }
    })

    it("Returns the entire deal, including all of it's properties", () => {
      return hubspot.deals.getById(dealId).then((data) => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('getAssociated', () => {
    let dealId = 123
    let companyId = 234
    const associationType = 'COMPANY'
    const associatedDealsEndpoint = {
      path: `/deals/v1/deal/associated/${associationType}/${companyId}/paged`,
      response: { deals: [{}] },
    }
    fakeHubspotApi.setupServer({ getEndpoints: [associatedDealsEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return createDealWithCompany().then(({ dataDealId, dataCompanyId }) => {
          dealId = dataDealId
          companyId = dataCompanyId
        })
      }
    })
    after(() => {
      if (process.env.NOCK_OFF) {
        return deleteTestDeal(dealId).then(() => deleteTestCompany(companyId))
      }
    })

    it('Returns the deals associated to the object', () => {
      return hubspot.deals.getAssociated(associationType, companyId).then((data) => {
        expect(data).to.be.an('object')
        expect(data.deals).to.have.length(1)
      })
    })
  })

  describe('deleteById', () => {
    let dealId = 123
    const deleteDealEndpoint = {
      path: `/deals/v1/deal/${dealId}`,
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({ deleteEndpoints: [deleteDealEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return createTestDeal().then((data) => (dealId = data.dealId))
      }
    })

    it('should delete a deal by Id', () => {
      return hubspot.deals.deleteById(dealId).then((data) => {
        expect(data).to.be.an('undefined')
      })
    })
  })

  describe('updateById', () => {
    let dealId = 123
    const updateDealEndpoint = {
      path: `/deals/v1/deal/${dealId}`,
      response: {},
    }
    fakeHubspotApi.setupServer({ putEndpoints: [updateDealEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return createTestDeal().then((data) => (dealId = data.dealId))
      }
    })
    after(() => {
      if (process.env.NOCK_OFF) {
        return deleteTestDeal(dealId)
      }
    })

    it('updates the deal', () => {
      return hubspot.deals
        .updateById(dealId, {
          properties: [{ name: 'dealname', value: 'MadKudu' }],
        })
        .then((data) => {
          expect(data).to.be.an('object')
        })
    })
  })

  describe('updateBatch', () => {
    const dealIds = [123, 234, 345]
    let updateBatch = dealIds.map((objectId) => ({
      objectId,
      dealProperties,
    }))

    const updateBatchEndpoint = {
      path: '/deals/v1/batch-async/update',
      statusCode: 202,
      request: updateBatch,
    }
    fakeHubspotApi.setupServer({
      postEndpoints: [updateBatchEndpoint],
    })

    before(() => {
      if (process.env.NOCK_OFF) {
        return hubspot.deals.get({ count: 3 }).then((data) => {
          updateBatch = data.contacts.map(({ objectId }) => ({
            objectId,
            dealProperties,
          }))
        })
      }
    })

    it('should update a batch of deals', () => {
      return hubspot.deals.updateBatch(updateBatch).then((data) => {
        expect(data).to.equal(undefined)
      })
    })
  })

  describe('create', () => {
    let dealId
    const createDealEndpoint = {
      path: '/deals/v1/deal',
      response: {},
    }
    fakeHubspotApi.setupServer({ postEndpoints: [createDealEndpoint] })

    after(() => {
      if (process.env.NOCK_OFF) {
        return deleteTestDeal(dealId)
      }
    })

    it('Returns a 200 with the newly created Deal', () => {
      return hubspot.deals
        .create({
          properties: [
            {
              value: 'MadKudu',
              name: 'dealname',
            },
            {
              value: 'appointmentscheduled',
              name: 'dealstage',
            },
            {
              value: 'default',
              name: 'pipeline',
            },
            {
              value: '60000',
              name: 'amount',
            },
            {
              value: 'newbusiness',
              name: 'dealtype',
            },
          ],
        })
        .then((data) => {
          dealId = data.dealId
          expect(data).to.be.a('object')
        })
    })
  })

  describe('associate', () => {
    let dealId = 123
    let companyId = 234
    const associationType = 'COMPANY'
    const associateDealEndpoint = {
      path: `/deals/v1/deal/${dealId}/associations/${associationType}`,
      query: { id: companyId },
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({ putEndpoints: [associateDealEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return Promise.all([
          createTestDeal().then((data) => (dealId = data.dealId)),
          createTestCompany().then((data) => (companyId = data.companyId)),
        ])
      }
    })
    after(() => {
      if (process.env.NOCK_OFF) {
        return Promise.all([deleteTestDeal(dealId), deleteTestCompany(companyId)])
      }
    })

    it('Returns a 204', () => {
      return hubspot.deals.associate(dealId, associationType, companyId).then((data) => {
        expect(data).to.be.an('undefined')
      })
    })
  })

  describe('removeAssociation', () => {
    let dealId = 123
    let companyId = 234
    const associationType = 'COMPANY'
    const unassociateDealEndpoint = {
      path: `/deals/v1/deal/${dealId}/associations/${associationType}`,
      query: { id: companyId },
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({ deleteEndpoints: [unassociateDealEndpoint] })

    before(() => {
      if (process.env.NOCK_OFF) {
        return createDealWithCompany().then(({ dataDealId, dataCompanyId }) => {
          dealId = dataDealId
          companyId = dataCompanyId
        })
      }
    })
    after(() => {
      if (process.env.NOCK_OFF) {
        return Promise.all([deleteTestDeal(dealId), deleteTestCompany(companyId)])
      }
    })

    it('Returns a 204', () => {
      return hubspot.deals.removeAssociation(dealId, associationType, companyId).then((data) => {
        expect(data).to.be.an('undefined')
      })
    })
  })
})
