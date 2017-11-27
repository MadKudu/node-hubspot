var chai = require('chai')
var expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })
const _ = require('lodash')

describe('companies', function () {
  describe('get', function () {
    it('should return all companies', function () {
      return hubspot.companies.get().then(data => {
        expect(data).to.be.an('object')
        expect(data.companies).to.be.a('array')
      })
    })

    it('should return a limited number of companies', function () {
      return hubspot.companies.get({ limit: 5 }).then(data => {
        expect(data).to.be.an('object')
        expect(data.companies).to.be.a('array')
        expect(data.companies.length).to.eq(5)
        expect(data['has-more']).to.eq(true)
      })
    })

    it('should return the requested properties', function () {
      return hubspot.companies.get({ limit: 5, properties: ['name', 'country', 'city'] }).then(data => {
        expect(data.companies).to.be.a('array')
        expect(data.companies[0].properties.name.value).to.be.a('string')
      })
    })
  })

  describe('getById', function () {
    let companyId

    before(function () {
      return hubspot.companies.get().then(data => {
        companyId = data.companies[0].companyId
      })
    })

    it('should return a company', function () {
      return hubspot.companies.getById(companyId).then(data => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('getRecentlyCreated', function () {
    it('should return recently created companies', function () {
      return hubspot.companies.getRecentlyCreated().then(data => {
        expect(data).to.be.an('object')
        expect(data.results).to.be.a('array')
      })
    })
  })

  describe('getRecentlyModified', function () {
    it('should return recently modified companies', function () {
      return hubspot.companies.getRecentlyModified().then(data => {
        expect(data).to.be.an('object')
        expect(data.results).to.be.a('array')
      })
    })
  })

  describe('getByDomain', function () {
    it('should returns a list of all companies that have a matching domain to the specified domain in the request URL', function () {
      this.timeout(10000)
      return hubspot.companies.getByDomain('example.com').then(data => {
        // console.log(data)
        expect(data).to.be.an('array')
        expect(data[0].properties.domain.value).to.equal('example.com')
      })
    })
  })

  describe('create', function () {
    it('should create a company in a given portal', function () {
      const payload = { 'properties': [{'name': 'name', 'value': 'A company name'}, {'name': 'description', 'value': 'A company description'}] }
      return hubspot.companies.create(payload).then(data => {
        expect(data).to.be.an('object')
        // console.log(data)
        expect(data.properties.name.value).to.equal('A company name')
      })
    })
  })

  describe('delete', function () {
    it('can delete', function () {
      const payload = { 'properties': [{'name': 'name', 'value': 'A company name'}, {'name': 'description', 'value': 'A company description'}] }
      return hubspot.companies.create(payload).then(data => {
        return hubspot.companies.delete(data.companyId)
      })
    })
  })

  describe('getContactIds', function () {
    let companyId

    before(function () {
      return hubspot.companies.get().then(data => {
        companyId = data.companies[0].companyId
      })
    })

    it('should return a list of contact vids', function () {
      const payload = { count: 10 }
      return hubspot.companies.getContactIds(companyId, payload).then(data => {
        expect(data).to.be.an('object')
        expect(data).to.have.property('vids')
        expect(data).to.have.property('vidOffset')
        expect(data).to.have.property('hasMore')
        expect(data.vids).to.be.an('array')
      })
    })
  })

  describe('updateBatch', function () {
    let companies

    before(function () {
      return hubspot.companies.get().then(data => {
        companies = data.companies
      })
    })

    it('should update a batch of company', function () {
      const batch = _.map(companies, company => {
        const update = { objectId: company.companyId, properties: [ { name: 'about_us', value: 'Thumbs up!' } ] }
        return update
      })
      return hubspot.companies.updateBatch(batch).then(data => {
        expect(data).to.equal(undefined)
      })
    })
  })

  // describe('addContactToCompany', function () {
  //   it('should add contact to a specific company', function () {
  //     return hubspot.companies.addContactToCompany({ companyId: 322620707, contactVid: 123123 }).then(data => {
  //       expect(data).to.be.an('undefined')
  //     })
  //   })
  // })
})
