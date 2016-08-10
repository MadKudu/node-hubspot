var chai = require('chai');
var expect = chai.expect;

var Client = require('../index.js');
var client = new Client();
var api_key = 'demo';
client.useKey(api_key);


describe('Lists', function () {

    describe('Get List', function(){
        it('Should return contact list', function (done) {
            client.lists.get(function(err, data, res) {
                if (err) { throw err; }
                expect(res.statusCode).to.equal(200);
                expect(data).to.be.defined;
                expect(data.lists).to.be.defined;
                done();
            })
        });
    });

    describe('Get List by Id', function(){
        it('Should return one contact in a list', function (done) {
            client.lists.getOne(1,function(err,data, res) {
                if (err) { throw err; }
                expect(res.statusCode).to.equal(200);
                expect(data).to.be.defined;
                expect(data.name).to.be.defined;
                done();
            })
        });
    });

    describe('Get Contacts In A List', function(){
        it('Should return all contacts in a list', function (done) {
            client.lists.getContacts(1,function(err, data, res) {
                if (err) { throw err; }
                expect(res.statusCode).to.equal(200);
                expect(data).to.be.defined;
                done();
            })
        });
    });

    describe('Get recently updated and created contacts', function(){
        it('Should a list of recently_updated contacts', function (done) {
            client.lists.getRecentContacts(1,function(err, data, res) {
                if (err) { throw err; }
                expect(res.statusCode).to.equal(200);
                expect(data).to.be.defined;
                expect(data.contacts).to.be.defined;
                done();
            })
        });
    });

    describe('Add existing contacts to a list', function(){
        it('Should add contact to a list of contacts', function (done) {
            client.lists.addContacts(3,{
              "vids": [61571], "emails": ["testingapis@hubspot.com"]
        },function(err, data, res) {
                if (err) { throw err; }
                expect(res.statusCode).to.equal(200);
                expect(data).to.be.defined;
                expect(data.updated).to.be.defined;
                done();
            })
        });
    });

});
