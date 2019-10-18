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
      path: '/filemanager/api/v2/files/' + id,
    })
  }
}

module.exports = File
