import { Hubspot, HubspotOptions } from '../../index';

const apiKeyOptions: HubspotOptions = { apiKey: 'demo' };
const tokenOptions: HubspotOptions = { accessToken: 'token' };
const baseUrlOptions: HubspotOptions = { accessToken: 'token', baseUrl: 'http://some-url' };

const client = new Hubspot(apiKeyOptions);
client.contacts.getById('id').then(console.log).catch(console.error);
