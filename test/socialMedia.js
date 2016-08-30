var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = 'demo';
client.useKey(api_key);


describe('Social Media', function () {
  describe('Get broadcast', function(){
    it('Should return details on a set of broadcast messages', function (done) {
  		client.broadcasts.get(function(err,data, res) {
  		  if (err) { throw err; }
  			expect(res.statusCode).to.equal(200);
  			expect(data).to.be.defined;
  			done();
  		})
  	});
  });
});
