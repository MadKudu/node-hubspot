var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = 'demo';
client.useKey(api_key);


describe('Email', function () {

	describe('View subscriptions timeline for a portal', function(){
		it('Should return a time-ordered list of subscription changes', function (done) {
			client.subscriptions.get(function(err, data, res) {
			  if (err) { throw err; }
				expect(res.statusCode).to.equal(200);
				expect(data).to.be.defined;
				expect(data.hasMore).to.be.defined;
				done();
			})
		});
	})

});
