'use strict';

var express = require('express');
var router = express.Router();

var userSession = require("./user-session.js");
var request = require('./request.js');
var models = require("./iphone-models.js");
var StockItem = require("./stock-item.js");
var DeviceModel = require("./device-model.js");

router.get('/', function (req, res, next) {
  request.getStock(userSession, resultArray => {
    res.render('index', {
      resultArray: resultArray,
      headers: StockItem.headers()
    });
  });
});

router.get('/models', function (req, res, next) {
  var resultArray = [];
  userSession.modelsWanted.forEach((modelCode) => {
    let deviceModel = new DeviceModel(modelCode);
    resultArray.push(deviceModel);
  });

  res.render('models', {
    headers: DeviceModel.headers(),
    resultArray: resultArray
  });
});

// function routeHandler(req, res, next) {
//   var requestType = req.params.requestType;
//   if (!requestType || requestType.length === 0) requestType = 'all';

//   if (requestType === 'SAM' || requestType === 'RMM') {
//     req.session.projectName = requestType;
//     res.render('error', {
//       projectName: requestType,
//       message: req.session.projectName + " project selected"
//     });
//     return;
//   }

//   var projectName = req.session.projectName || 'SAM';
//   jira.searchByType(requestType, projectName, resultArray => {
//     if (resultArray) {
//       res.render('index', {
//         projectName: projectName,
//         jiraIssues: resultArray,
//         filterType: req.params.requestType
//       });
//     } else {
//       next(new Error("No issue found"));
//     }
//   });
// }

module.exports = router;
