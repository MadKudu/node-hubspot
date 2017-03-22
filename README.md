# node-hubspot
[![Build Status](https://api.travis-ci.org/brainflake/node-hubspot.svg)](https://travis-ci.org/brainflake/node-hubspot)
[![Dependencies](https://david-dm.org/brainflake/node-hubspot.svg)](https://david-dm.org/brainflake/node-hubspot)
[![Code Climate](https://codeclimate.com/github/brainflake/node-hubspot/badges/gpa.svg)](https://codeclimate.com/github/brainflake/node-hubspot)
[![Test Coverage](https://codeclimate.com/github/brainflake/node-hubspot/badges/coverage.svg)](https://codeclimate.com/github/brainflake/node-hubspot/coverage)
[![Issue Count](https://codeclimate.com/github/brainflake/node-hubspot/badges/issue_count.svg)](https://codeclimate.com/github/brainflake/node-hubspot)

Node.js wrapper for the HubSpot API

## Installing

npm install hubspot

## Usage

    var Client = require('hubspot');

    var client = new Client();

    /*
     * You can use either a key OR a token
     */
    if (config.key) {
      client.useKey(config.key);
    } else if (config.token) {
      client.useToken(config.token);
    }

    client.campaigns.get(function(err, res) {
      if (err) { throw err; }
      console.log(res);
    });

## Available Methods

### Companies

    client.companies.getById(id, cb)
    client.companies.getRecentlyCreated(opts, cb)
    client.companies.getByDomain(domain, cb)
    client.companies.create(data, cb)

### Contacts

    client.contacts.get(opts, cb)
    client.contacts.getByEmail(email, cb)
    client.contacts.getByEmailBatch(emails, cb)
    client.contacts.getById(id, cb)
    client.contacts.getByIdBatch(ids, cb)
    client.contacts.update(id, data, cb)
    client.contacts.create(data, cb)
    client.contacts.createOrUpdateBatch(data, cb)
    client.contacts.search(query, cb)
    client.contacts.getRecent(cb)
    client.contacts.createOrUpdate(email, data, cb)

### Deals

    client.deals.getRecentlyModified(opts, cb)
    client.deals.getRecentlyCreated(opts, cb)
    client.deals.getById(id, cb)
    client.deals.deleteById(id, cb)
    client.deals.updateById(id, data, cb)
    client.deals.create(data, cb)

    client.deals.associate(id, objectType, associatedObjectId, cb)
    client.deals.removeAssociation(id, objectType, associatedObjectId, cb)

### Engagements

    client.engagements.create(data, cb)

### Pipelines

    client.pipelines.get(opts, cb)

### Lists

    client.lists.get(opts, cb)
    client.lists.getOne(id, cb)
    client.lists.getContacts(id, opts, cb)
    client.lists.getRecentContacts(id, opts, cb)
    client.lists.addContacts(id, contactBody, cb)

### Files

    client.files.get(cb)
    client.files.getOne(id, cb)

### Email

    client.subscriptions.get(opts, cb)

### Email Events

    client.campaigns.get(opts, cb)
    client.campaigns.getOne(id, appId, cb)
    client.campaigns.events(opts, cb)

### Social Media

    client.broadcasts.get(opts, cb)

## License

MIT

## Contributors

Brian Falk @brainflake

Tim Atkinson @timisbusy

Tejas Manohar @tejasmanohar

Krispin Schulz @kr1sp1n

Filipe Ferreira @iTsFILIPOficial
