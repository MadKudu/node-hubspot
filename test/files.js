var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = 'demo';
client.useKey(api_key);


describe('Files', function () {
  describe('Get all files', function(){
    it('Should return all files', function (done) {
  		client.files.get(function(err,data, res) {
  		  if (err) { throw err; }
  			expect(res.statusCode).to.equal(200);
  			expect(data).to.be.defined;
      	expect(data.total_count).to.be.defined;
  			done();
  		})
  	});
  });


  // describe('Get a file', function(){
  //   it('Should return one file', function (done) {
  // 		client.files.getOne(2857188320,function(err,data, res) {
  // 		  if (err) { throw err; }
  // 			expect(res.statusCode).to.equal(200);
  // 			expect(data).to.be.defined;
  //     	expect(data.name).to.be.defined;
  // 			done();
  // 		})
  // 	});
  // });
});
