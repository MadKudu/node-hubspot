# node-hubspot

[![Build Status](https://api.travis-ci.org/MadKudu/node-hubspot.svg)](https://travis-ci.org/MadKudu/node-hubspot)
[![Code Climate](https://codeclimate.com/github/MadKudu/node-hubspot/badges/gpa.svg)](https://codeclimate.com/github/MadKudu/node-hubspot)
[![Test Coverage](https://codeclimate.com/github/MadKudu/node-hubspot/badges/coverage.svg)](https://codeclimate.com/github/MadKudu/node-hubspot/coverage)
[![Issue Count](https://codeclimate.com/github/MadKudu/node-hubspot/badges/issue_count.svg)](https://codeclimate.com/github/MadKudu/node-hubspot)
[![Dependencies](https://david-dm.org/MadKudu/node-hubspot.svg)](https://david-dm.org/MadKudu/node-hubspot)

Javascript / node.js wrapper for the [HubSpot API](https://developers.hubspot.com/docs/overview)

## Installing

```shell
npm install hubspot
```

## Instantiate client

```javascript
const Hubspot = require('hubspot')
const hubspot = new Hubspot({ 
  apiKey: 'abc',
  checkLimit: false // (Optional) Specify whether or not to check the API limit on each call. Default: true 
})
```

You can also authenticate via token:

```javascript
const hubspot = new Hubspot({ accessToken: YOUR_ACCESS_TOKEN })
```

To change the base url:

```javascript
const hubspot = new Hubspot({ accessToken: YOUR_ACCESS_TOKEN, baseUrl: 'https://some-url' })
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

### Changing rate limiter options

[Bottleneck](https://github.com/SGrondin/bottleneck) is used for rate limiting. To override the default settings, pass a `limiter` object when instantiating the client. Bottleneck options can be found [here](https://github.com/SGrondin/bottleneck#constructor).

```javascript
const hubspot = new Hubspot({
  apiKey: YOUR_API_KEY,
  limiter: {
    maxConcurrent: 2,
    minTime: 1000 / 9,
  }
})
```

## Usage

All methods return a [promise]. The success case includes the returned object
from the response. Use the API method via:

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

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

## {EXAMPLE} Create Contact

```javascript
const contactObj = {
  "properties": [
    { "property": "firstname","value": yourvalue },
    { "property": "lastname", "value": yourvalue }
  ]
};

const hubspot = new Hubspot({ apiKey: YOUR_API_KEY });
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
hubspot.companies.get(opts)
hubspot.companies.getById(id)
hubspot.companies.getRecentlyCreated(opts)
hubspot.companies.getRecentlyModified(opts)
hubspot.companies.getByDomain(domain)
hubspot.companies.create(data)
hubspot.companies.addContactToCompany(data)
// data = { companyId: 123, contactVid: 123 }
hubspot.companies.getContactIds(id, options)
hubspot.companies.getContacts(id, options)
hubspot.companies.update(id, data)
hubspot.companies.updateBatch(data)
// data = [{ objectId: 123, properties: [] }]
hubspot.companies.delete(id)
```

### Company properties

```javascript
hubspot.companies.properties.get(query) // query is optional
hubspot.companies.properties.getByName(name)
hubspot.companies.properties.create(data)
hubspot.companies.properties.update(name, data)
hubspot.companies.properties.upsert(data)
// not an official API, wrapper doing two API calls. Callbacks not supported
// at this time.
```

### Company properties groups

```javascript
hubspot.companies.properties.groups.get(query) // query is optional
hubspot.companies.properties.groups.create(data)
hubspot.companies.properties.groups.update(name, data)
hubspot.companies.properties.groups.upsert(data)
// not an official API, wrapper doing two API calls. Callbacks not supported at
// this time
```

### Contacts

```javascript
hubspot.contacts.get(opts)
hubspot.contacts.getByEmail(email)
hubspot.contacts.getByEmailBatch(emails)
hubspot.contacts.getById(id)
hubspot.contacts.getByIdBatch(ids)
hubspot.contacts.getByToken(utk)
hubspot.contacts.update(id, data)
hubspot.contacts.create(data)
hubspot.contacts.createOrUpdateBatch(data)
// data = [{ vid/email: '', properties: [] }]
hubspot.contacts.search(query)
hubspot.contacts.getRecentlyCreated()
hubspot.contacts.getRecentlyModified()
hubspot.contacts.createOrUpdate(email, data)
hubspot.contacts.delete(id)
```

### Contact properties

```javascript
hubspot.contacts.properties.get()
hubspot.contacts.properties.getByName(name)
hubspot.contacts.properties.create(data)
hubspot.contacts.properties.update(name, data)
hubspot.contacts.properties.upsert(data)
// not an official API, wrapper doing two API calls.
// Callbacks not supported at this time
hubspot.contacts.properties.getGroups()
// => [ {name: '...', displayName: '...'}, ...]
hubspot.contacts.properties.createGroup({ name, displayName })
hubspot.contacts.properties.updateGroup(name, { displayName })
hubspot.contacts.properties.deleteGroup(name)
hubspot.contacts.properties.delete(name)
```

### Pages

```javascript
// more opts can be found at https://developers.hubspot.com/docs/methods/pages/get_pages
hubspot.pages.get(opts) // eg: opts = {is_draft: false}
```

### Deals

```javascript
hubspot.deals.get(opts)
hubspot.deals.getRecentlyModified(opts)
hubspot.deals.getRecentlyCreated(opts)
hubspot.deals.getById(id)
hubspot.deals.getAssociated(objectType, objectId, opts)
hubspot.deals.deleteById(id)
hubspot.deals.updateById(id, data)
hubspot.deals.updateBatch(data)
hubspot.deals.create(data)
hubspot.deals.associate(id, objectType, associatedObjectId)
hubspot.deals.removeAssociation(id, objectType, associatedObjectId)
```

### Deals properties

```javascript
hubspot.deals.properties.get(query) // query is optional
hubspot.deals.properties.getByName(name)
hubspot.deals.properties.create(data)
hubspot.deals.properties.update(name, data)
hubspot.deals.properties.upsert(data)
// not an official API, wrapper doing two API calls. Callbacks not supported at
// this time
```

### Deals properties groups

```javascript
hubspot.deals.properties.groups.get(query) // query is optional
hubspot.deals.properties.groups.create(data)
hubspot.deals.properties.groups.update(name, data)
hubspot.deals.properties.groups.upsert(data)
// not an official API, wrapper doing two API calls. Callbacks not supported at
// this time
```

### Engagements

```javascript
hubspot.engagements.create(data)
hubspot.engagements.get(opts)
hubspot.engagements.getRecentlyModified(opts)
hubspot.engagements.getAssociated(objectType, objectId, opts)
hubspot.engagements.getCallDispositions()
```

### Owners

```javascript
hubspot.owners.get(opts)
```

### Pipelines

```javascript
hubspot.pipelines.get(opts)
```

### Lists

```javascript
hubspot.lists.get(opts)
hubspot.lists.getOne(id)
hubspot.lists.create(data)
hubspot.lists.delete(id)
hubspot.lists.getContacts(id, opts)
hubspot.lists.getRecentContacts(id, opts)
hubspot.lists.addContacts(id, contactBody)
```

### Files

```javascript
hubspot.files.get()
hubspot.files.getOne(id)
```

### Email

```javascript
hubspot.subscriptions.get(opts)
```

### Email Events

```javascript
hubspot.campaigns.getById()
hubspot.campaigns.get(opts)
hubspot.campaigns.getOne(id)
hubspot.campaigns.events(opts)
```

### Social Media

```javascript
hubspot.broadcasts.get(opts)
```

### Timeline

```javascript
// setup for timeline events
hubspot.timelines.createEventType(applicationId, userId, data)
hubspot.timelines.updateEventType(applicationId, eventTypeId, data)
hubspot.timelines.createEventTypeProperty(
  applicationId,
  eventTypeId,
  userId,
  data,
)
hubspot.timelines.updateEventTypeProperty(
  applicationId,
  eventTypeId,
  propertyId,
  data,
)
// creating timeline events
hubspot.timelines.createTimelineEvent(applicationId, eventTypeId, data)
```

NOTE: From the [documentation] for createTimelineEvent:

> Returns a 204 response on success. Otherwise, you'll receive a 4xx error, with
> more details about the specific error in the body of the response.

So on success the body is empty or `undefined` and you will not get a result
from the resolved promise.

[documentation]: https://developers.hubspot.com/docs/methods/timeline/create-or-update-event

### Transactional Emails

```javascript
hubspot.emails.sendTransactionalEmail(data)
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

```typescript
import Hubspot from 'hubspot';
const hubspot = new Hubspot({ apiKey: YOUR_API_KEY });
```

## License

MIT

## Contributing

See our [contributing guidelines](/contributing.md)

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
and an [oauth access token];

NOTE: Your HubSpot user ID; This can be found in the same place as your
Developer HAPIkey in your Developer portal.

[developer account]: https://developer.hubspot.com
[create an app]: https://developers.hubspot.com/docs/faq/how-do-i-create-an-app-in-hubspot
[test account]: https://developers.hubspot.com/docs/faq/how-do-i-create-a-test-account
[app id]: https://developers.hubspot.com/docs/faq/how-do-i-find-the-app-id
[oauth access token]: https://developers.hubspot.com/docs/methods/oauth2/oauth2-overview

```.env
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
