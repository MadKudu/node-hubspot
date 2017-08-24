class File {
  constructor (client) {
    this.client = client
  }

  get (cb) {
    return this.client._request({
      method: 'GET',
      path: '/filemanager/api/v2/files'
    }, cb)
  }

  getOne (id, cb) {
    if (!id || typeof (id) === 'function') {
      return cb(new Error('id parameter must be provided.'))
    }

    return this.client._request({
      method: 'GET',
      path: '/filemanager/api/v2/files/' + id
    }, cb)
  }
}

module.exports = File
