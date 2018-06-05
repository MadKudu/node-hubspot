import Hubspot, {
  ApiOptions,
  AccessTokenOptions,
  HubspotError,
} from '../..';
import { RequestError } from 'request-promise/errors';

const apiKeyOptions: ApiOptions = { apiKey: 'apiKey' };
const tokenOptions: AccessTokenOptions = { accessToken: 'token' };
const baseUrlOptions: AccessTokenOptions = { accessToken: 'token', baseUrl: 'http://some-url' };

const handleResponse = (response) => {
  console.log(response);
}

const handleError = (requestError: RequestError) => {
  const error = requestError.error as HubspotError;
  console.log(error.status);
  console.log(error.message);
  console.log(error.correlationId);
  console.log(error.requestId);
}

const hubspot = new Hubspot(apiKeyOptions);

// Promise
hubspot.companies.get( { limit: 1 })
  .then(handleResponse)
  .catch(handleError)

// Callback
hubspot.companies.properties.groups.get((err: HubspotError, results) => {
  if (err) { console.error(err) }
  console.log(results);
});
