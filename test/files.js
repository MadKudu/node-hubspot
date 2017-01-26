var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = '5e4e9b8c-9146-4d90-95eb-8fe94edd3175';
client.useKey(api_key);


describe('Files', function () {
  describe('Get all files', function(){
    it('Should return all files', function (done) {
  		client.files.get(function(err,data, res) {
  		  if (err) { throw err; }
  			expect(res.statusCode).to.equal(200);
  			expect(data).to.be.a('object');
      	expect(data.total_count).to.be.equal(0);
  			done();
  		})
  	});
  });


  describe('Get a file', function(){
    it('Should return one file', function (done) {
  		client.files.getOne(358134645,function(err,data, res) {
  		  if (err) { throw err; }
  			expect(res.statusCode).to.equal(204);
  			done();
  		})
  	});
  });
});
