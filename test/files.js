const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

describe('files', () => {
  describe('get', () => {
    it('Should return all files', () => {
      return hubspot.files.get().then((data) => {
        // console.log(data)
        expect(data).to.be.a('object')
        expect(data.total_count).to.be.above(0)
      })
    })
  })

  describe('getOne', () => {
    let fileId

    before(() => {
      return hubspot.files.get().then((data) => {
        fileId = data.objects[0].id
      })
    })

    it('Should return one file', () => {
      return hubspot.files.getOne(fileId).then((data) => {
        // console.log(data)
        expect(data).to.be.an('object')
      })
    })
  })
})
