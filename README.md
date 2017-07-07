# node-hubspot
[![Build Status](https://api.travis-ci.org/brainflake/node-hubspot.svg)](https://travis-ci.org/brainflake/node-hubspot)
[![Code Climate](https://codeclimate.com/github/brainflake/node-hubspot/badges/gpa.svg)](https://codeclimate.com/github/brainflake/node-hubspot)
[![Test Coverage](https://codeclimate.com/github/brainflake/node-hubspot/badges/coverage.svg)](https://codeclimate.com/github/brainflake/node-hubspot/coverage)
[![Issue Count](https://codeclimate.com/github/brainflake/node-hubspot/badges/issue_count.svg)](https://codeclimate.com/github/brainflake/node-hubspot)
[![Dependencies](https://david-dm.org/brainflake/node-hubspot.svg)](https://david-dm.org/brainflake/node-hubspot)

Node.js wrapper for the HubSpot API

## Installing

```shell
npm install @madkudu/hubspot
```

## Usage

```javascript
const Hubspot = require('hubspot');
const hubspot = new Hubspot({ apiKey: 'abc' });
```

You can also authenticate via token:

```javascript
const hubspot = new Hubspot({ accessToken: 'abc' });
```

To change the base url

```javascript
const hubspot = new Hubspot({ accessToken: 'abc', baseUrl: 'https://some-url' });
```

And then use the API method via:

```javascript
hubspot.contacts.get(options)
  .then(results => {
    console.log(results)
  }).catch(err => {
    console.error(err)
  })
```

or if you prefer callbacks:

```javascript
hubspot.contacts.get(function(err, results) {
  if (err) { console.error(err) }
  console.log(results);
});
```

## Available Methods

### Companies

```javascript
hubspot.companies.get(opts, cb)
hubspot.companies.getById(id, cb)
hubspot.companies.getRecentlyCreated(opts, cb)
hubspot.companies.getRecentlyModified(opts, cb)
hubspot.companies.getByDomain(domain, cb)
hubspot.companies.create(data, cb)
hubspot.companies.addContactToCompany(data, cb); // data = { companyId: 123, contactVid: 123 }
```

### Contacts

```javascript
hubspot.contacts.get(opts, cb)
hubspot.contacts.getByEmail(email, cb)
hubspot.contacts.getByEmailBatch(emails, cb)
hubspot.contacts.getById(id, cb)
hubspot.contacts.getByIdBatch(ids, cb)
hubspot.contacts.update(id, data, cb)
hubspot.contacts.create(data, cb)
hubspot.contacts.createOrUpdateBatch(data, cb)
hubspot.contacts.search(query, cb)
hubspot.contacts.getRecent(cb)
hubspot.contacts.createOrUpdate(email, data, cb)
hubspot.contacts.properties.get(cb)
```

### Deals

```javascript
hubspot.deals.get(opts, cb)
hubspot.deals.getRecentlyModified(opts, cb)
hubspot.deals.getRecentlyCreated(opts, cb)
hubspot.deals.getById(id, cb)
hubspot.deals.deleteById(id, cb)
hubspot.deals.updateById(id, data, cb)
hubspot.deals.create(data, cb)
hubspot.deals.associate(id, objectType, associatedObjectId, cb)
hubspot.deals.removeAssociation(id, objectType, associatedObjectId, cb)
```

### Engagements

```javascript
hubspot.engagements.create(data, cb)
```

### Owners

```javascript
hubspot.owners.get(opts, cb)
```

### Pipelines

```javascript
hubspot.pipelines.get(opts, cb)
```

### Lists

```javascript
hubspot.lists.get(opts, cb)
hubspot.lists.getOne(id, cb)
hubspot.lists.getContacts(id, opts, cb)
hubspot.lists.getRecentContacts(id, opts, cb)
hubspot.lists.addContacts(id, contactBody, cb)
```

### Files

```javascript
hubspot.files.get(cb)
hubspot.files.getOne(id, cb)
```

### Email

```javascript
hubspot.subscriptions.get(opts, cb)
```
```

### Email Events

```javascript
hubspot.campaigns.get(opts, cb)
hubspot.campaigns.getOne(id, appId, cb)
hubspot.campaigns.events(opts, cb)
```

### Social Media

```javascript
hubspot.broadcasts.get(opts, cb)
```

## License

MIT

## Contributors

Brian Falk @brainflake
Tim Atkinson @timisbusy
Tejas Manohar @tejasmanohar
Krispin Schulz @kr1sp1n
Filipe Ferreira @iTsFILIPOficial
Paul Cothenet @pcothenet
