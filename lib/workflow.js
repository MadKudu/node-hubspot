class Workflow {
  constructor (client) {
    this.client = client
  }

  enroll (workflowId, email, cb) {
    return this.client._request({
      method: 'POST',
      path: `/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
    }, cb)
  }

  unenroll (workflowId, email, cb) {
    return this.client._request({
      method: 'DELETE',
      path: `/automation/v2/workflows/${workflowId}/enrollments/contacts/${email}`,
    }, cb)
  }
}

module.exports = Workflow
