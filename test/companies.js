var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = 'demo';
client.useKey(api_key);

describe('Companies', function () {

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
        expect(data[0].portalId).to.equal(62515);
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
        expect(data.portalId).to.equal(62515);
        done();
      })
    });
  });

});
