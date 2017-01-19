var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = '5e4e9b8c-9146-4d90-95eb-8fe94edd3175';
client.useKey(api_key);


describe('Email Events', function () {

	describe('Get campaign IDs with recent activity for a portal', function(){
		it('Should return campaign IDs with recent activity associated with the portal', function (done) {
			client.campaigns.get(function(err, data, res) {
			  if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data.campaigns).to.be.a('array');
        expect(data.hasMore).to.equal(false);
				done();
			})
		});
	});

  describe('Get campaign IDs with recent activity for a portal', function(){
		it('Should return campaign IDs with recent activity associated with the portal.', function (done) {
			client.campaigns.getOne('by-id',function(err, data, res) {
			  if (err) { throw err; }
				expect(res.statusCode).to.equal(200);
        expect(data.campaigns).to.be.a('array');
        expect(data.hasMore).to.equal(false);
				done();
			})
		});
	});

  describe('Get all campaign IDs for a portal', function(){
		it('Should return campaign IDs with recent activity associated with the portal', function (done) {
			client.campaigns.events(function(err, data, res) {
			  if (err) { throw err; }
				expect(res.statusCode).to.equal(200);
        expect(data.events).to.be.a('array');
        expect(data.hasMore).to.equal(false);
				done();
			})
		});
	});

	describe('Get all campaign IDs for a portal by Id', function(){
		it('Should return campaign IDs with recent activity associated with the portal', function (done) {
			client.campaigns.getById(function(err, data, res) {
				if (err) { throw err; }
				expect(res.statusCode).to.equal(200);
        expect(data.campaigns).to.be.a('array');
        expect(data.hasMore).to.equal(false);
				done();
			})
		});
	});
});
