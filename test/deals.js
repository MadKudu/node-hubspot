const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('Deals', function () {
  describe('get', function () {
    it('Should return deal properties', function () {
      return hubspot.deals.get().then(data => {
        expect(data).to.be.a('object')
        expect(data.deals).to.be.an('array')
      })
    })
  })

  describe('getRecentlyCreated', function () {
    it('Returns Recently Created Deals', function () {
      return hubspot.deals.getRecentlyCreated().then(data => {
        // console.log(data)
        expect(data.results).to.be.an('array')
        expect(data.hasMore).to.equal(true)
      })
    })
  })

  describe('getRecentlyModified', function () {
    it('Returns Recently Modified Deals', function () {
      return hubspot.deals.getRecentlyModified().then(data => {
        expect(data.results).to.be.an('array')
        expect(data.hasMore).to.equal(true)
      })
    })
  })

  describe('getById', function () {
    let dealId

    before(function () {
      return hubspot.deals.get().then(data => {
        dealId = data.deals[0].dealId
      })
    })
    it('Returns the entire deal, including all of it\'s properties', function () {
      return hubspot.deals.getById(dealId).then(data => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('getAssociated', function () {
    it('Returns the deals associated to the object', function () {
      return hubspot.deals.getAssociated('CONTACT', 394455).then(data => {
        expect(data).to.be.an('object')
        expect(data.hasMore).to.equal(false)
        expect(data.deals).to.be.an('array')
        expect(data.deals).to.have.length(0)
      })
    })
  })

  describe('deleteById', function () {
    let dealId

    before(function () {
      return hubspot.deals.get().then(data => {
        dealId = data.deals[0].dealId
      })
    })

    it('should delete a deal by Id', function () {
      return hubspot.deals.deleteById(dealId).then(data => {
        expect(data).to.be.an('undefined')
      })
    })
  })

  describe('updateById', function () {
    let dealId

    before(function () {
      return hubspot.deals.get().then(data => {
        dealId = data.deals[0].dealId
      })
    })

    it('Returns the entire deal profile', function () {
      return hubspot.deals.updateById(dealId, {
        'properties': [{'name': 'dealname', 'value': 'MadKudu'}]
      }).then(data => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('create', function () {
    it('Returns a 200 with the newly created Deal', function () {
      return hubspot.deals.create({
        // 'associations': {
        //   'associatedCompanyIds': [
        //     8954037
        //   ],
        //   'associatedVids': [
        //     27136
        //   ]
        // },
        'portalId': 62515,
        'properties': [
          {
            'value': 'MadKudu',
            'name': 'dealname'
          },
          {
            'value': 'appointmentscheduled',
            'name': 'dealstage'
          },
          {
            'value': 'default',
            'name': 'pipeline'
          },
          // {
          //   'value': '24',
          //   'name': 'hubspot_owner_id'
          // },
          {
            'value': Date.now(),
            'name': 'closedate'
          },
          {
            'value': '60000',
            'name': 'amount'
          },
          {
            'value': 'newbusiness',
            'name': 'dealtype'
          }
        ]
      }).then(data => {
        expect(data).to.be.a('object')
      })
    })
  })

  // describe('Associate', function () {
  //   it('Returns a 204 response if successful.', function () {
  //     return hubspot.deals.associate(1126609, 'CONTACT', 394455).then(data => {
  //       expect(data).to.be.a('object')
  //     })
  //   })
  // })

  // describe('Remove Association', function () {
  //   it('Returns a 200 response if successful.', function () {
  //     return hubspot.deals.removeAssociation(1126609, 'CONTACT', 394455).then(data => {
  //       expect(res.statusCode).to.equal(204)
  //     })
  //   })
  // })
})
