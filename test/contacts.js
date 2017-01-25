var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = '5e4e9b8c-9146-4d90-95eb-8fe94edd3175';
client.useKey(api_key);


describe('Contacts', function () {


  describe('Get All Contacts', function(){
    it('Should return contacts properties', function (done) {
      client.contacts.get(function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data).to.be.a('object');
        expect(data.contacts).to.be.a('array');
        done();
      })
    });
  });

  describe('Get A Contact By Id', function(){
    it('Should return a contact based on its id', function (done) {
      client.contacts.getById(101,function(err, data, res) {
        if (err) { throw err; }
        expect(data).to.be.a('object');
        // console.log(data);
        expect(data.properties.company.value).to.equal('HubSpot');
        done();
      })
    });
  });

    describe('Get A Contact By Id Batch', function(){
        it('Should return a contact record based on a array of ids', function (done) {
            client.contacts.getByIdBatch({
                ids: [1, 2]
            },function(err, data, res) {
                if (err) { throw err; }
                expect(res.statusCode).to.equal(200);
                expect(res).to.be.defined;
                done();
            })
        });
    });

    describe('Get A Contact By Email', function(){
        it('Should return a contact record based on the email', function (done) {
            client.contacts.getByEmail('testingapis@hubspot.com',function(err, data, res) {
                if (err) { throw err; }
                expect(res.statusCode).to.equal(200);
                expect(data).to.be.a('object');
                expect(data.properties).to.be.a('object');
                done();
            })
        });
    });

  describe('Get A Contact By Email Batch', function(){
    it('Should return a contact record based on a array of emails', function (done) {
      client.contacts.getByEmailBatch({
        emails: ['testingapis@hubspot.com', 'testingapisawesomeandstuff@hubspot.com']
      },function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(res).to.be.a('object');
        done();
      })
    });
  });

  describe('Update A Contact', function(){
    it('Should update an existing contact', function (done) {
      client.contacts.update(61571, {
        "properties": [
          {
            "property": "email",
            "value": "new-email@hubspot.com"
          },
          {
            "property": "firstname",
            "value": "Updated",
            "timestamp": 1419284759000
          },
          {
            "property": "lastname",
            "value": "Lead",
            "timestamp": 1419284759000
          },
          {
            "property": "website",
            "value": "http://hubspot-updated-lead.com"
          },
          {
            "property": "lifecyclestage",
            "value": "customer"
          }
        ]
      },function(err, data, res) {
        if (err) { throw err; }
        expect(data).to.be.a('object');
        done();
      })
    });
  });
  describe('Create or update', function(){
    it('Should Create or Update a contact', function(done){
      client.contacts.createOrUpdate('test@hubspot.com',
        {
          "properties": [
            {
              "property": "email",
              "value": "test@hubspot.com"
            },
            {
              "property": "firstname",
              "value": "Matt"
            },
            {
              "property": "lastname",
              "value": "Schnitt"
            },
            {
              "property": "website",
              "value": "http://hubspot.com"
            },
            {
              "property": "company",
              "value": "HubSpot"
            },
            {
              "property": "phone",
              "value": "555-122-2323"
            },
            {
              "property": "address",
              "value": "25 First Street"
            },
            {
              "property": "city",
              "value": "Cambridge"
            },
            {
              "property": "state",
              "value": "MA"
            },
            {
              "property": "zip",
              "value": "02139"
            }
          ]
        }
        ,function(err, data, res){
          if (err) { throw err; }
          expect(res.statusCode).to.equal(200);
          expect(data).to.be.a('object');
          done();
        })
    })
  });

  describe('Create  A Contact', function(){
    it('Should create a new contact', function (done) {
      client.contacts.create({
        "properties": [
          {
            "property": "email",
            "value": "testingapis@hubspot.com"
          },
          {
            "property": "firstname",
            "value": "Adrian"
          },
          {
            "property": "lastname",
            "value": "Mott"
          },
          {
            "property": "website",
            "value": "http://hubspot.com"
          },
          {
            "property": "company",
            "value": "HubSpot"
          },
          {
            "property": "phone",
            "value": "555-122-2323"
          },
          {
            "property": "address",
            "value": "25 First Street"
          },
          {
            "property": "city",
            "value": "Cambridge"
          },
          {
            "property": "state",
            "value": "MA"
          },
          {
            "property": "zip",
            "value": "02139"
          }
        ]
      },function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(409);
        expect(data.status).to.equal('error');
        expect(data.message).to.equal('Contact already exists');
        done();
      })
    });
  });

  describe('Create or Update Batch', function(){
    it('should return some recent companies', function (done) {
      client.contacts.createOrUpdateBatch(
        [{"email":"testingapis@hubspot.com","properties":[{"property":"firstname","value":"Codey"},{"property":"lastname","value":"Huang"},{"property":"website","value":"http://hubspot.com"},{"property":"company","value":"HubSpot"},{"property":"phone","value":"555-122-2323"},{"property":"address","value":"25 First Street"},{"property":"city","value":"Cambridge"},{"property":"state","value":"MA"},{"property":"zip","value":"02139"}]},{"vid":"259429","properties":[{"property":"firstname","value":"Harper"},{"property":"lastname","value":"Wolfberg"},{"property":"website","value":"http://hubspot.com"},{"property":"company","value":"HubSpot"},{"property":"phone","value":"555-122-2323"},{"property":"address","value":"25 First Street"},{"property":"city","value":"Cambridge"},{"property":"state","value":"MA"},{"property":"zip","value":"02139"}]}],
        function(err, data, res) {
          if (err) { throw err; }
          expect(res.statusCode).to.equal(202);
          expect(data).to.equal(undefined);
          done();
        })
    });
  });

  describe('Search', function(){
    it('should return contacts and some data associated with those contacts by the contact\'s email address or name.', function (done) {
      client.contacts.search('example', function(err, data, res){
        expect(res.statusCode).to.equal(200);
        expect(data.contacts).to.be.a('array');
        expect(data.query).to.equal('example');
        done();
      })
    });
  });
  describe('Get Recent', function(){
    it('should return last 100 updated contacts', function (done) {
      client.contacts.getRecent(function(err, data, res){
        expect(res.statusCode).to.equal(200);
        expect(data.contacts).to.be.a('array');
        done();
      })
    });
  });
});
