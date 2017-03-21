var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = '5e4e9b8c-9146-4d90-95eb-8fe94edd3175';
    client.useKey(api_key);

    describe('Companies', function () {

      describe('Get Company by Id', function() {
        it('Should return a company', function (done) {
          client.companies.getById(322620707, function(err, data, res) {
            if (err) { throw err; }
            expect(res.statusCode).to.equal(200);
            expect(data).to.be.a('object');
            done();
          });
        });
      });

      describe('Get all companies', function(){
        it('Should return all companies', function (done) {
          client.companies.getAll(function(err, data, res) {
            if (err) { throw err; }
            expect(res.statusCode).to.equal(200);
            expect(data).to.be.a('object');
            expect(data.companies).to.be.a('array');
            done();
          });
        });

        it('Should return a limited number of companies', function (done) {
          client.companies.getAll({ limit: 5 }, function(err, data, res) {
            if (err) { throw err; }
            expect(res.statusCode).to.equal(200);
            expect(data).to.be.a('object');
            expect(data.companies).to.be.a('array');
            expect(data.companies.length).to.eq(5)
            expect(data['has-more']).to.eq(true)
            done();
          });
        });

        it('Should return properties', function (done) {
          client.companies.getAll({ limit: 5, properties: ['name', 'country', 'city'] }, function(err, data, res) {
            if (err) { throw err; }
            expect(res.statusCode).to.equal(200);
            expect(data.companies).to.be.a('array');
            expect(data.companies[0].properties.name.value).to.eq('A company name')
            done();
          });
        })
      });

      describe('Get Recently Created', function(){
        it('Should return recently created companies', function (done) {
          client.companies.getRecentlyCreated(function(err, data, res) {
            if (err) { throw err; }
            expect(res.statusCode).to.equal(200);
            expect(data).to.be.a('object');
            expect(data.results).to.be.a('array');
            done();
          })
        });
      });

      describe('Get Companies by Domain', function(){
        it('Should returns a list of all companies that have a matching domain to the specified domain in the request URL', function (done) {
          client.companies.getByDomain('example.com',function(err, data, res) {
            if (err) { throw err; }
            expect(res.statusCode).to.equal(200);
            expect(data).to.be.a('array');
            expect(data[0].portalId).to.equal(2837874);
            done();
          })
        });
      });

      describe('Create a Company', function(){
    it('Should create a company in a given portal', function (done) {
      client.companies.create({"properties": [{"name": "name", "value": "A company name"}, {"name": "description", "value": "A company description"}]}
        ,function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data).to.be.a('object');
        expect(data.portalId).to.equal(2837874);
        done();
      })
    });
  });

});
