const lambda = require('../src/lambda')
const DEFAULT_GET_DATA = "GET_WAS_GOOD"
const DEFAULT_PUT_DATA = "PUT_WAS_GOOD"

function mockDynamoApi(options) {
  return {
    getItem: (params) => {
      return {
        promise: () => {
          return new Promise((resolve, reject) => {
            if(options.success) {
              resolve({payload: DEFAULT_GET_DATA})
            } else {
              reject('Bad stuff happened!')
            }
          });
        }
      }
    },
    putItem: (params) => {
      return {
        promise: () => {
          return new Promise((resolve, reject) => {
            if(options.success) {
              resolve({payload: DEFAULT_PUT_DATA})
            } else {
              reject('Bad stuff happened')
            }
          });
        }
      }
    }
  }
}

function mockS3Api() {
  return {
    putItem: (params) => { return new Promise((resolve, reject) => {
      resolve({payload: DEFAULT_PUT_DATA});
    }); }
  }
}

describe('The lambda to retrieve configuration', () => {
  it('Should succeed with data if the dynamo retrieve was a success', (done) => {

    function callback(error, data) {
      expect(error).toBeNull()
      expect(data).toBe(DEFAULT_GET_DATA)
      done();
    }

    lambda.getConfig(null, null, callback, mockDynamoApi({success: true}))
  })

  it('Should return with an error if dynamo did not respond successfully', (done) => {
    function callback(error, data) {
      expect(data).toBeUndefined()
      expect(error).not.toBe(null)
      done();
    }

    lambda.getConfig(null, null, callback, mockDynamoApi({success: false}))
  })
})

describe('The lambda to save configuration', () => {
  it('Should succeed with data if the dynamo put was a success', (done) => {

    function callback(error, data) {
      expect(error).toBeNull()
      expect(data).toBe(DEFAULT_PUT_DATA)
      done();
    }

    lambda.saveConfig({config: 'hello'}, null, callback, mockDynamoApi({success: true}), mockS3Api())
  })

  it('Should return with an error if dynamo put did not respond successfully', (done) => {
    function callback(error, data) {
      expect(data).toBeUndefined()
      expect(error).not.toBe(null)
      done();
    }

    lambda.saveConfig({config: 'hello'}, null, callback, mockDynamoApi({success: false}), mockS3Api())
  })
})
