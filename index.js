
var userSession = require("./user-session.js");
var request = require('./request.js');

//Go!
request.getStock(userSession, storesWithStock => {
	console.log(storesWithStock);
});
