'use strict';

var appleStores = require('./apple-stores.js');

class AppleStore {
    static headers() {
        return ['Store number', 'Store name'];
    }

	constructor(storeCode) {
		this._storeCode = storeCode;
	}
	
	get storeNumber() {
		return this._storeCode;
	}
	get storeName() {
		return appleStores[this._storeCode];
	}
}

module.exports = AppleStore;