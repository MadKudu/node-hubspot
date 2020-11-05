const _ = require('lodash')
const qs = require('querystring')
const fetch = require('node-fetch').default
const FormData = require('form-data')
const guid = require('./utils/guid')

const getAccessToken = (client) => {
  const oauth1Token = _.get(client, 'qs.access_token')
  return client.accessToken || oauth1Token
}

const getDefaultOptions = () => {
  return {
    access: 'PUBLIC_INDEXABLE',
    ttl: 'P3M',
    overwrite: false,
    duplicateValidationStrategy: 'NONE',
    duplicateValidationScope: 'ENTIRE_PORTAL',
  }
}

const getFormData = ({ content, options, folderPath, fileName, folderId, charsetHunch }) => {
  const formData = new FormData()

  if (_.isNil(folderPath)) folderPath = '/'
  if (_.isNil(fileName)) fileName = guid()
  if (!_.isNil(folderId)) formData.append('folderId', folderId)
  if (!_.isNil(charsetHunch)) formData.append('charsetHunch', charsetHunch)

  formData.append('fileName', fileName)
  formData.append('file', Buffer.from(content), fileName)
  formData.append('options', JSON.stringify(Object.assign(getDefaultOptions(), options)))
  formData.append('folderPath', folderPath)

  return formData
}

const getUrlForFileUpload = (client) => {
  const hapikey = _.get(client, 'qs.hapikey')
  const params = {}
  if (hapikey) params.hapikey = hapikey
  const queryPart = _.isEmpty(params) ? '' : `?${qs.stringify(params)}`

  return `${client.baseUrl}/filemanager/api/v3/files/upload${queryPart}`
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

  /**
   *
   * @param {url, options, folderPath, fileName, folderId, charsetHunch} fileData
   *
   * @param {string} fileData.url Url of file.
   * @param {Object} fileData.options
   * @param {string} fileData.folderPath Partially optional field. One of folderPath or folderId must be specified.
   * @param {string} fileData.fileName Optional field. Desired name of the file.
   * @param {string} fileData.folderId Partially optional field. One of folderId or folderPath must be specified.
   * @param {string} fileData.charsetHunch Optional field. The character set of the provided file.
   *
   * @see https://legacydocs.hubspot.com/docs/methods/files/v3/upload_new_file
   */
  async uploadByUrl(fileData) {
    const headers = {
      authorization: `Bearer ${getAccessToken(this.client)}`,
    }

    const fetchFileResult = await fetch(fileData.url, {
      method: 'GET',
      headers,
    })
    const content = await fetchFileResult.arrayBuffer()
    const uploadDetails = _.assign({}, fileData, { content })

    return this.upload(uploadDetails)
  }

  /**
   * Upload a new file.
   *
   * @param {content, options, folderPath, fileName, folderId, charsetHunch} fileData
   *
   * @param {*}      fileData.content content of file.
   * @param {Object} fileData.options
   * @param {string} fileData.folderPath Partially optional field. One of folderPath or folderId must be specified.
   * @param {string} fileData.fileName Optional field. Desired name of the file.
   * @param {string} fileData.folderId Partially optional field. One of folderId or folderPath must be specified.
   * @param {string} fileData.charsetHunch Optional field. The character set of the provided file.
   *
   * @see https://legacydocs.hubspot.com/docs/methods/files/v3/upload_new_file
   */
  async upload(fileData) {
    const body = getFormData(fileData)
    const headers = body.getHeaders()
    headers.authorization = `Bearer ${getAccessToken(this.client)}`

    // can't use the request-promise based client because they don't handle formdata inside
    // of body correctly. See: https://github.com/request/request-promise/issues/271
    const result = await fetch(getUrlForFileUpload(this.client), {
      method: 'POST',
      body,
      headers,
    })

    return result.json()
  }
}

module.exports = File
