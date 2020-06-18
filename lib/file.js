const _ = require('lodash')
const qs = require('querystring')
const fetch = require('node-fetch').default
const FormData = require('form-data')

const getAccessToken = (client) => {
  const oauth1Token = _.get(client, 'qs.access_token')
  return client.accessToken || oauth1Token
}

const getFormData = ({ name, content, folderId, folderPath }) => {
  const formData = new FormData()

  if (!_.isNil(folderId)) formData.append('folder_ids', folderId)
  if (!_.isNil(folderPath)) formData.append('folder_paths', folderPath)

  formData.append('file_names', name)
  formData.append('files', Buffer.from(content), name)
  return formData
}

const getUrlForFileUpload = (client, overwrite, hidden) => {
  const hapikey = _.get(client, 'qs.hapikey')
  const params = {}
  if (!_.isUndefined(overwrite)) params.overwrite = overwrite
  if (!_.isUndefined(hidden)) params.hidden = hidden
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

  async uploadByUrl(fileDetails, overwrite, hidden) {
    const headers = {
      authorization: `Bearer ${getAccessToken(this.client)}`,
    }

    const fetchFileResult = await fetch(fileDetails.url, {
      method: 'GET',
      headers,
    })
    const content = await fetchFileResult.arrayBuffer()
    const uploadDetails = _.assign({}, fileDetails, { content })
    return this.upload(uploadDetails, overwrite, hidden)
  }

  async upload(fileDetails, overwrite, hidden) {
    const body = getFormData(fileDetails)
    const headers = body.getHeaders()
    headers.authorization = `Bearer ${getAccessToken(this.client)}`

    // can't use the request-promise based client because they don't handle formdata inside
    // of body correctly. See: https://github.com/request/request-promise/issues/271
    const result = await fetch(getUrlForFileUpload(this.client, overwrite, hidden), {
      method: 'POST',
      body,
      headers,
    })
    return result.json()
  }
}

module.exports = File
