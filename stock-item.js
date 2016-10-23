'use strict';

var userSession = require("./user-session.js");
var models = require("./iphone-models.js");

class StockItem {
	constructor(storeCode, modelCode, avail) {
		this._storeCode = storeCode;
		this._modelCode = modelCode;
		this._avail = avail;
	}

	get avail() {
		return this._avail;
	}
	get timeStamp() {
		return this._timeStamp;
	}
	set timeStamp(timeStamp) {
		this._timeStamp = timeStamp;
	}
	
	get storeCode() {
		return this._storeCode;
	}
	get modelCode() {
		return this._modelCode;
	}
	get storeName() {
		return userSession.stores[this._storeCode];
	}
	get modelName() {
		return models.getDisplayStr(this._modelCode);
	}
}

module.exports = StockItem;
