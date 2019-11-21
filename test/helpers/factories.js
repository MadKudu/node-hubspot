const createTestContact = (hubspot) =>
  hubspot.contacts.create({
    properties: [
      {
        property: 'email',
        value: `node-hubspot${Date.now()}@madkudu.com`,
      },
      {
        property: 'firstname',
        value: 'Try',
      },
      {
        property: 'lastname',
        value: 'MadKudu',
      },
      {
        property: 'website',
        value: 'http://www.madkudu.com',
      },
      {
        property: 'company',
        value: 'MadKudu',
      },
    ],
  })
const deleteTestContact = (hubspot, contactId) => hubspot.contacts.delete(contactId)

module.exports = { createTestContact, deleteTestContact }
