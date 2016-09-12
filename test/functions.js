var chai = require('chai');
var expect = chai.expect;
var Client = require('../index.js');
Client = new Client();


describe('Set key and token', function () {
  describe('Use Key', function () {
    it('Set Client to use key', function (done) {
      Client.useKey('demo');
      expect(Client.self.key).to.equal('demo');
      done()
    });
  });

  describe('Use Token', function () {
    it('Set Client to use key', function (done) {
      Client.useToken('demo');
      expect(Client.self.token).to.equal('demo');
      done()
    });
  });
});
