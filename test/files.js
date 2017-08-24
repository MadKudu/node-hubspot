const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const hubspot = new Hubspot({ apiKey: 'demo' })

describe('files', function () {
  describe('get', function () {
    it('Should return all files', function () {
      return hubspot.files.get().then(data => {
        // console.log(data)
        expect(data).to.be.a('object')
        expect(data.total_count).to.be.above(0)
      })
    })
  })

  describe('getOne', function () {
    let fileId

    before(function () {
      return hubspot.files.get().then(data => {
        fileId = data.objects[0].id
      })
    })

    it('Should return one file', function () {
      return hubspot.files.getOne(fileId).then(data => {
        // console.log(data)
        expect(data).to.be.an('object')
      })
    })
  })
})
