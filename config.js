var storesRequest = {
  uri: 'https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/stores.json',
  json: true
};

var stockRequest = {
  uri: 'https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/availability.json',
  json: true
};

module.exports = {
	/**
	 * The interval to wait in betwen polls (in milliseconds)
	 */
	//interval: 30 * 60 * 1000, //milliseconds

	/**
	 * prowl API. Used for push notifications. Sign up at https://www.prowlapp.com and download the app to your phone
	 * If you dont set this up you won't get push notifications, you will only get console output
	 */
	prowlApiKey: "", //add your API key

	/**
	 * The url to the list of stores. These are different for different countries
	 * CHANGE THIS IF YOU ARE NOT IN THE UK
	 * Verify the json works by accessing the URL yourself in the browser and make sure it looks sensible
	 * US version is https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/stores.json
	 */
	storesRequest: storesRequest,
	/**
	 * The url to the list of stock. These are different for different countries
	 * CHANGE THIS IF YOU ARE NOT IN THE UK
	 * Verify the json works by accessing the URL yourself in the browser and make sure it looks sensible
	 * US version is https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/availability.json
	 */
	stockRequest: stockRequest
};
