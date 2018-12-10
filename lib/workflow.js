class Workflow {
  constructor(client) {
    this.client = client
  }

  get(workflowId, cb) {
    return this.client._request(
      {
        method: 'GET',
        path: `/automation/v3/workflows/${workflowId}`,
      },
      cb,
    )
  }

  getAll(cb) {
    return this.client._request(
      {
        method: 'GET',
        path: '/automation/v3/workflows',
      },
      cb,
    )
  }

  enroll(workflowId, email, cb) {
    return this.client._request(
      {
        method: 'POST',
        path: `/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
      },
      cb,
    )
  }

  unenroll(workflowId, email, cb) {
    return this.client._request(
      {
        method: 'DELETE',
        path: `/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
      },
      cb,
    )
  }

  current(contactId, cb) {
    return this.client._request(
      {
        method: 'GET',
        path: `/automation/v2/workflows/enrollments/contacts/${contactId}`,
      },
      cb,
    )
  }
}

module.exports = Workflow
