// mocha tests
var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = 'demo';
client.useKey(api_key);


describe('Po', function () {

	it('should return some pipelines', function (done) {
		client.pipelines.get(function(err, res) {
		  if (err) { throw err; }
			expect(res).to.be.defined;
			expect(res[0].pipelineId).to.be.defined;
			done();
		})
	});

});
