const config = require('./config');
const AWS = require('aws-sdk');
AWS.config.apiVersions = {
  dynamodb: '2012-08-10'
};

const dynamoApi = new AWS.DynamoDB();
const s3Api = new AWS.S3();

const DYNAMO_DB_TABLE = "datastore"
const CHAUFFAGE_TOPIC = "chauffage"

exports.getConfig = (event, context, callback, dynamo = dynamoApi) => {
  dynamo.getItem({TableName: DYNAMO_DB_TABLE, Key: { topic: CHAUFFAGE_TOPIC }})
  .promise().then( data => {
    callback(null, data.payload);
  }).catch (err => {
    console.log(err, "Error retrieving config");
    callback("Error retrieving config");
  });
}

exports.saveConfig = (event, context, callback, dynamo = dynamoApi, s3 = s3Api) => {
  const dynamoDBParams = {
    TableName: DYNAMO_DB_TABLE,
    Key: {
      topic: CHAUFFAGE_TOPIC,
      payload:  event.config
    }
  };
  const s3Params = {
    Body: Buffer.from(event.config),
    Bucket: config.bucket,
  }

  dynamo.putItem(dynamoDBParams).promise().then( data => {
    return s3.putItem({  });
  }).then( data => {
    callback(null, data.payload);
  }).catch (err => {
    console.log(err, "Error saving config");
    callback("Error saving config");
  });
}
