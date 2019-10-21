import Hubspot, { ApiOptions, HubspotError } from '../..'
import { RequestError } from 'request-promise/errors'

const apiKeyOptions: ApiOptions = { apiKey: 'demo' }

const handleResponse = (response) => {
  console.log(response)
}

const handleError = (requestError: RequestError) => {
  const error = requestError.error as HubspotError
  console.log(error.status)
  console.log(error.message)
  console.log(error.correlationId)
  console.log(error.requestId)
}

const hubspot = new Hubspot(apiKeyOptions)

hubspot.companies
  .get({ limit: 1 })
  .then(handleResponse)
  .catch(handleError)
