var chai = require('chai')
var expect = chai.expect

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
    let file_id

    before(function () {
      return hubspot.files.get().then(data => {
        file_id = data.objects[0].id
      })
    })

    it('Should return one file', function () {
      return hubspot.files.getOne(file_id).then(data => {
        // console.log(data)
        expect(data).to.be.an('object')
      })
    })
  })
})
