// Type definitions for hubspot 1.3.0
// Project: https://github.com/brainflake/node-hubspot

import * as request from 'request-promise';

declare namespace hubspot {

  class Contact {
    getById(id: string): request.RequestPromise
  }

  interface HubspotOptions {
    apiKey?: string;
    accessToken?: string;
    baseUrl?: string;
  }

  export class Hubspot {
    constructor(options?: HubspotOptions);
    contacts: Contact
  }
}

export = hubspot
