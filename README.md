# node-hubspot
[![Build Status](https://api.travis-ci.org/brainflake/node-hubspot.svg)](https://travis-ci.org/brainflake/node-hubspot)
[![Code Climate](https://codeclimate.com/github/brainflake/node-hubspot/badges/gpa.svg)](https://codeclimate.com/github/brainflake/node-hubspot)
[![Test Coverage](https://codeclimate.com/github/brainflake/node-hubspot/badges/coverage.svg)](https://codeclimate.com/github/brainflake/node-hubspot/coverage)
[![Issue Count](https://codeclimate.com/github/brainflake/node-hubspot/badges/issue_count.svg)](https://codeclimate.com/github/brainflake/node-hubspot)
[![Dependencies](https://david-dm.org/brainflake/node-hubspot.svg)](https://david-dm.org/brainflake/node-hubspot)

Javascript / node.js wrapper for the [HubSpot API](https://developers.hubspot.com/docs/overview)

## Upgrade to 1.0

Version 1.0 was released on 2017-08-23 and included breaking changes. See the [Changelog](./changelog.md) for details.
If you need help upgrading, please open an issue

## Installing

```shell
npm install hubspot
```

## Instantiate client

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

If you're an app developer, you can also instantiate a client with your app details and a refresh_token and obtain a new accessToken:
```javascript
const hubspot = new Hubspot({
  clientId: ...,
  clientSecret: ...,
  redirectUri: ...,
  refreshToken: ...
})
return hubspot.refreshAccessToken()
  .then(results => {
    console.log(results.access_token)
    console.log(hubspot.accessToken) // this assigns the new accessToken to the client, so your client is ready to use
    return hubspot.contacts.get()
  })
```

## Usage

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

## API limits

HubSpot has relatively stringent API limits (40,000 per day by default).
To prevent from consuming it all-at-once, this library checks API quotas regularly and will fail requests if the total is too close to the max.
By default

## Available Methods

### Companies

```javascript
hubspot.companies.get(opts, cb)
hubspot.companies.getById(id, cb)
hubspot.companies.getRecentlyCreated(opts, cb)
hubspot.companies.getRecentlyModified(opts, cb)
hubspot.companies.getByDomain(domain, cb)
hubspot.companies.create(data, cb)
hubspot.companies.addContactToCompany(data, cb) // data = { companyId: 123, contactVid: 123 }
hubspot.companies.update(id, data, cb)
hubspot.companies.updateBatch(data, cb) // data = [{ objectId: 123, properties: [] }]
hubspot.companies.delete(id, cb)
```

### Company properties

```javascript
hubspot.companies.properties.get(query, cb) // query is optional
hubspot.companies.properties.getByName(name, cb)
hubspot.companies.properties.create(data, cb)
hubspot.companies.properties.update(name, data, cb)
hubspot.companies.properties.upsert(name, data) // not an official API, wrapper doing two API calls. Callbacks not supported at this time
```

### Contacts

```javascript
hubspot.contacts.get(opts, cb)
hubspot.contacts.getByEmail(email, cb)
hubspot.contacts.getByEmailBatch(emails, cb)
hubspot.contacts.getById(id, cb)
hubspot.contacts.getByIdBatch(ids, cb)
hubspot.contacts.getByToken(utk, cb)
hubspot.contacts.update(id, data, cb)
hubspot.contacts.create(data, cb)
hubspot.contacts.createOrUpdateBatch(data, cb) // data = [{ vid/email: '', properties: [] }]
hubspot.contacts.search(query, cb)
hubspot.contacts.getRecentlyCreated(cb)
hubspot.contacts.getRecentlyModified(cb)
hubspot.contacts.createOrUpdate(email, data, cb)
hubspot.contacts.delete(id, cb)
```

### Contact properties

```javascript
hubspot.contacts.properties.get(cb)
hubspot.contacts.properties.getByName(name, cb)
hubspot.contacts.properties.create(data, cb)
hubspot.contacts.properties.update(name, data, cb)
hubspot.contacts.properties.upsert(name, data) // not an official API, wrapper doing two API calls. Callbacks not supported at this time
hubspot.contacts.properties.getGroups(cb) // => [ {name: '...', displayName: '...'}, ...]
hubspot.contacts.properties.createGroup({name, displayName}, cb)
hubspot.contacts.properties.updateGroup(name, {displayName}, cb)
hubspot.contacts.properties.deleteGroup(name, cb)
hubspot.contacts.properties.delete(name, cb)
```

### Pages

```javascript
// more opts can be found at https://developers.hubspot.com/docs/methods/pages/get_pages
hubspot.pages.get(opts, cb); // eg: opts = {is_draft: false}
```

### Deals

```javascript
hubspot.deals.get(opts, cb)
hubspot.deals.getRecentlyModified(opts, cb)
hubspot.deals.getRecentlyCreated(opts, cb)
hubspot.deals.getById(id, cb)
hubspot.deals.getAssociated(objectType, objectId, opts, cb)
hubspot.deals.deleteById(id, cb)
hubspot.deals.updateById(id, data, cb)
hubspot.deals.create(data, cb)
hubspot.deals.associate(id, objectType, associatedObjectId, cb)
hubspot.deals.removeAssociation(id, objectType, associatedObjectId, cb)
```

### Engagements

```javascript
hubspot.engagements.create(data, cb)
hubspot.engagements.get(opts, cb)
hubspot.engagements.getRecentlyModified(opts, cb)
hubspot.engagements.getAssociated(objectType, objectId, opts, cb)
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

### OAuth

#### Obtain your authorization url

```javascript
const params = {
  client_id: 'your_client_id',
  scopes: 'some scopes',
  redirect_uri: 'take_me_to_the_ballpark'
}
const uri = hubspot.oauth.getAuthorizationUrl(params)
```

#### Obtain your authorization url

```javascript
const params = {
  client_id: 'your_client_id',
  scopes: 'some scopes',
  redirect_uri: 'take_me_to_the_ballpark'
}
const uri = hubspot.oauth.getAuthorizationUrl(params)
```

#### Obtain an access token from an authorization_code

```javascript
const hubspot = new Hubspot({
  clientId: '',
  clientSecret: '',
  redirectUri: ''
})
return hubspot.oauth.getAccessToken({
  code: 'abc' // the code you received from the oauth flow
}).then(...)
```

You can also pass the constructor directly as parameters (although with a slighlty awkward case change)

```javascript
const params = {
  code: 'abc' // the code you received from the oauth flow
  client_id: '',
  client_secret: '',
  redirect_uri: ''
}
const hubspot = new Hubspot(params)
return hubspot.oauth.getAccessToken(params).then(...)
```

## License

MIT

## Contributing

### Tests

Tests are written using the HubSpot API sandbox. As such, resources get added and deleted all the time.
Don't harcode record values when fetching / updating / deleting (because those tend to disappear). Instead, fetch first an array of available records, then use of the returned ID in your test.

### Contributors

- Brian Falk @brainflake
- Tim Atkinson @timisbusy
- Tejas Manohar @tejasmanohar
- Krispin Schulz @kr1sp1n
- Filipe Ferreira @iTsFILIPOficial
- Sam Levan @samlevan
- Paul Cothenet @pcothenet
- Nick Mason @masonator
- Mikael Puittinen @mpuittinen
- @davidmfoley
- @jayprakash1
- @alexatdivvy
- @forstermatth
- @amit777
