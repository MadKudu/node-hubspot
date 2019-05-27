const Associations = require('./crm_association')

class CRM {
  constructor(client) {
    this.client = client
    this.associations = new Associations(this.client)
  }
}

module.exports = CRM
