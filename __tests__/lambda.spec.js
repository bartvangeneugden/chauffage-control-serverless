const lambda = require('../src/backend/lambda')
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
    putObject: (params) => {
      return new Promise((resolve, reject) => {
        resolve({payload: JSON.parse(params.Body.toString('utf-8'))});
      });
    }
  }
}

const mockConfig = require('./mockConfig.json');

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
    const s3Api = mockS3Api();

    function callback(error, data) {
      expect(error).toBeNull()
      expect(data).toEqual([])

      done();
    }
    lambda.saveConfig({config: []}, null, callback, mockDynamoApi({success: true}), s3Api)
  });

  it('Should return with an error if dynamo put did not respond successfully', (done) => {
    function callback(error, data) {
      expect(data).toBeUndefined()
      expect(error).not.toBe(null)
      done();
    }

    lambda.saveConfig({config: 'hello'}, null, callback, mockDynamoApi({success: false}), mockS3Api())
  });

  it('Should write a correct current state to S3', (done) => {
    const s3Api = mockS3Api();

    function callback(error, data) {
      expect(data.length).toBe(4);

      expect(data[0].id).toBe(1);
      expect(data[0].on).toBe(false);
      expect(data[1].on).toBe(false);
      expect(data[2].on).toBe(true);
      expect(data[3].on).toBe(true);
      done();
    }
    lambda.saveConfig({config: mockConfig}, null, callback, mockDynamoApi({success: true}), s3Api, 1000)
  });
})
