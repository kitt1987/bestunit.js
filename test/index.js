'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

try {
	var tests = path.dirname(module.filename);
	_.forIn(fs.readdirSync(tests), function(f) {
		if (f === 'index.js')
			return;
		_.forOwn(require(path.join(tests, f)), function(v, k) {
			v();
		});
	});
} catch (e) {
	throw e;
}