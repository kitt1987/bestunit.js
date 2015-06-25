'use strict';

var Loader = require('../lib/test_loader');

function validateSimpleTest(tc, t) {
	t.ok(tc);
	t.nothing(tc.setUp);
	t.nothing(tc.tearDown);
	t.nothing(tc.option);
	t.isString(tc.name);
	t.isA(tc.testCase, Function);
}

function validateFullTest(tc, t) {
	t.ok(tc);
	t.isA(tc.setUp, Function);
	t.isA(tc.tearDown, Function);
	t.ok(tc.option);
	t.isA(tc.testCase, Function);
}

module.exports = {
	loadSingleTest: function(t) {
		var loader = new Loader({
			file: 'example/a_testcase'
		});

		validateSimpleTest(loader.next(), t);
		t.done();
	},
	loadMoreTests: function(t) {
		var loader = new Loader({
			file: 'example/more_tests'
		});

		var i = 0;
		while (i < 3) {
			validateSimpleTest(loader.next(), t);
			++i;
		}

		t.nothing(loader.next());
		t.done();
	},
	loadNestedTests: function(t) {
		var loader = new Loader({
			file: 'example/nested_test'
		});

		var i = 0;
		while (i < 8) {
			validateSimpleTest(loader.next(), t);
			++i;
		}

		t.nothing(loader.next());
		t.done();
	},

	loadWithSetUpAndTearDown: function(t) {
		var loader = new Loader({
			file: 'example/setup_teardown'
		});

		var i = 0;
		while (i < 6) {
			validateFullTest(loader.next(), t);
			++i;
		}

		i = 0;
		while (i < 2) {
			validateSimpleTest(loader.next(), t);
			++i;
		}

		t.nothing(loader.next());
		t.done();
	},
	loadADir: function(t) {
		var loader = new Loader({
			dir: 'example/folder'
		});

		var i = 0;
		while (i < 9) {
			validateSimpleTest(loader.next(), t);
			++i;
		}

		t.nothing(loader.next());
		t.done();
	},
	loadATestCase: function(t) {
		var loader = new Loader({
			file: 'example/nested_test',
			testCase: 'simpleCase2'
		});

		validateSimpleTest(loader.next(), t);
		t.nothing(loader.next());
		t.done();
	}
};