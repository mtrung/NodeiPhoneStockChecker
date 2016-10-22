
var requestPromise = require('request-promise');
var prowlApiKey = "";

/**
 * Sends a message over prowl to the user if theprowlApiKey variable is set up.
 * Does nothing if no api key exists
 * @param {string} message The message to send. This is the exact text that will get sent as the notification
 * @param {int} priority A priority between -2 (least priority) an 2 (most priority) as defined in the prowl API
 */
function sendProwlMessage(message, priority) {
  if (this.prowlApiKey && this.prowlApiKey.length > 0) {
    var prowlApiRequest = {
      method: 'POST',
      uri: 'https://api.prowlapp.com/publicapi/add',
      form: {
        apikey: this.prowlApiKey,
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
	prowlApiKey: prowlApiKey
};
