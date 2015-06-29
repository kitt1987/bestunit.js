'use strict';

var Loader = require('./test_loader');
var DirGroup = Loader.DirGroup;
var ObjectGroup = Loader.ObjectGroup;
var assert = require('./assertion');
var _ = require('lodash');
var async = require('async');
var to = require('colors');

exports.run = function(options) {
	exports.loop = new TestLoop(options);
	exports.loop.start();
};

process.on('uncaughtException', function(err) {
	if (exports.loop) {
		exports.loop.shutdown();
	}

	throw err;
});

function TestLoop(options) {
	this.groups = [];
	this.dirs = [];
	if (options.dir) {
		_.forEach(options.dir, function(dir) {
			this.dirs.push(new DirGroup(dir));
		}.bind(this));
	} else {
		if (options.file) {
			if (options.testCase) {
				this.groups.push(new ObjectGroup(options.file, options.testCase));
			} else {
				if (!_.endsWith(options.file, '.js')) {
					options.file += '.js';
				}

				this.groups.push(new ObjectGroup(options.file));
			}
		} else {
			console.error(to.red('You should choose some tests. Or type -h.'));
			return;
		}
	}

	_.assign(this, assert);
	process.on('exit', function() {
		if (this.groups.length > 0) {
			console.log('\n' + to.red('Some tests are waiting.You may forget to call done in the last test or its setUp or tearDown function.'));
		}
	}.bind(this));
}

function next() {
	while (this.groups.length > 0 || this.dirs.length > 0) {
		if (!this.tc) {
			while (this.groups.length > 0) {
				var group = this.groups[this.groups.length - 1];
				var next = group.next();
				if (next && !this.breaks) {
					if (next instanceof DirGroup || next instanceof ObjectGroup) {
						this.groups.push(next);
						if (group.setUp) {
							return group.setUp.bind(null, this);
						}
					} else {
						if (this.tc) {
							throw new Error('The last test case is running');
						}

						this.tc = {
							setUp: group.setUp,
							tearDown: group.tearDown,
							option: group.option,
							name: _.map(this.groups, 'name').join('/') + '/' + next.name,
							testCase: next.call
						};
						break;
					}
				} else {
					this.groups.pop();
					if (this.groups.length > 0) {
						group = this.groups[this.groups.length - 1];
						if (group.tearDown) {
							return group.tearDown.bind(null, this);
						}
					}
				}
			}
		}

		if (!this.tc) {
			if (this.dirs.length > 0) {
				this.groups.push(this.dirs[this.dirs.length - 1]);
				this.dirs.pop();
				continue;
			}

			console.log(to.green('==All tests are done=='));
			return;
		}

		var r;
		if (this.tc.setUp) {
			r = this.tc.setUp;
			delete this.tc.setUp;
			return r.bind(null, this);
		}

		if (this.tc.testCase) {
			process.stdout.write(to.green('RUN TEST ') + '[' + this.tc.name + ']');
			r = this.tc.testCase;
			delete this.tc.testCase;
			return r.bind(null, this);
		}

		if (this.tc.tearDown) {
			r = this.tc.tearDown;
			delete this.tc.tearDown;
			return r.bind(null, this);
		}

		console.log(to.green(' DONE'));
		delete this.tc;
	}
}

TestLoop.prototype.done = function() {
	var call = next.apply(this);
	if (call) {
		call();
	}
};

TestLoop.prototype.start = function() {
	this.done();
};

TestLoop.prototype.shutdown = function() {
	if (this.tc) {
		this.breaks = true;
		this.done();
	}
};