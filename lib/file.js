const fetch = require('node-fetch')
const FormData = require('form-data')

class File {
  constructor(client) {
    this.client = client
  }

  get() {
    return this.client._request({
      method: 'GET',
      path: '/filemanager/api/v2/files',
    })
  }

  getOne(id) {
    return this.client._request({
      method: 'GET',
      path: `/filemanager/api/v2/files/${id}`,
    })
  }

  upload(file, override, hidden) {
    override = override == null ? false : override // false is default value
    hidden = hidden == null ? false : hidden // false is default value

    return fetch(file.url)
      .then((response) => response.blob())
      .then((blob) => blob.arrayBuffer())
      .then((arrayBuffer) => {
        const formData = new FormData()

        if (file.folderId != null) {
          formData.append('folder_ids', file.folderId)
        }
        if (file.folderPath != null) {
          formData.append('folder_paths', file.folderPath)
        }

        formData.append('file_names', file.name)
        formData.append('files', Buffer.from(arrayBuffer), file.name)

        return fetch(
          `${this.client.baseUrl}/filemanager/api/v2/files?hapikey=${this.client.qs.hapikey}&override=${override}&hidden=${hidden}`,
          {
            method: 'POST',
            body: formData,
          }
        ) // can't use the request-promise based client because they don't handle formdata inside of body correctly. See: https://github.com/request/request-promise/issues/271
      })
  }
}

module.exports = File
