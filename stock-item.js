'use strict';

var appleStores = require("./apple-stores.js");
var DeviceModel = require("./device-model.js");

class StockItem {
    static headers() {
        return ['Store', 'Model', 'Available', 'Available since'];
    }

	constructor(storeCode, modelCode, avail) {
		this._storeCode = storeCode;
		// this._modelCode = new DeviceModel(modelCode);
		this._deviceModel = new DeviceModel(modelCode);
		this._avail = avail;
	}

	get avail() {
		return this._avail;
	}
	isAvail() {
		return this._avail === 'ALL';
	}
	get timeStamp() {
		if (!this._timeStamp) return this._timeStamp; 
		return new Date(this._timeStamp).toLocaleTimeString();
	}
	set timeStamp(timeStamp) {
		this._timeStamp = timeStamp;
	}
	
	get storeCode() {
		return this._storeCode;
	}
	get storeName() {
		return appleStores[this._storeCode];
	}
	get modelCode() {
		return this._deviceModel.modelCode;
	}
	get modelName() {
		return this._deviceModel.modelName;
	}
	buyUrl() {
		let storage = this._deviceModel.storage + 'gb-';
		let color = this._deviceModel.color.toLowerCase().replace(/ /, '-');
		let carrier = this._deviceModel.carrier.toLowerCase().replace(/[-&]/, '');
		let display = this._deviceModel.display.toLowerCase().replace(/ /g, '-');
		//http://www.apple.com/shop/buy-iphone/iphone-7/5.5-inch-display-256gb-rose-gold-att
		return 'http://www.apple.com/shop/buy-iphone/iphone-7/'+display+'-'+storage+color+'-'+carrier;
	}
}

module.exports = StockItem;
