// mocha tests
var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = 'demo';
client.useKey(api_key);


describe('Pipelines', function () {

	it('should return some pipelines', function (done) {
		client.pipelines.get(function(err,data, res) {
		  if (err) { throw err; }
			expect(res.statusCode).equal(200);
			expect(data[0].pipelineId).to.be.defined;
			done();
		})
	});

});
