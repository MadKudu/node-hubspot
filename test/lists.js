var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = '5e4e9b8c-9146-4d90-95eb-8fe94edd3175';
client.useKey(api_key);


describe('Lists', function () {

  describe('Get List', function(){
    it('Should return contact list', function (done) {
      client.lists.get(function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data).to.be.a('object');
        expect(data.lists).to.be.a('array');
        done();
      })
    });
  });

  describe('Get List by Id', function(){
    it('Should return one contact in a list', function (done) {
      client.lists.getOne(1,function(err,data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data).to.be.a('object');
        expect(data.name).to.equal('Monthly Subscribers - Default HubSpot Blog');
        done();
      })
    });
  });

  describe('Get Contacts In A List', function(){
    it('Should return all contacts in a list', function (done) {
      client.lists.getContacts(1,function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data).to.be.a('object');
        expect(data.contacts).to.be.a('array');
        done();
      })
    });
  });

  describe('Get recently updated and created contacts', function(){
    it('Should a list of recently_updated contacts', function (done) {
      client.lists.getRecentContacts(1,function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data).to.be.a('object');
        expect(data.contacts).to.be.a('array');
        done();
      })
    });
  });

  describe('Add existing contacts to a list', function(){
    it('Should add contact to a list of contacts', function (done) {
      client.lists.addContacts(5,{
        "vids": [61571], "emails": ["testingapis@hubspot.com"]
      },function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data).to.be.a('object');
        expect(data.updated).to.be.a('array');
        done();
      })
    });
  });

});
