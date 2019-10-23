// AWS Imports
var AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});
var ddb = new AWS.DynamoDB.DocumentClient();

function initializeUser(userId, schemaObj) {

  var tableName = 'Secrets-' + process.env.ENV;
  var params = {
    TableName: tableName,
    Item: {
      userId: userId,
      Task1: {
        Done: false,
        EndTimeStamp: 0,
        Link: schemaObj.task1.link,
        Secret: schemaObj.task1.secret,
        StartTimeStamp: 0
      },
      Task2: {
        Done: false,
        EndTimeStamp: 0,
        Link: schemaObj.task2.link,
        Secret: schemaObj.task2.secret,
        StartTimeStamp: 0
      },
      Task3: {
        Done: false,
        EndTimeStamp: 0,
        Link: schemaObj.task3.link,
        Secret: schemaObj.task3.secret,
        StartTimeStamp: 0
      },
      Task4: {
        Done: false,
        EndTimeStamp: 0,
        Link: schemaObj.task4.link,
        Secret: schemaObj.task4.secret,
        StartTimeStamp: 0
      }
    }
  };

  return new Promise(
    function (resolve, reject) {
      console.log("Adding a new item...");
      ddb.put(params, function(err, data) {
          if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
              reject("Error adding db record", err);
          } else {
              console.log("Added item:", JSON.stringify(data, null, 2));
              resolve(data);
          }
      });
    }
  );
}

function deleteUser(userId) {

  var tableName = 'Secrets-' + process.env.ENV;
  var params = {
    TableName: tableName,
    Key: {
      userId: userId,
    }
   }

  return new Promise(
    function (resolve, reject) {
      console.log("Deleting item...");
      ddb.delete(params, function(err, data) {
          if (err) {
              console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
              reject("Error deleting db record", err);
          } else {
              console.log("Deleted item:", JSON.stringify(data, null, 2));
              resolve(data);
          }
      });
    }
  );
}

function updateTask(userId, task, key, value) {

  var tableName = 'Secrets-' + process.env.ENV;
  var params = {
    TableName: tableName,
    Key: {
      userId: userId
    },
    UpdateExpression: `set ${task}.${key} = :v`,
    ExpressionAttributeValues: {
      ':v' : value
    }
  };

  return new Promise(
    function (resolve, reject) {
      ddb.update(params, function(err, data) {
        if (err) {
          reject("Error updating db record", err);
        } else {
          resolve(data);
        }
      });
    }
  );
}

function getTasks(userId) {

  var tableName = 'Secrets-' + process.env.ENV;
  var params = {
    TableName: tableName,
    Key: {
       userId: userId
    }
  };
  
  return new Promise(
    function (resolve, reject) {
      ddb.get(params, function(err, data) {
        if (err) {
          reject("Error getting task", err);
        }
        resolve(data.Item);
      });
    }
  );
}

function getStatus() {

  var tableName = 'Display-' + process.env.ENV;
  var params = {
    TableName: tableName,
  };
  
  return new Promise(
    function (resolve, reject) {
      ddb.scan(params, function(err, data) {
        console.log(data);
        if (err) {
          reject("Error getting status", err);
        }
        resolve(data.Items);
      });
    }
  );
}

function getAllData() {

  var tableName = 'Secrets-' + process.env.ENV;
  var params = {
    TableName: tableName,
  };
  
  return new Promise(
    function (resolve, reject) {
      ddb.scan(params, function(err, data) {
        if (err) {
          reject("Error getting data", err);
        }
        resolve(data.Items);
      });
    }
  );
}

module.exports.getTasks = getTasks;
module.exports.getStatus = getStatus;
module.exports.getAllData = getAllData;
module.exports.updateTask = updateTask;
module.exports.initializeUser = initializeUser;