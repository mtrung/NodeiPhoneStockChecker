

var requestPromise = require('request-promise');
// var Promise = require("bluebird");
var config = require("./config.js");
var request = require('./request.js');


var storesRequest = {
  uri: config.storesJsonUrl,
  json: true
};

var stockRequest = {
  uri: config.stockJsonUrl,
  json: true
};

//Go!
if (request.validateWantedModels(config.modelsWanted)) {
  if (config.stores) {
    request.getStock(config.stores, stockRequest, config.modelsWanted);
    return;
  }

  requestPromise(storesRequest)
    .then(function(stores) {
      console.log("Downloaded stores list");
      var storesFlattend = {};
      stores.stores.forEach(function(store) {
        storesFlattend[store.storeNumber] = store.storeName
      });

      request.sendProwlMessage("Stores list has been successfully downloaded, stock checker will now start. This is a test prowl message to preview the message you will get when stock arrives", 2);

      request.getStock(storesFlattend, stockRequest, config.modelsWanted)
    })
    .catch(function(err) {
      request.reportError("Error downloading stores " + err);
    });
}
