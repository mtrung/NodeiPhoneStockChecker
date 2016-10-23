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
  stdTTL: 300,
  checkperiod: 120
});

/**
 * Begin the process to check the stock, then recursively calls itself asyncronously to check the stock again after interval time
 * @param {object} stores - flattend associative array of stores. Store code as the key, and the store name as the value
 */
function getStock(userSession, callback) {
  var stores = userSession.stores;
  if (validateWantedModels(userSession.modelsWanted)) {
    if (stores) {
      console.log("# of stores: " + Object.keys(stores).length);
      if (!config.interval) {
        getStockRequest(stores, userSession.modelsWanted, callback);
      } else {
        getStockRequest(stores, userSession.modelsWanted, callback)
          .delay(config.interval)
          .then(function () {
            process.nextTick(function () {
              getStockRequest(stores, userSession.modelsWanted, callback);
            }); //nexttick to stop memory leaking in recursion, force async
          });
      }
    } else {
      requestPromise(config.storesRequest)
        .then(function (stores) {
          console.log("Downloaded stores list");
          var storesFlattend = {};
          stores.stores.forEach(function (store) {
            storesFlattend[store.storeNumber] = store.storeName;
          });

          notify.sendProwlMessage("Stores list has been successfully downloaded, stock checker will now start. This is a test prowl message to preview the message you will get when stock arrives", 2);

          userSession.stores = storesFlattend;
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
function getStockRequest(stores, modelsWanted, callback) {
  return requestPromise(config.stockRequest)
    .then(function(resultStock) {
      //console.log("---");
      var storesWithStock = processStoreListResult(resultStock, stores, modelsWanted);
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
function processStoreListResult(resultStock, stores, modelsWanted) {
  var storesWithStock = [];
  var unfoundModels = {}; //where the model code doesnt exist

  Object.keys(resultStock).forEach(function(storeCode) {
    var storeName = stores[storeCode];
    if (storeName == undefined) {
      return; //skip non-stores
    }
    processSingleStoreResult(storeCode, resultStock, storesWithStock, unfoundModels, modelsWanted);
  });

  notify.sendStockMessage(storesWithStock);
  sendUnfoundModelsMessage(unfoundModels);
  return storesWithStock;
}

/**
 * For a single store (represented by storeCode) checks that stores stock to see if it has a model you are interested in
 * @param {string} store - The store name (e.g. Covent Garden)
 * @param {object} storeCode - the store code (e.g. R232)
 * @param {object} stock - parsed json retreived from the stock url
 * @param {array} storesWithStock - A string array, stores that have stock of the model you are interest in will be added to this array (in the format of a user displayable string message saying x store has stock of y)
 * @param {object} unfoundModels - associative array, models that were not found in the stores stock list will be added to this so that you can report back to the user that they may have a typo or non-existant model
 */
function processSingleStoreResult(storeCode, stock, storesWithStock, unfoundModels, modelsWanted) {
  //console.log('- Store: ' + storeCode);
  var storeStock = stock[storeCode];

  modelsWanted.forEach(function (modelCode) {
    if (storeStock[modelCode] == undefined) {
      unfoundModels[modelCode] = 1;
    } else {
      //console.log(' ' + storeStock[modelCode] + ': \t' + modelCode + ' ' + models.getDisplayStr(modelCode));
      let availStatus = storeStock[modelCode];
      let stockItem = new StockItem(storeCode, modelCode, availStatus);
      
      if (availStatus === "ALL") {
        timeStamp = addStoreToNotification(storesWithStock, modelCode, storeCode);
        stockItem.timeStamp = timeStamp;
      }

      storesWithStock.push(stockItem);
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
function addStoreToNotification(storesWithStock, modelCode, storeCode) {
  //check if it is in the cache to say a notification was already recently sent about this store
  var key = storeCode + modelCode;
  var cached = notificationsSentCache.get(key);
  // if new
  if (cached == undefined) {
    var nowStr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    notificationsSentCache.set(key, nowStr);
    cached = notificationsSentCache.get(key);
    //storesWithStock.push(store + " has " + models.getDisplayStr(modelCode));
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
    validateWantedModels: validateWantedModels,
    reportError: reportError
}
