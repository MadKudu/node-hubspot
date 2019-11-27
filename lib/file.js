const _ = require('lodash')
const qs = require('querystring')
const fetch = require('node-fetch')
const FormData = require('form-data')

const getAccessToken = (client) => {
  const oauth1Token = _.get(client, 'qs.access_token')
  return client.accessToken || oauth1Token
}

const getFormData = (fileDetails, data) => {
  const formData = new FormData()

  if (!_.isNil(fileDetails.folderId)) formData.append('folder_ids', fileDetails.folderId)
  if (!_.isNil(fileDetails.folderPath)) formData.append('folder_paths', fileDetails.folderPath)

  formData.append('file_names', fileDetails.name)
  formData.append('files', Buffer.from(data), fileDetails.name)
  return formData
}

const getUrlForFileUpload = (client, override, hidden) => {
  const hapikey = _.get(client, 'qs.hapikey')
  const params = {}
  if (override) params.override = override
  if (hidden) params.override = hidden
  if (hapikey) params.hapikey = hapikey
  const queryPart = _.isEmpty(params) ? '' : `?${qs.stringify(params)}`

  return `${client.baseUrl}/filemanager/api/v2/files${queryPart}`
}

class File {
  constructor(client) {
    this.client = client
  }

  get() {
    return this.client.apiRequest({
      method: 'GET',
      path: '/filemanager/api/v2/files',
    })
  }

  getOne(id) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/filemanager/api/v2/files/${id}`,
    })
  }

  upload(fileDetails, override, hidden) {
    return fetch(fileDetails.url)
      .then((response) => response.blob())
      .then((blob) => blob.arrayBuffer())
      .then((arrayBuffer) => {
        const body = getFormData(fileDetails, arrayBuffer)
        const headers = body.getHeaders()
        headers.authorization = `Bearer ${getAccessToken(this.client)}`

        // can't use the request-promise based client because they don't handle formdata inside
        // of body correctly. See: https://github.com/request/request-promise/issues/271
        return fetch(getUrlForFileUpload(this.client, override, hidden), {
          method: 'POST',
          body,
          headers,
        })
      })
      .then((data) => data.json())
  }
}

module.exports = File
