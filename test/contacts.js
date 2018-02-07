const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })
const _ = require('lodash')

describe('contacts', function () {
  describe('get', function () {
    it('should return a batch of contacts', function () {
      return hubspot.contacts.get().then(data => {
        expect(data).to.be.a('object')
        expect(data.contacts).to.be.a('array')
        expect(data.contacts[0]).to.be.an('object')
      })
    })

    it('should return the number of contacts requested', function () {
      const count = 10
      return hubspot.contacts.get({ count: 10 }).then(data => {
        expect(data).to.be.a('object')
        expect(data.contacts).to.be.a('array')
        expect(data.contacts).to.have.length(count)
      })
    })
  })

  describe('getRecentlyModified', function () {
    it('should return last 100 updated contacts', function () {
      return hubspot.contacts.getRecentlyModified().then(data => {
        expect(data.contacts).to.be.an('array')
      })
    })
  })

  describe('getRecentlyCreated', function () {
    it('should return last 100 updated contacts', function () {
      return hubspot.contacts.getRecentlyCreated().then(data => {
        expect(data.contacts).to.be.an('array')
      })
    })
  })

  describe('getById', function () {
    let contactId

    before(function () {
      return hubspot.contacts.get().then(data => {
        contactId = data.contacts[0].vid
      })
    })

    it('should return a contact based on its id', function () {
      return hubspot.contacts.getById(contactId).then(data => {
        expect(data.vid).to.equal(contactId)
        expect(data.properties.company).to.be.an('object')
      })
    })
  })

  describe('getByIdBatch', function () {
    let contactIds

    before(function () {
      return hubspot.contacts.get({ count: 10 }).then(data => {
        // console.log(data)
        contactIds = _.map(data.contacts, 'vid')
      })
    })

    it('should return a contact record based on a array of ids', function () {
      // console.log(contactIds)
      return hubspot.contacts.getByIdBatch(contactIds).then(data => {
        // console.log(data)
        expect(data).to.be.an('object')
        expect(data).to.have.a.property(contactIds[0])
      })
    })
  })

  describe('getByEmail', function () {
    it('should return a contact record based on the email', function () {
      return hubspot.contacts.getByEmail('testingapis@hubspot.com').then(data => {
        expect(data).to.be.a('object')
        expect(data.properties).to.be.a('object')
      })
    })
  })

  describe('getByEmailBatch', function () {
    it('should return a contact record based on a array of emails', function () {
      return hubspot.contacts.getByEmailBatch(['testingapis@hubspot.com', 'testingapisawesomeandstuff@hubspot.com']).then(data => {
        // console.log(data)
        expect(data).to.be.an('object')
      })
    })
  })

  describe('update', function () {
    it('should update an existing contact', function () {
      let contactId

      before(function () {
        return hubspot.contacts.get().then(data => {
          contactId = data.contacts[0].vid
        })
      })

      return hubspot.contacts.update(contactId, {
        'properties': [
          {
            'property': 'email',
            'value': 'new-email@hubspot.com'
          },
          {
            'property': 'firstname',
            'value': 'Updated',
            'timestamp': Date.now()
          },
          {
            'property': 'lastname',
            'value': 'Lead',
            'timestamp': Date.now()
          },
          {
            'property': 'website',
            'value': 'http://hubspot-updated-lead.com'
          },
          {
            'property': 'lifecyclestage',
            'value': 'customer'
          }
        ]
      }).then(data => {
        expect(data).to.be.an('undefined')
      })
    })
  })

  describe('createOrUpdate', function () {
    it('should Create or Update a contact', function () {
      return hubspot.contacts.createOrUpdate('test@hubspot.com',
        {
          'properties': [
            {
              'property': 'email',
              'value': 'test@hubspot.com'
            },
            {
              'property': 'firstname',
              'value': 'Matt'
            },
            {
              'property': 'lastname',
              'value': 'Schnitt'
            },
            {
              'property': 'website',
              'value': 'http://hubspot.com'
            },
            {
              'property': 'company',
              'value': 'HubSpot'
            },
            {
              'property': 'phone',
              'value': '555-122-2323'
            },
            {
              'property': 'address',
              'value': '25 First Street'
            },
            {
              'property': 'city',
              'value': 'Cambridge'
            },
            {
              'property': 'state',
              'value': 'MA'
            },
            {
              'property': 'zip',
              'value': '02139'
            }
          ]
        }).then(data => {
        expect(data).to.be.an('object')
      })
    })
  })

  describe('create', function () {
    it('should create a new contact', function () {
      return hubspot.contacts.create({
        'properties': [
          {
            'property': 'email',
            'value': 'node-hubspot' + Date.now() + '@madkudu.com'
          },
          {
            'property': 'firstname',
            'value': 'Try'
          },
          {
            'property': 'lastname',
            'value': 'MadKudu'
          },
          {
            'property': 'website',
            'value': 'http://www.madkudu.com'
          },
          {
            'property': 'company',
            'value': 'MadKudu'
          }
        ]
      }).then(data => {
        // console.log(data)
        expect(data).to.be.an('object')
        expect(data.properties.company.value).to.equal('MadKudu')
      })
    })

    it('should fail if the contact already exists', function () {
      return hubspot.contacts.create({
        'properties': [
          {
            'property': 'email',
            'value': 'node-hubspot@hubspot.com'
          },
          {
            'property': 'firstname',
            'value': 'Test'
          }
        ]
      }).then(data => {
        throw new Error('This should have failed')
      }).catch(err => {
        // console.log(err)
        expect(err instanceof Error).to.equal(true)
        expect(err.error.message).to.equal('Contact already exists')
      })
    })
  })

  describe('delete', function () {
    it('can delete', function () {
      return hubspot.contacts.create({
        'properties': [
          {
            'property': 'email',
            'value': 'node-hubspot' + Date.now() + '@madkudu.com'
          },
          {
            'property': 'firstname',
            'value': 'Try'
          },
          {
            'property': 'lastname',
            'value': 'MadKudu'
          },
          {
            'property': 'website',
            'value': 'http://www.madkudu.com'
          },
          {
            'property': 'company',
            'value': 'MadKudu'
          }
        ]
      }).then(data => {
        return hubspot.contacts.delete(data.vid)
      })
    })
  })

  describe('createOrUpdateBatch', function () {
    // this.timeout(10000)

    let contacts

    before(function () {
      return hubspot.contacts.get().then(data => {
        contacts = data.contacts
      })
    })

    it('should update a batch of company', function () {
      const batch = _.map(contacts, contact => {
        const update = { vid: contact.vid, properties: [ { property: 'company', value: 'MadKudu ' } ] }
        return update
      })
      // console.log(batch)
      return hubspot.contacts.createOrUpdateBatch(batch).then(data => {
        // console.log(data)
        expect(data).to.equal(undefined)
      })
    })
  })

  describe('search', function () {
    it('should return contacts and some data associated with those contacts by the contact\'s email address or name.', function () {
      return hubspot.contacts.search('example').then(data => {
        expect(data.contacts).to.be.a('array')
        expect(data.query).to.equal('example')
      })
    })
  })
})
