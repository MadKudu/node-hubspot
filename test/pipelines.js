var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = '5e4e9b8c-9146-4d90-95eb-8fe94edd3175';
client.useKey(api_key);


describe('Pipelines', function () {
	describe('Get Pipelines', function(){
		it('Should eturn all deal pipelines for a given portal', function (done) {
			client.pipelines.get(function(err,data, res) {
			  if (err) { throw err; }
				expect(res.statusCode).equal(200);
        expect(data).to.be.a('array');
        expect(data[0].pipelineId).to.be.equal('default');
				done();
			})
		});
	});
});
