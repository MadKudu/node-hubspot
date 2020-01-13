class Workflow {
  constructor(client) {
    this.client = client
  }

  get(workflowId) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/automation/v3/workflows/${workflowId}`,
    })
  }

  getAll() {
    return this.client.apiRequest({
      method: 'GET',
      path: '/automation/v3/workflows',
    })
  }

  create(data) {
    return this.client.apiRequest({
      method: 'POST',
      path: '/automation/v3/workflows',
      body: data,
    })
  }

  delete(workflowId) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/automation/v3/workflows/${workflowId}`,
    })
  }

  enroll(workflowId, email) {
    return this.client.apiRequest({
      method: 'POST',
      path: `/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
    })
  }

  unenroll(workflowId, email) {
    return this.client.apiRequest({
      method: 'DELETE',
      path: `/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
    })
  }

  current(contactId) {
    return this.client.apiRequest({
      method: 'GET',
      path: `/automation/v2/workflows/enrollments/contacts/${contactId}`,
    })
  }
}

module.exports = Workflow
