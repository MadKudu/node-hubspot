import Hubspot, {
  ApiOptions,
  AccessTokenOptions,
} from '../..';

const apiKeyOptions: ApiOptions = { apiKey: 'demo' };
const tokenOptions: AccessTokenOptions = { accessToken: 'token' };
const baseUrlOptions: AccessTokenOptions = { accessToken: 'token', baseUrl: 'http://some-url' };

const hubspot = new Hubspot(apiKeyOptions);

// Promise
hubspot.companies.get( { limit: 1 }).then(results => {
  console.log(results);
}).catch((err) => {
  console.error(err);
});

// Callback
hubspot.companies.properties.groups.get((err, results) => {
  if (err) { console.error(err) }
  console.log(results);
});
