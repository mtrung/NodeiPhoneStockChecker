'use strict';

var express = require('express');
var router = express.Router();

var userSession = require("./user-session.js");
var request = require('./request.js');
var StockItem = require("./stock-item.js");
var DeviceModel = require("./device-model.js");
var AppleStore = require("./apple-store.js");

function init(req) {
  if (!req.session.showAll) {
    req.session.showAll = userSession.showAll;
  }
  if (!req.session.storesWanted || !Array.isArray(req.session.storesWanted)) {
    req.session.storesWanted = userSession.storesWanted;
  }
  // console.log(req.session.storesWanted);

  if (!req.session.modelsWanted) {
    req.session.modelsWanted = userSession.modelsWanted;
  }
}

router.get('/', function (req, res, next) {
  init(req);

  if (req.query.showAll) {  
    req.session.showAll = req.query.showAll === '1' ? true : false;
  }

  request.getStock(req.session, resultArray => {
    res.render('index', {
      resultArray: resultArray,
      headers: StockItem.headers(),
      timeStamp: new Date().toUTCString(),
      session: req.session
    });
  });
});

router.get('/models', function (req, res, next) {
  init(req);

  var resultArray = [];
  req.session.modelsWanted.forEach((modelCode) => {
    let deviceModel = new DeviceModel(modelCode);
    resultArray.push(deviceModel);
  });

  res.render('models', {
    headers: DeviceModel.headers(),
    resultArray: resultArray
  });
});

router.get('/applestores', function (req, res, next) {
  init(req);

  var resultArray = [];
  req.session.storesWanted.forEach((storeNumber) => {
    let appleStore =  new AppleStore(storeNumber);
    resultArray.push(appleStore);
  });

  res.render('applestores', {
    headers: AppleStore.headers(),
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
