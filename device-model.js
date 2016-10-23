'use strict';

var models = require("./iphone-models.js");

class DeviceModel {
    static headers() {
        return ['Model code','Model','Color','GB','Carrier','Display'];
    }

	constructor(modelCode) {
		this._modelCode = modelCode;
		this._modelObj = models.getModel(modelCode);
	}
	
	get modelCode() {
		return this._modelCode;
	}
	get modelName() {
		return 'iPhone 7+ ' + this._modelObj.g + 'gb ' + this._modelObj.c + ' ' + this._modelObj.p;
	}
	get color() {
		return this._modelObj.c;
	}
	get carrier() {
		return this._modelObj.p;
	}
	get storage() {
		return this._modelObj.g;
	}
	get display() {
		return '5.5 inch display';
	}
}

module.exports = DeviceModel;
