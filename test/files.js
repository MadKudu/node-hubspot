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

  // move it to the integration test
  describe.skip('upload', () => {
    let file

    before(() => {
      return hubspot.files.get().then((data) => {
        file = data.objects[0]
      })
    })

    it('Should upload a file', () => {
      const fileToUpload = {
        url: file.url,
        name: 'test.png',
        folderPath: 'hs_marketplace_assets/modules',
      }

      return hubspot.files.upload(fileToUpload).then((data) => {
        // console.log(data)
        expect(data.status).to.equal(200)
      })
    })
  })
})
