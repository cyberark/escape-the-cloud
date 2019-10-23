/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')
var dynamo = require('./dynamo.js')

AWS.config.update({ region: process.env.TABLE_REGION });

let tableName = "Secrets";
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const tasksPath = "/tasks";
const usersPath = "/users";
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/**********************
 * get methods *
 **********************/

app.get(tasksPath, function(req, res) {
  var body = req.query;
  dynamo.getTasks(body.userId).then(data => {
    Object.keys(data).map(function(objectKey) {
      delete data[objectKey].Secret;
      delete data[objectKey].StartTimeStamp;
      delete data[objectKey].EndTimeStamp;
    });
    res.json(data);
  }).catch((err)=> {
    console.log(err);
  })
});

/****************************
* post methods *
****************************/

app.post(tasksPath, function(req, res) {
  var body = req.body;
  dynamo.getTasks(body.userId).then(data => {
    // Check if task is done
    if (data[body.taskId.Done]) {
      console.log("Task is done");
      Object.keys(data).map(function(objectKey) {
        delete data[objectKey].Secret;
        delete data[objectKey].StartTimeStamp;
        delete data[objectKey].EndTimeStamp;
      });
      res.json(data);
    } else {
      if (data[body.taskId].Secret == body.secret) {
        dynamo.updateTask(body.userId, body.taskId, 'Done', true).then(() => {
          dynamo.updateTask(body.userId, body.taskId, 'EndTimeStamp', new Date().getTime()).then(() => {
            dynamo.getTasks(body.userId).then(data => {
              Object.keys(data).map(function(objectKey) {
                delete data[objectKey].Secret;
                delete data[objectKey].StartTimeStamp;
                delete data[objectKey].EndTimeStamp;  
              });
              res.json(data);
            });
          })
        });
      } else {
        console.log("Incorrect password");
        Object.keys(data).map(function(objectKey) {
          delete data[objectKey].Secret;
          delete data[objectKey].StartTimeStamp;
          delete data[objectKey].EndTimeStamp;
        });
        res.json(data);
      }
    }
  });
});

/**********************
 * patch methods *
 **********************/

app.patch(tasksPath, function(req, res) {
  var body = req.body;
  dynamo.getTasks(body.userId).then(data => {
    if (data[body.taskId].StartTimeStamp === 0) {
      dynamo.updateTask(body.userId, body.taskId, 'StartTimeStamp', new Date().getTime()).then(() => {
        dynamo.getTasks(body.userId).then(data => {
          Object.keys(data).map(function(objectKey) {
            delete data[objectKey].Secret;
            delete data[objectKey].StartTimeStamp;
            delete data[objectKey].EndTimeStamp;
          });
          res.json(data);
        });
      })
    } else {
      console.log("Task already started");
      Object.keys(data).map(function(objectKey) {
        delete data[objectKey].Secret;
        delete data[objectKey].StartTimeStamp;
        delete data[objectKey].EndTimeStamp;
      });
      res.json(data);
    }
  }).catch((err)=> {
    console.log(err);
  })
});

/**********************
 * put methods *
 **********************/

app.put(usersPath, function(req, res) {
  var body = req.body;
  dynamo.initializeUser(body.userId, body.schemaObj).then((result) => {
    res.json(result);
  }).catch((err)=> {
    res.json(err);
  });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app