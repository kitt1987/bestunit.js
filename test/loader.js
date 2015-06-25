'use strict';

var loader = require('../lib/test_loader');
var assert = require('../lib/assertion');

process.on('uncaughtException', function(err) {
	console.error(err.stack);
});

function validateSimpleTest(tc) {
	assert.ok(tc);
	assert.nothing(tc.setUp);
	assert.nothing(tc.tearDown);
	assert.nothing(tc.option);
	assert.isString(tc.name);
	assert.isA(tc.testCase, Function);
}

function validateFullTest(tc) {
	assert.ok(tc);
	assert.isA(tc.setUp, Function);
	assert.isA(tc.tearDown, Function);
	assert.ok(tc.option);
	assert.isA(tc.testCase, Function);
}

module.exports = {
	loadSingleTest: function() {
		loader({
			file: 'example/a_testcase'
		});

		validateSimpleTest(loader.next());
	},
	loadMoreTests: function() {
		loader({
			file: 'example/more_tests'
		});

		var i = 0;
		while (i < 3) {
			validateSimpleTest(loader.next());
			++i;
		}

		assert.nothing(loader.next());
	},
	loadNestedTests: function() {
		loader({
			file: 'example/nested_test'
		});

		var i = 0;
		while (i < 8) {
			validateSimpleTest(loader.next());
			++i;
		}

		assert.nothing(loader.next());
	},

	loadWithSetUpAndTearDown: function() {
		loader({
			file: 'example/setup_teardown'
		});

		var i = 0;
		while (i < 6) {
			validateFullTest(loader.next());
			++i;
		}

		i = 0;
		while (i < 2) {
			validateSimpleTest(loader.next());
			++i;
		}

		assert.nothing(loader.next());
	},
	loadADir: function() {
		loader({
			dir: 'example/folder'
		});

		var i = 0;
		while (i < 9) {
			validateSimpleTest(loader.next());
			++i;
		}

		assert.nothing(loader.next());
	},
	loadATestCase: function() {
		loader({
			file: 'example/nested_test',
			testCase: 'simpleCase2'
		});

		validateSimpleTest(loader.next());
		assert.nothing(loader.next());
	}
};