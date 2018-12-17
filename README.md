# node-hubspot

[![Build Status](https://api.travis-ci.org/MadKudu/node-hubspot.svg)](https://travis-ci.org/MadKudu/node-hubspot)
[![Code Climate](https://codeclimate.com/github/MadKudu/node-hubspot/badges/gpa.svg)](https://codeclimate.com/github/MadKudu/node-hubspot)
[![Test Coverage](https://codeclimate.com/github/MadKudu/node-hubspot/badges/coverage.svg)](https://codeclimate.com/github/MadKudu/node-hubspot/coverage)
[![Issue Count](https://codeclimate.com/github/MadKudu/node-hubspot/badges/issue_count.svg)](https://codeclimate.com/github/MadKudu/node-hubspot)
[![Dependencies](https://david-dm.org/MadKudu/node-hubspot.svg)](https://david-dm.org/MadKudu/node-hubspot)

Javascript / node.js wrapper for the [HubSpot API](https://developers.hubspot.com/docs/overview)

## Upgrade to 1.0

Version 1.0 was released on 2017-08-23 and included breaking changes. See the
[Changelog](./changelog.md) for details.

If you need help upgrading, please open an issue

## Installing

```shell
npm install hubspot
```

## Instantiate client

```javascript
const Hubspot = require('hubspot')
const hubspot = new Hubspot({ apiKey: 'abc' })
```

You can also authenticate via token:

```javascript
const hubspot = new Hubspot({ accessToken: 'abc' })
```

To change the base url

```javascript
const hubspot = new Hubspot({ accessToken: 'abc', baseUrl: 'https://some-url' })
```

If you're an app developer, you can also instantiate a client with your app
details and a refresh_token and obtain a new accessToken:

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

    // this assigns the new accessToken to the client, so your client is ready
    // to use
    console.log(hubspot.accessToken)
    return hubspot.contacts.get()
  })
```

## Usage

And then use the API method via:

```javascript
hubspot.contacts
  .get(options)
  .then(results => {
    console.log(results)
  })
  .catch(err => {
    console.error(err)
  })
```

or if you prefer callbacks:

```javascript
hubspot.contacts.get(function(err, results) {
  if (err) {
    console.error(err)
  }
  console.log(results)
})
```

## {EXAMPLE} Create Contact

```javascript
const contactObject = {
            "properties":
            [
                { "property": "firstname","value": yourvalue },
                { "property": "lastname", "value": yourvalue }
            ]
        };

          const hubspot = new Hubspot({ apiKey: YOUR API KEY });
          const hubspotContact = await hubspot.contacts.create(contactObj);
```

## {EXAMPLE} If you need to insert multiple values

Each value must have a semi colon after each value

```json
{ "property": "foo", "value": "value1;value2;value3;value4" }
```

## API limits

HubSpot has relatively stringent API limits (40,000 per day by default). To
prevent from consuming it all-at-once, this library checks API quotas regularly
and will fail requests if the total is too close to the max. By default

## Available Methods

### Companies

```javascript
hubspot.companies.get(opts, cb)
hubspot.companies.getById(id, cb)
hubspot.companies.getRecentlyCreated(opts, cb)
hubspot.companies.getRecentlyModified(opts, cb)
hubspot.companies.getByDomain(domain, cb)
hubspot.companies.create(data, cb)
hubspot.companies.addContactToCompany(data, cb)
// data = { companyId: 123, contactVid: 123 }
hubspot.companies.getContactIds(id, options, cb)
hubspot.companies.getContacts(id, options, cb)
hubspot.companies.update(id, data, cb)
hubspot.companies.updateBatch(data, cb)
// data = [{ objectId: 123, properties: [] }]
hubspot.companies.delete(id, cb)
```

### Company properties

```javascript
hubspot.companies.properties.get(query, cb) // query is optional
hubspot.companies.properties.getByName(name, cb)
hubspot.companies.properties.create(data, cb)
hubspot.companies.properties.update(name, data, cb)
hubspot.companies.properties.upsert(data)
// not an official API, wrapper doing two API calls. Callbacks not supported
// at this time.
```

### Company properties groups

```javascript
hubspot.companies.properties.groups.get(query, cb) // query is optional
hubspot.companies.properties.groups.create(data, cb)
hubspot.companies.properties.groups.update(name, data, cb)
hubspot.companies.properties.groups.upsert(data)
// not an official API, wrapper doing two API calls. Callbacks not supported at
// this time
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
hubspot.contacts.createOrUpdateBatch(data, cb)
// data = [{ vid/email: '', properties: [] }]
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
hubspot.contacts.properties.upsert(data)
// not an official API, wrapper doing two API calls.
// Callbacks not supported at this time
hubspot.contacts.properties.getGroups(cb)
// => [ {name: '...', displayName: '...'}, ...]
hubspot.contacts.properties.createGroup({ name, displayName }, cb)
hubspot.contacts.properties.updateGroup(name, { displayName }, cb)
hubspot.contacts.properties.deleteGroup(name, cb)
hubspot.contacts.properties.delete(name, cb)
```

### Pages

```javascript
// more opts can be found at https://developers.hubspot.com/docs/methods/pages/get_pages
hubspot.pages.get(opts, cb) // eg: opts = {is_draft: false}
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

### Deals properties

```javascript
hubspot.deals.properties.get(query, cb) // query is optional
hubspot.deals.properties.getByName(name, cb)
hubspot.deals.properties.create(data, cb)
hubspot.deals.properties.update(name, data, cb)
hubspot.deals.properties.upsert(data)
// not an official API, wrapper doing two API calls. Callbacks not supported at
// this time
```

### Deals properties groups

```javascript
hubspot.deals.properties.groups.get(query, cb) // query is optional
hubspot.deals.properties.groups.create(data, cb)
hubspot.deals.properties.groups.update(name, data, cb)
hubspot.deals.properties.groups.upsert(data)
// not an official API, wrapper doing two API calls. Callbacks not supported at
// this time
```

### Engagements

```javascript
hubspot.engagements.create(data, cb)
hubspot.engagements.get(opts, cb)
hubspot.engagements.getRecentlyModified(opts, cb)
hubspot.engagements.getAssociated(objectType, objectId, opts, cb)
hubspot.engagements.getCallDispositions(cb)
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
hubspot.campaigns.getById(cb)
hubspot.campaigns.get(opts, cb)
hubspot.campaigns.getOne(id, cb)
hubspot.campaigns.events(opts, cb)
```

### Social Media

```javascript
hubspot.broadcasts.get(opts, cb)
```

### Timeline

```javascript
// setup for timeline events
hubspot.timelines.createEventType(applicationId, userId, data, cb)
hubspot.timelines.updateEventType(applicationId, eventTypeId, data, cb)
hubspot.timelines.createEventTypeProperty(
  applicationId,
  eventTypeId,
  userId,
  data,
  cb,
)
hubspot.timelines.updateEventTypeProperty(
  applicationId,
  eventTypeId,
  propertyId,
  data,
  cb,
)
// creating timeline events
hubspot.timelines.createTimelineEvent(applicationId, eventTypeId, data, cb)
```

NOTE: From the [documentation] for createTimelineEvent:

> Returns a 204 response on success. Otherwise, you'll receive a 4xx error, with
> more details about the specific error in the body of the response.

So on success the body is empty or `undefined` and you will not get a result
passed to a provided callback function

[documentation]: https://developers.hubspot.com/docs/methods/timeline/create-or-update-event

### Transactional Emails

```javascript
hubspot.emails.sendTransactionalEmail(data, cb)
```

### OAuth

#### Obtain your authorization url

```javascript
const params = {
  client_id: 'your_client_id',
  scopes: 'some scopes',
  redirect_uri: 'take_me_to_the_ballpark',
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

You can also pass the constructor directly as parameters (although with a
slightly awkward case change)

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

## Typescript

You may use this library in your Typescript project via:

```
import Hubspot from 'hubspot';
const hubspot = new Hubspot({ apiKey: 'key' });
```

## License

MIT

## Contributing

Before submitting a pull request, please make sure the following is done:

1. Fork the repository and create your branch from master.
1. Run `npm build`. This will:
   a. Run `npm install` in the repository root.
   a. Ensure the test suite passes with`npm test`.
   a. Format your code with prettier and eslint using `npm run lint`.

1. If you’ve fixed a bug or added code that should be tested, add tests!

Tip: `npm run mocha -- --grep "test name"` is helpful in development.

## Development Workflow

After cloning this repo, run `npm install` to fetch dependencies. Then run the
test suite with `npm test`. From master, this should be green. Our tests mock
out requests to HubSpot's api using [nock]. We then recommend running the test
suite without mocking api requests with `NOCK_OFF=true npm run mocha`. This
should fail as you'll need some [environment variables] for real requests to
pass.

[nock]: https://github.com/nock/nock
[environment variables]: https://github.com/motdotla/dotenv

If you haven't already, create a [developer account] on hubspot. You'll want to
[create an app] and a [test account] as well. Then, create a new file, `.env` in
the root of the repo. Inside you'll need to add an [app id], a HubSpot user id,
an [api key] and an [oauth access token];

NOTE: Your HubSpot user ID; This can be found in the same place as your
Developer HAPIkey in your Developer portal.

[developer account]: https://developer.hubspot.com
[create an app]: https://developers.hubspot.com/docs/faq/how-do-i-create-an-app-in-hubspot
[test account]: https://developers.hubspot.com/docs/faq/how-do-i-create-a-test-account
[app id]: https://developers.hubspot.com/docs/faq/how-do-i-find-the-app-id
[api key]: https://knowledge.hubspot.com/articles/kcs_article/integrations/how-do-i-get-my-hubspot-api-key
[oauth access token]: https://developers.hubspot.com/docs/methods/oauth2/oauth2-overview

```.env
API_KEY="11111111-5555-kkkk-qqqq-999999999999"
APPLICATION_ID=111111
USER_ID=2222222
ACCESS_TOKEN=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA_BBB_CCCC_____-D_EEEEEEEEEEEEEEEEEEEEEEE_fffffff-gggggg"
```

To get an access token, you should follow the [instructions here] after cloning
the oauth-quickstart-nodejs project. Make sure to modify `index.js` to include
all the required scopes as shown in this [pull-request].

[instructions here]: https://github.com/HubSpot/oauth-quickstart-nodejs
[pull-request]: https://github.com/HubSpot/oauth-quickstart-nodejs/pull/1

Once you have a green test suite with mocking turned off (run
`NOCK_OFF=true npm run mocha` to confirm) you can write a test for the new
feature or bug fix hitting the live API. Once that test is passing try mocking
out the endpoint using the fakeHubspotApi test helper.

Push to your fork. Write a [good commit message][commit]. Submit a pull request.

[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html

Others will give constructive feedback. This is a time for discussion and
improvements, and making the necessary changes will be required before we can
merge the contribution.

Thank you to all our [contributors].

[contributors]: https://github.com/MadKudu/node-hubspot/graphs/contributors
