var chai = require('chai');
var expect = chai.expect;
var Client = require('../index.js');

describe('Set key and token', function () {
  describe('Use Key', function () {
    it('Set Client to use key', function (done) {
      var client = new Client();
      client.useKey('demo');
      expect(client.self.key).to.equal('demo');
      done()
    });
  });

  describe('Use Token', function () {
    it('Set Client to use Token', function (done) {
      var client = new Client();
      client.useToken('demo');
      expect(client.self.token).to.equal('demo');
      done();
    });
  });
});
describe('Use key and token', function () {
  describe('Use Token to get contacts', function () {
    it('Use token to get contact list', function (done) {
      var client = new Client();
      client.useToken('demo');
      client.contacts.get(function (err, data, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(401);
        expect(data.status).to.equal('error');
        expect(data.message).to.equal('access_token (demo) doesn\'t exist!');
        done();
      });
    });
  });

  describe('Use Token to get contacts', function () {
    it('Use Key to get contact list', function (done) {
      var client = new Client();
      client.useKey('demo');
      client.contacts.get(function (err, data, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        expect(data).to.be.a('object');
        expect(data.contacts).to.be.a('array');
        done();
      });
    });
  });
});
describe('All Client Enpoints Defined', function () {
  describe('Endpoints Defined', function () {
    it('Check to see if client has all endpoins defined', function (done) {
      var client = new Client();
      expect(client.campaigns).to.be.a('object');
      expect(client.subscriptions).to.be.a('object');
      expect(client.contacts).to.be.a('object');
      expect(client.companies).to.be.a('object');
      expect(client.deals).to.be.a('object');
      expect(client.pipelines).to.be.a('object');
      expect(client.broadcasts).to.be.a('object');
      expect(client.lists).to.be.a('object');
      expect(client.files).to.be.a('object');
      expect(client.engagements).to.be.a('object');
      expect(client.self).to.be.a('object');
      done()
    });
  });
});
