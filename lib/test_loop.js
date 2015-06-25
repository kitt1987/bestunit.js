'use strict';

var loader = require('./test_loader');
var assert = require('./assertion');
var _ = require('lodash');
var async = require('async');
var to = require('colors');

exports.run = function(options) {
	new TestLoop(options).start();
};

function TestLoop(options) {
	loader(options);
	_.assign(this, assert);
	process.on('exit', function() {
		if (loader.next()) {
			console.log('\n' + to.red('Some tests are waiting.You may forget to call done in the last test or its setUp or tearDown function.'));
		}
	});
}

function next() {
	if (!this.tc) {
		this.tc = loader.next();
		if (!this.tc) {
			console.log(to.green('==All tests are done=='));
			return;
		}

		if (this.tc[loader.option]) {
			this.option = this.tc[loader.option];
		}

		process.stdout.write(to.green('RUN TEST ') + '[' + this.tc.name + ']');
	}

	while (this.tc) {
		var r;
		if (this.tc[loader.setUp]) {
			r = this.tc[loader.setUp];
			delete this.tc[loader.setUp];
			return r.bind(this);
		}

		if (this.tc.testCase) {
			r = this.tc.testCase;
			delete this.tc.testCase;
			return r.bind(this);
		}

		if (this.tc[loader.tearDown]) {
			r = this.tc[loader.tearDown];
			delete this.tc[loader.tearDown];
			return r.bind(this);
		}

		console.log(to.green(' DONE'));
		this.tc = loader.next();
		if (!this.tc) {
			console.log(to.green('==All tests are done=='));
			return;
		}

		process.stdout.write(to.green('RUN TEST ') + '[' + this.tc.name + ']');
		if (this.tc[loader.option]) {
			this.option = this.tc[loader.option];
		} else if (this.option) {
			delete this.option;
		}
	}
}

TestLoop.prototype.done = function(output) {
	var call = next.apply(this);
	if (call) {
		call(this);
	}
};

TestLoop.prototype.start = function() {
	this.done();
};