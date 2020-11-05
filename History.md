# 2.3.14 / 2020-11-05

- Update file related functionality according to API changes

# 2.3.13 / 2020-06-16

- Fix query parameter for the file uploading

# 2.3.12 / 2020-04-22

- Add Tickets related functionality

# 2.3.11 / 2020-04-22

- Add Tickets related functionality

# 2.3.10 / 2020-04-14

- Add Get in Tickets 
- Fix subscription typescript definition to have unsubscribe function 
- Add support for contact addSecondaryEmail 

# 2.3.9 / 2020-02-05

- Add email marketing missing functionality
- Update lists retrieving functionality

# 2.3.8 / 2020-02-05

- Update typing   

# 2.3.7 / 2020-01-15

- Add possibility to get the list of recently updated contacts 
- Add workflows create & delete commands 
- Add marketing emails functionality   

# 2.3.6 / 2020-01-09

- Add possibility to delete contacts from list 

# 2.3.5 / 2019-11-28

- Extend client request wrapper
- Fix issues with files and forms
- Fix typing

# 2.3.4 / 2019-11-25

- Add OAuth for multipart form-data upload

# 2.3.3 / 2019-11-21

- Add multipart form-data upload
- Fix tests, update typing
- Extended client with expiresIn and updatedAt values
- Add hubspot.forms.getUploadedFileByUrl method

# 2.3.2 / 2019-10-21

- Update hubspot.contacts.getById method
- Update hubspot.companies.getByDomain method
- Update hubspot.oauth.getAuthorizationUrl method

# 2.3.1

- Add getPortalInfo for OAuth
- Update getByDomain method

# 2.0.0 / 2018-12-19

- Begins migration of test suite to mocked api calls instead of hitting HubSpot
  "live"
- Added support for some api endpoints such as timelines.

Breaking changes:

- Remove support for passing callbacks

The usage of callbacks throughout node-hubspot was inconsistent in
functionality. There was a lot of code to maintain callback support that we can
remove now that promises are returned by all functions.

# 1.0.0 / 2017-08-23

- Added support for promises
- Added support for OAuth2
- Added convenience methods to support OAuth
- Tests working on demo instance of HubSpot
- Added support for some missing methods

Breaking changes:

- New instantiation of client
- node > 6.10.0 required (see below)

Notes:

- new version is ES2015 heavy and has only been tested in version of node > 6.10.0
- hasn't been tested in browser
- some babel magic would be needed for use in older versions of node (PR welcome!)

# 0.3.0 / 2016-03-29

- Removed events.get() and campaigns.tracking.events() by merging them into campaigns.events()

# 0.2.5 / 2016-03-25

- Added client.files.getOne()
- Fixed client.files.get()
- Updated README
