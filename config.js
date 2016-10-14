module.exports = {

	colors: ['Black', 'Gold'],
	carriers: ['Verizon', 'T-Mobile'],
stores: {'R144': 'NorthPark Center', 'R008': 'Willow Bend', 'R302':'Stonebriar', 'R042': 'Knox Street', 'R151':'Southlake Town Square'},
/**
 * The interval to wait in betwen polls (in milliseconds)
 */
interval : 30*60*1000, //milliseconds

/**
 * array of the models you want. Use the models list below if you arent sure of the model numbers
 */
modelsWanted : ["MNQW2LL/A","MNR12LL/A","MNR32LL/A","MN5T2LL/A","MN5V2LL/A"],

/**
 * prowl API. Used for push notifications. Sign up at https://www.prowlapp.com and download the app to your phone
 * If you dont set this up you won't get push notifications, you will only get console output
 */
prowlApiKey : "", //add your API key

/**
 * The url to the list of stores. These are different for different countries
 * CHANGE THIS IF YOU ARE NOT IN THE UK
 * Verify the json works by accessing the URL yourself in the browser and make sure it looks sensible
 * US version is https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/stores.json
 */
storesJsonUrl : "https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/stores.json",

/**
 * The url to the list of stock. These are different for different countries
 * CHANGE THIS IF YOU ARE NOT IN THE UK
 * Verify the json works by accessing the URL yourself in the browser and make sure it looks sensible
 * US version is https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/availability.json
 */
stockJsonUrl : "https://reserve.cdn-apple.com/US/en_US/reserve/iPhone/availability.json",

}
