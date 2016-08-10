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
				expect(data).to.be.defined;
				expect(data.results).to.be.defined;
				done();
			})
		});
	})

});
