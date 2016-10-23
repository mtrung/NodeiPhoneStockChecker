
var requestPromise = require('request-promise');
var config = require("./config.js");

/**
 * Chunks an array.
 * Returns an array of arrays, all of max n size
 */
function chunk (array, size) {
  return array.reduce(function (res, item, index) {
    if (index % size === 0) { res.push([]); }
    res[res.length-1].push(item);
    return res;
  }, []);
}

/**
 * Send the notification about models found stock (if any - if no models are found no notification will be displayed, and 
 * "No Stock" is diplayed in the console)
 * Sends at most 50 stores at a time, so chunks into multiple messages if there are more stores with stock.
 * @param {array} storesWithStock an array of messages about stock found in stores, e.g. ["model x was found in y", "model z was found in y"]. This will be used as the notificaiton text
 */
function sendStockMessage(storesWithStock) {
  if (!config.prowlApiKey || config.prowlApiKey.length === 0) {
    return;
  }

  if (storesWithStock.length > 0) {
    var chunks = chunk(storesWithStock, 50);

    chunks.forEach(function (storesChunk) {
      var message = "";
      storesChunk.forEach(function (storeMessage) {
        message += storeMessage + "\n";
      });

      console.log(message);
      sendProwlMessage(message, 2);
    });
  } else {
    console.log("No New Stock");
  }
}

/**
 * Sends a message over prowl to the user if theprowlApiKey variable is set up.
 * Does nothing if no api key exists
 * @param {string} message The message to send. This is the exact text that will get sent as the notification
 * @param {int} priority A priority between -2 (least priority) an 2 (most priority) as defined in the prowl API
 */
function sendProwlMessage(message, priority) {
  if (config.prowlApiKey && config.prowlApiKey.length > 0) {
    var prowlApiRequest = {
      method: 'POST',
      uri: 'https://api.prowlapp.com/publicapi/add',
      form: {
        apikey: config.prowlApiKey,
        priority: priority,
        application: "Stock Checker",
        "event": "iPhone 7 Stock",
        description: message,
      },
    };

    requestPromise(prowlApiRequest)
      .then(function() {
        console.log("push notification sent");
      })
      .catch(function(err) {
        console.log("Error sending push notification" + err);
      });
  } else {
    //console.log("Prowl message skipped due to no api key");
  }
}

module.exports = {
  sendProwlMessage: sendProwlMessage,
  sendStockMessage: sendStockMessage
};
