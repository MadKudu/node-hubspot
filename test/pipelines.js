var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = 'demo';
client.useKey(api_key);


describe('Pipelines', function () {
	describe('Get Pipelines', function(){
		it('Should eturn all deal pipelines for a given portal', function (done) {
			client.pipelines.get(function(err,data, res) {
			  if (err) { throw err; }
				expect(res.statusCode).equal(200);
        expect(data).to.be.a('array');
        expect(data[0].pipelineId).to.be.equal('default');
        expect(data[1].pipelineId).to.be.equal('6da7f576-4dc7-4cba-a049-bc5cd0f4e105');
				done();
			})
		});
	});
});
