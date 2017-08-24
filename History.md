1.0.0 / 2017-08-23
==================

  * Added support for promises
  * Added support for OAuth2
  * Added convenience methods to support OAuth
  * Tests working on demo instance of HubSpot
  * Added support for some missing methods

Breaking changes:
  * New instantation of client
  * node > 6.10.0 required (see below)

Notes:

  * new version is ES2015 heavy and has only been tested in version of node > 6.10.0
  * hasn't been tested in browser
  * some babel magic would be needed for use in older versions of node (PR welcome!)

0.3.0 / 2016-03-29
==================

  * Removed events.get() and campaigns.tracking.events() by merging them into campaigns.events()

0.2.5 / 2016-03-25
==================

  * Added client.files.getOne()
  * Fixed client.files.get()
  * Updated README
