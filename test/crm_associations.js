const { expect } = require('chai')
const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')

describe('crm.associations', function() {
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
  const createTestDeal = () =>
    hubspot.deals.create({ properties: dealProperties })
  const deleteTestDeal = dealId => hubspot.deals.deleteById(dealId)
  const createTestCompany = () =>
    hubspot.companies.create({ properties: companyProperties })
  const createDealWithCompany = () =>
    hubspot.companies
      .create({ properties: companyProperties })
      .then(companyData => {
        return hubspot.deals
          .create({
            associations: {
              associatedCompanyIds: [companyData.companyId],
            },
            properties: dealProperties,
          })
          .then(dealData => {
            return {
              dataCompanyId: companyData.companyId,
              dataDealId: dealData.dealId,
            }
          })
      })
  const deleteTestCompany = companyId => hubspot.companies.delete(companyId)

  describe('create', function() {
    let dealId = 123
    let companyId = 234
    const category = 'HUBSPOT_DEFINED'
    const createAssociationEndpoint = {
      path: `/crm-associations/v1/associations`,
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({ putEndpoints: [createAssociationEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return Promise.all([
          createTestDeal().then(data => (dealId = data.dealId)),
          createTestCompany().then(data => (companyId = data.companyId)),
        ])
      }
    })
    after(function() {
      if (process.env.NOCK_OFF) {
        return Promise.all([
          deleteTestDeal(dealId),
          deleteTestCompany(companyId),
        ])
      }
    })

    it('Returns a 204', function() {
      return hubspot.crm.associations
        .create({
          fromObjectId: dealId,
          toObjectId: companyId,
          category: category,
          definitionId: 5,
        })
        .then(data => {
          expect(data).to.be.an('undefined')
        })
    })
  })

  describe('createBatch', function() {
    let dealId = 123
    let companyId = 234
    const category = 'HUBSPOT_DEFINED'
    const createBatchAssociationEndpoint = {
      path: `/crm-associations/v1/associations/create-batch`,
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({
      putEndpoints: [createBatchAssociationEndpoint],
    })

    before(function() {
      if (process.env.NOCK_OFF) {
        return Promise.all([
          createTestDeal().then(data => (dealId = data.dealId)),
          createTestCompany().then(data => (companyId = data.companyId)),
        ])
      }
    })
    after(function() {
      if (process.env.NOCK_OFF) {
        return Promise.all([
          deleteTestDeal(dealId),
          deleteTestCompany(companyId),
        ])
      }
    })

    it('Returns a 204', function() {
      return hubspot.crm.associations
        .createBatch([
          {
            fromObjectId: dealId,
            toObjectId: companyId,
            category: category,
            definitionId: 5,
          },
        ])
        .then(data => {
          expect(data).to.be.an('undefined')
        })
    })
  })

  describe('delete', function() {
    let dealId = 123
    let companyId = 234
    const category = 'HUBSPOT_DEFINED'
    const deleteAssociationEndpoint = {
      path: `/crm-associations/v1/associations/delete`,
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({ putEndpoints: [deleteAssociationEndpoint] })

    before(function() {
      if (process.env.NOCK_OFF) {
        return createDealWithCompany().then(({ dataDealId, dataCompanyId }) => {
          dealId = dataDealId
          companyId = dataCompanyId
        })
      }
    })
    after(function() {
      if (process.env.NOCK_OFF) {
        return Promise.all([
          deleteTestDeal(dealId),
          deleteTestCompany(companyId),
        ])
      }
    })

    it('Returns a 204', function() {
      return hubspot.crm.associations
        .delete({
          fromObjectId: dealId,
          toObjectId: companyId,
          category: category,
          definitionId: 5,
        })
        .then(data => {
          expect(data).to.be.an('undefined')
        })
    })
  })

  describe('deleteBatch', function() {
    let dealId = 123
    let companyId = 234
    const category = 'HUBSPOT_DEFINED'
    const deleteBatchAssociationEndpoint = {
      path: `/crm-associations/v1/associations/delete-batch`,
      statusCode: 204,
    }
    fakeHubspotApi.setupServer({
      putEndpoints: [deleteBatchAssociationEndpoint],
    })

    before(function() {
      if (process.env.NOCK_OFF) {
        return Promise.all([
          createTestDeal().then(data => (dealId = data.dealId)),
          createTestCompany().then(data => (companyId = data.companyId)),
        ])
      }
    })
    after(function() {
      if (process.env.NOCK_OFF) {
        return Promise.all([
          deleteTestDeal(dealId),
          deleteTestCompany(companyId),
        ])
      }
    })

    it('Returns a 204', function() {
      return hubspot.crm.associations
        .deleteBatch([
          {
            fromObjectId: dealId,
            toObjectId: companyId,
            category: category,
            definitionId: 5,
          },
        ])
        .then(data => {
          expect(data).to.be.an('undefined')
        })
    })
  })
})
