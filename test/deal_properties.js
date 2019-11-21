const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
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
      return hubspot.deals.properties.getByName(propertyName).then((results) => {
        // console.log(results)
        expect(results).to.be.an('object')
        expect(results).to.have.a.property('name')
      })
    })
  })

  describe('upsert call create endpoint first ', () => {
    const companiesEndpoint = {
      path: '/properties/v1/deals/properties',
      request: property,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [companiesEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should create or update the property (not existed)', () => {
        return hubspot.deals.properties.upsert(property).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('upsert call update endpoint if property exists ', () => {
    const tryCreateEndpoint = {
      path: '/properties/v1/deals/properties',
      request: property,
      response: 'property exists',
      statusCode: 409,
    }

    const propertiesEndpoint = {
      path: `/properties/v1/deals/properties/named/${property.name}`,
      request: property,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [tryCreateEndpoint],
      putEndpoints: [propertiesEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should create or update the property (existed)', () => {
        return hubspot.deals.properties.upsert(property).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('delete', () => {
    const propertiesEndpoint = {
      path: `/properties/v1/deals/properties/named/${property.name}`,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      deleteEndpoints: [propertiesEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should delete a property', () => {
        return hubspot.deals.properties.delete(property.name).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.eq(true)
        })
      })
    }
  })

  describe('update', () => {
    const propertiesEndpoint = {
      path: `/properties/v1/deals/properties/named/${property.name}`,
      request: property,
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      putEndpoints: [propertiesEndpoint],
      demo: true,
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should update the property', () => {
        return hubspot.deals.properties.update(property.name, property).then((data) => {
          expect(data).to.be.an('object')
          expect(data.success).to.eq(true)
        })
      })
    }
  })
})
