'use strict';

var requestPromise = require('request-promise');
var models = require("./iphone-models.js");
var NodeCache = require("node-cache");
var notify = require("./notify.js");
var config = require("./config.js");
var StockItem = require("./stock-item.js");

/**
 * Cache to stop messages being sent about stock on every request. If a message was already sent in last x seconds, it wont be sent again
 */
var notificationsSentCache = new NodeCache({
  stdTTL: 28800,// 8 hr
  checkperiod: 0
});

/**
 * Begin the process to check the stock, then recursively calls itself asyncronously to check the stock again after interval time
 * @param {object} stores - flattend associative array of stores. Store code as the key, and the store name as the value
 */
function getStock(userSession, callback) {
  if (validateWantedModels(userSession.modelsWanted)) {
    if (userSession.storesWanted) {
      if (!config.interval) {
        getStockRequest(userSession, callback);
      } else {
        getStockRequest(userSession, callback)
          .delay(config.interval)
          .then(function () {
            process.nextTick(function () {
              getStockRequest(userSession, callback);
            }); //nexttick to stop memory leaking in recursion, force async
          });
      }
    } else {
      requestPromise(config.storesRequest)
        .then(function (resultStores) {
          console.log("Downloaded stores list");
          var storesFlattend = [];
          resultStores.stores.forEach(function (store) {
            //storesFlattend[store.storeNumber] = store.storeName;
            storesFlattend.push(store.storeNumber);
          });

          //notify.sendProwlMessage("Stores list has been successfully downloaded, stock checker will now start. This is a test prowl message to preview the message you will get when stock arrives", 2);

          userSession.storesWanted = storesFlattend;
          getStock(userSession, callback);
        })
        .catch(function (err) {
          reportError("Error downloading stores " + err);
          callback([]);
        });

    }
  } else {
    reportError("No valid models");
  }
}

/**
 * Makes a single call to the stock url to check the stock.
 * @param {object} stores - flattend associative array of stores. Store code as the key, and the store name as the value
 */
function getStockRequest(userSession, callback) {
  console.log("models wanted: " + userSession.modelsWanted.length);
  console.log("stores wanted: " + userSession.storesWanted.length);
  console.log("showAll: " + userSession.showAll);

  return requestPromise(config.stockRequest)
    .then(function(resultStock) {
      var storesWithStock = processStoreListResult(resultStock, userSession);
      console.log("--- " + storesWithStock.length);
      callback(storesWithStock);
    })
    .catch(function(err) {
      reportError("Error downloading stock list " + err);
      callback([]);
    });
}

/**
 * Once stock is retrieved from the stock url, checks the stock to see if it has any models you're interested in
 * @param {object} stores - flattend associative array of stores. Store code as the key, and the store name as the value
 * @param {object} stock - parsed json retreived from the stock url
 */
function processStoreListResult(resultStock, userSession, shouldNotify) {
  var stockItemList = [];
  var unfoundModels = {}; //where the model code doesnt exist

  // Object.keys(resultStock).forEach(function(storeCode) {
  //   var storeName = stores[storeCode];
  //   if (storeName == undefined) {
  //     return; //skip non-stores
  //   }
  //   processSingleStoreResult(storeCode, resultStock, storesWithStock, unfoundModels, modelsWanted, userSession.showAll);
  // });
  
  userSession.storesWanted.forEach(storeCode => {
    let inStockStore = resultStock[storeCode];
    if (inStockStore) {
      processSingleStoreResult(storeCode, inStockStore, stockItemList, unfoundModels, userSession);
    }
  });

  if (shouldNotify) {
    notify.sendStockMessage(stockItemList);
    sendUnfoundModelsMessage(unfoundModels);
  }
  
  return stockItemList;
}

/**
 * For a single store (represented by storeCode) checks that stores stock to see if it has a model you are interested in
 * @param {string} store - The store name (e.g. Covent Garden)
 * @param {object} storeCode - the store code (e.g. R232)
 * @param {object} stock - parsed json retreived from the stock url
 * @param {array} storesWithStock - A string array, stores that have stock of the model you are interest in will be added to this array (in the format of a user displayable string message saying x store has stock of y)
 * @param {object} unfoundModels - associative array, models that were not found in the stores stock list will be added to this so that you can report back to the user that they may have a typo or non-existant model
 */
function processSingleStoreResult(storeCode, inStockStore, stockItemList, unfoundModels, userSession) {
  //console.log('- Store: ' + storeCode);
  userSession.modelsWanted.forEach(function (modelCode) {
    let availStatus = inStockStore[modelCode]; 
    if (availStatus == undefined) {
      unfoundModels[modelCode] = 1;
    } else {      
      if (availStatus === "ALL") {
        let stockItem = new StockItem(storeCode, modelCode, availStatus);
        let timeStamp = addStoreToNotification(modelCode, storeCode);
        stockItem.timeStamp = timeStamp;
        stockItemList.push(stockItem);
        // console.log('+'+ stockItem.modelName);
      } else {
        if (userSession.showAll) {
        let stockItem = new StockItem(storeCode, modelCode, availStatus);
        stockItemList.push(stockItem);
        // console.log('- '+userSession.showAll + ': '+ stockItem.modelName);
      }}
    }
  });
}

/**
 * Send the notification about models that were not found in any of the store lists (e.g. due to issue with store feed)
 * @param {object} unfoundModels an associative array of model codes as keys where the model was not found (e.g. {"B35643" : anything, "FKGJF" : anything} )
 */
function sendUnfoundModelsMessage(unfoundModels) {
  var unfound = "";
  for (var key in unfoundModels) {
    if (unfoundModels.hasOwnProperty(key)) {
      unfound += key + " ";
    }
  }
  if (unfound.length > 0) {
    reportError("Some of the models you requested were not found in the store stock list, there is either a problem with the store feed, or you have picked the wrong models for the country you chose " + unfound);
  }

}


/**
 * Adds a store to the list of stores with stock, when stock of a model is found
 * First of all checks the cache to see if a notification was already sent about this store and this model, if so, this will skip adding that model to the notification and do nothing.
 * @param {array} storesWithStock - A string array, stores that have stock of the model you are interest in (and no message was already sent recently) will be added to this array (in the format of a user displayable string message saying x store has stock of y).
 * @param {string} store - The store name (e.g. Covent Garden)
 * @param {string} modelCode - The model found in stock
 * @param {object} storeCode - the store code (e.g. R232) the stock was found in
 */
function addStoreToNotification(modelCode, storeCode) {
  //check if it is in the cache to say a notification was already recently sent about this store
  var key = storeCode + modelCode;
  var cached = notificationsSentCache.get(key);
  // if new
  if (cached == undefined) {
    cached = Date.now();
    notificationsSentCache.set(key, cached);
  }
  return cached;
}

/**
 * Logs an error on the console and by sending a prowl message
 * @param {string} error the error message
 */
function reportError(error) {
  var message = "iPhone Stock Checker Error: " + error;
  console.log("ERROR:" + message);
  notify.sendProwlMessage(message, 0);
}

/**
 * Validates the models you have asked for are in the valid models list (models) and the list isnt empty;
 */
function validateWantedModels(modelsWanted) {
  //no wanted models
  if (!modelsWanted || modelsWanted.length === 0) {
    reportError("You have not set up any wanted models in the modelsWanted property. Polling has NOT started! ");
    return false;
  }

  //no models config
  if (models.models.length == 0) {
    reportError("There are no models in the models config, this is a configuration error. Polling has NOT started! ");
    return false;
  }

  //check validity of modelsWanted
  var invalidModels = [];
  modelsWanted.forEach(function(model) {
    if (models.models[model] == undefined) {
      invalidModels.push(model);
    }
  });

  if (invalidModels.length > 0) {
    var message = "Invalid models were found in your modelsWanted property. Polling has NOT started! ";
    message += invalidModels.reduce(function(result, current) {
      return result += " " + current
    }, "");
    reportError(message);
    return false
  }

  return true;
}

module.exports = {
    getStock: getStock,
}
