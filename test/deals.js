var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = '5e4e9b8c-9146-4d90-95eb-8fe94edd3175';
client.useKey(api_key);


describe('Deals', function () {
  describe('Recently Created', function () {

    it('Returns Recently Created Deals', function (done) {
      client.deals.getRecentlyCreated(function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data.results).to.be.a('array');
        expect(data.hasMore).to.equal(false);
        done();
      })
    });

  });

  describe('Recently Modified', function () {

    it('Returns Recently Modified Deals', function (done) {
      client.deals.getRecentlyModified(function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(200);
        expect(data.results).to.be.a('array');
        expect(data.hasMore).to.equal(false);
        done();
      })
    });
  });

  describe('Get By Id', function () {
    it('Returns the entire deal, including all of it\'s properties', function (done) {
      client.deals.getById(3865198,function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(404);
        expect(data.status).to.equal('error');
        expect(data.message).to.equal('Deal does not exist');
        done();
      })
    });
  });
  describe('Delete By Id', function () {
    it('Returns object', function (done) {
      client.deals.deleteById(10444744,function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(204);
        done();
      })
    });
  });

  describe('Update By Id', function () {
    it('Returns the entire deal profile', function (done) {
      client.deals.updateById(10444744, {
        "properties": [{"name": "amount", "value": "70000"}]
      }, function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(404);
        expect(data.status).to.equal('error');
        expect(data.message).to.equal('No deal found for dealId=10444744 portalId=2837874');
        done();
      })
    });
  });

  describe('Create', function () {
    it('Returns a 200 with the newly created Deal', function (done) {
      client.deals.create({
        "associations": {
          "associatedCompanyIds": [
            8954037
          ],
          "associatedVids": [
            27136
          ]
        },
        "portalId": 62515,
        "properties": [
          {
            "value": "Tim's Newer Deal",
            "name": "dealname"
          },
          {
            "value": "appointmentscheduled",
            "name": "dealstage"
          },
          {
            "value": "default",
            "name": "pipeline"
          },
          {
            "value": "24",
            "name": "hubspot_owner_id"
          },
          {
            "value": 1409443200000,
            "name": "closedate"
          },
          {
            "value": "60000",
            "name": "amount"
          },
          {
            "value": "newbusiness",
            "name": "dealtype"
          }
        ]
      }, function(err, data) {
        if (err) { throw err; }
        expect(data).to.be.a('object');
        done();
      })
    });
  });

  describe('Associate', function () {
    it('Returns a 204 response if successful.', function (done) {
      client.deals.associate(1126609, 'CONTACT', 394455, function(err, data) {
        if (err) { throw err; }
        expect(data).to.be.a('object');
        done();
      })
    });
  });

  describe('Remove Association', function () {
    it('Returns a 200 response if successful.', function (done) {
      client.deals.removeAssociation(1126609, 'CONTACT', 394455, function(err, data, res) {
        if (err) { throw err; }
        expect(res.statusCode).to.equal(204);
        done();
      })
    });
  });

});
