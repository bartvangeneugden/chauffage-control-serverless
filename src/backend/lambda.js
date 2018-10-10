const AWS = require('aws-sdk');
const config = require('../config/');

AWS.config.update({region: 'eu-west-1'});
AWS.config.apiVersions = {
  dynamodb: '2012-08-10'
};

const dynamoApi = new AWS.DynamoDB.DocumentClient();

const DYNAMO_DB_TABLE = "datastore";
const CHAUFFAGE_TOPIC = "chauffage";

exports.getConfig = (event, context, callback, dynamo = dynamoApi) => {
  const params = {TableName: DYNAMO_DB_TABLE, Key: { "topic": CHAUFFAGE_TOPIC} };
  dynamo.get(params).promise().then(data => {
    callback(null, data.Item.payload);
  }).catch (err => {
    console.log(err, "Error retrieving config");
    callback("Error retrieving config");
  });
};

exports.configApi = (event, context, callback, dynamo = dynamoApi) => {
  const params = {TableName: DYNAMO_DB_TABLE, Key: { "topic": CHAUFFAGE_TOPIC} };
  dynamo.get(params).promise().then(data => {
    callback(null, getCurrentStateForConfig(data.Item.payload, Date.now()));
  }).catch (err => {
    console.log(err, "Error retrieving config");
    callback("Error retrieving config");
  });
};

exports.saveConfig = (event, context, callback, dynamo = dynamoApi, s3 = s3Api, currentTimestamp = Date.now) => {
  const dynamoDBParams = {
    TableName: DYNAMO_DB_TABLE,
    Item: {
      topic: CHAUFFAGE_TOPIC,
      payload:  event.config
    }
  };

  dynamo.put(dynamoDBParams).promise().then( data => {
    callback(null, event.config);
  }).catch (err => {
    console.log(err, "Error saving config");
    callback("Error saving config");
  });
};

function getCurrentStateForConfig(configToSave, currentTimestamp) {
  return configToSave.map(relay => {
    if(relay.function == "timer" && currentTimestamp > relay.timerEnds) {
      relay.status = "off";
    }
    return relay;
  }).map(relay => {
		return {id: relay.id, on: relay.status!="off"};
	})
}
