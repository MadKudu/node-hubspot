var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = '5e4e9b8c-9146-4d90-95eb-8fe94edd3175';
client.useKey(api_key);


describe('Social Media', function () {
  describe('Get broadcast', function(){
    it('Should return details on a set of broadcast messages', function (done) {
  		client.broadcasts.get(function(err,data, res) {
  		  if (err) { throw err; }
  			expect(res.statusCode).to.equal(200);
        expect(data).to.be.a('array');
  			done();
  		})
  	});
  });
});
