var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = '5e4e9b8c-9146-4d90-95eb-8fe94edd3175';
client.useKey(api_key);


describe('Engagements', function () {

  describe('Get All Engagements', function(){
    it('Should return engagement properties', function (done) {
      client.engagements.get(function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data).to.be.a('object');
        expect(data.engagements).to.be.a('array');
        done();
      })
    });
  });

  describe('Create an Engagement', function () {
    it('Should create an engagement', function (done) {
      client.engagements.create({"engagement": {"active": true, "ownerId": 1, "type": "NOTE", "timestamp": 1409172644778}, "associations": {"contactIds": [2], "companyIds": [ ], "dealIds": [ ], "ownerIds": [ ]}, "metadata": {"body": "note body"}},
        function (err, data, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(400);
          expect(data.status).to.equal('error');
          expect(data.message).to.equal('one or more associations were invalid');
          done();
        }
      )
    })
  });
});
