// mocha tests
var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = 'demo';
client.useKey(api_key);


describe('Companies', function () {

	describe('Get Recently Created', function(){
		it('should return some recent companies', function (done) {
			client.companies.getRecentlyCreated(function(err, res) {
			  if (err) { throw err; }
				expect(200);
				expect(res).to.be.defined;
				expect(res.results).to.be.defined;
				done();
			})
		});
	})

});
