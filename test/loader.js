'use strict';

var loader = require('../lib/test_loader');
var assert = require('../lib/assertion');

process.on('uncaughtException', function(err) {
	console.error(err.stack);
});

module.exports = {
	loadADir: function() {
		loader({
			dir:'cases'
		});

		var tc = loader.next();
		assert.ok(tc);
		assert.nothing(tc.setUp);
		assert.nothing(tc.tearDown);
		assert.nothing(tc.option);
		assert.isA(tc.testCase, Function);
	}
};