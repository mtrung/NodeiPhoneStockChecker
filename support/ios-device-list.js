var iosDevices = require('ios-device-list');

// var deviceTypes = iosDevices.deviceTypes();
// console.log(deviceTypes);
// console.log(devices.length);

function printIDevices(iDevices) {
	console.log('--- # items: ' + iDevices.length);
	iDevices.forEach(phone => {
		console.log(phone.Model + 'LL/A ' + phone.Generation + ' ' + phone.Storage + ' ' + phone.Color + ' ' + phone.Variant
			+ ' ' + phone.Model);
	});
}


// var iphone7plus = iosDevices.deviceByGeneration("iPhone 7 Plus", "iphone", {
// 	contains: true,
// 	caseInsensitive: true
// });
// printIDevices(iphone7plus);

var iphone7plus = iosDevices.deviceByModel("MNR02", "iphone", {
	contains: true,
	caseInsensitive: true
});
printIDevices(iphone7plus);
