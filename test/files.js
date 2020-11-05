const chai = require('chai')
const expect = chai.expect

const Hubspot = require('..')
const fakeHubspotApi = require('./helpers/fake_hubspot_api')
const hubspot = new Hubspot({ apiKey: process.env.HUBSPOT_API_KEY || 'demo' })

describe('files', () => {
  describe('get', () => {
    it('Should return all files', () => {
      return hubspot.files.get().then((data) => {
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
        expect(data).to.be.an('object')
      })
    })
  })

  // move it to the integration test
  describe('uploadByUrl', () => {
    const fetchEndpoint = {
      path: '/some.txt',
      response: 'success',
      endpointPath: 'http://app.hubspot.com',
    }

    const uploadEndpoint = {
      path: '/filemanager/api/v3/files/upload',
      query: {
        hapikey: 'demo',
      },
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      getEndpoints: [fetchEndpoint],
      postEndpoints: [uploadEndpoint],
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should upload a file with correct url and payload', () => {
        const fileData = {
          url: 'http://app.hubspot.com/some.txt',
          fileName: 'fetchFileName',
        }
        return hubspot.files.uploadByUrl(fileData).then((data) => {
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })

  describe('upload', () => {
    const uploadEndpoint = {
      path: '/filemanager/api/v3/files/upload',
      query: {
        hapikey: 'demo',
      },
      response: { success: true },
    }

    fakeHubspotApi.setupServer({
      postEndpoints: [uploadEndpoint],
    })

    if (process.env.NOCK_OFF) {
      it('will not run with NOCK_OFF set to true. See commit message.')
    } else {
      it('should upload a file with correct url and payload', () => {
        const fileData = {
          fileName: 'fetchFileName',
          content: 'some file content',
        }
        return hubspot.files.upload(fileData).then((data) => {
          expect(data.success).to.be.eq(true)
        })
      })
    }
  })
})
