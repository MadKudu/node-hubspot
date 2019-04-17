class Form {
  constructor(client) {
    this.client = client
  }

  getAll(options) {
    return this.get(options)
  }

  get(options) {
    return this.client._request({
      method: 'GET',
      path: '/forms/v2/forms',
      qs: options,
    })
  }

  getById(guid) {
    return this.client._request({
      method: 'GET',
      path: '/forms/v2/forms/' + guid,
    })
  }

  getFields(guid) {
    return this.client._request({
      method: 'GET',
      path: '/forms/v2/fields/' + guid,
    })
  }

  getSingleField(guid, fieldname) {
    return this.client._request({
      method: 'GET',
      path: '/forms/v2/fields/' + guid + '/' + fieldname,
    })
  }

  getSubmissions(guid, options) {
    return this.client._request({
      method: 'GET',
      path: '/form-integrations/v1/submissions/forms/' + guid,
      qs: options,
    })
  }

  // submit() {
  //   https://forms.hubspot.com/uploads/form/v2/:portal_id/:form_guid
  // }
}

module.exports = Form
