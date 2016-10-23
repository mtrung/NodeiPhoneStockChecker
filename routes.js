'use strict';

var express = require('express');
var router = express.Router();

var userSession = require("./user-session.js");
var request = require('./request.js');
var models = require("./iphone-models.js");

router.get('/', function (req, res, next) {
  request.getStock(userSession, resultArray => {
    res.render('index', {
      resultArray: resultArray
    });
  });
});

router.get('/models', function (req, res, next) {
  var resultArray = [];
  userSession.modelsWanted.forEach((item) => {
    let model = models.getModel(item);
    let resultModel = {
      modelCode: item,
      modelName: models.getDisplayStr(item),
      color: model.c,
      carrier: model.p,
      storage: model.g
    };
    resultArray.push(resultModel);
  });

  res.render('models', {
      resultArray: resultArray,
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
