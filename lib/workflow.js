class Workflow {
  constructor(client) {
    this.client = client
  }

  get(workflowId) {
    return this.client._request({
      method: 'GET',
      path: `/automation/v3/workflows/${workflowId}`,
    })
  }

  getAll() {
    return this.client._request({
      method: 'GET',
      path: '/automation/v3/workflows',
    })
  }

  enroll(workflowId, email) {
    return this.client._request({
      method: 'POST',
      path: `/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
    })
  }

  unenroll(workflowId, email) {
    return this.client._request({
      method: 'DELETE',
      path: `/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
    })
  }

  current(contactId) {
    return this.client._request({
      method: 'GET',
      path: `/automation/v2/workflows/enrollments/contacts/${contactId}`,
    })
  }
}

module.exports = Workflow
