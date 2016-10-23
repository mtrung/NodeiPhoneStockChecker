'use strict';

var models = require("./iphone-models.js");

class DeviceModel {
    static headers() {
        return ['Model code','Model','Color','GB','Carrier'];
    }

	constructor(modelCode) {
		this._modelCode = modelCode;
		this._modelObj = models.getModel(modelCode);
	}
	
	get modelCode() {
		return this._modelCode;
	}
	get modelName() {
		return models.getDisplayStr(this._modelCode);
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
}

module.exports = DeviceModel;
