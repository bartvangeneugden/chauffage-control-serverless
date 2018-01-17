const AWS = require('aws-sdk')
AWS.config.apiVersions = {
  dynamodb: '2012-08-10'
};

const dynamoApi = new AWS.DynamoDB();

const DYNAMO_DB_TABLE = "datastore"
const CHAUFFAGE_TOPIC = "chauffage"

exports.getConfig = (event, context, callback, dynamo = dynamoApi) => {
  dynamo.getItem({TableName: DYNAMO_DB_TABLE, Key: { topic: CHAUFFAGE_TOPIC }}, (err, data) => {
    if(err) {
      console.log(err, "Error retrieving config")
      callback("Error retrieving config")
    } else {
      callback(null, data.payload)
    }
  })
}

exports.saveConfig = (event, context, callback, dynamo = dynamoApi, s3 = s3Api) => {
  dynamo.putItem({TableName: DYNAMO_DB_TABLE, Key: { topic: CHAUFFAGE_TOPIC, payload:  event.config}}, (err, data) => {
    if(err) {
      console.log(err, "Error saving config")
      callback("Error saving config")
    } else {
      callback(null, data.payload)
    }
  })
}
