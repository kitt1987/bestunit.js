'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

// start at a directory, a file or a test case
exports = module.exports = function(options) {
	exports.groups = [];
	if (options.dir) {
		exports.groups.push(new DirGroup(options.dir));
	} else {
		if (options.file) {
			if (options.testCase) {
				exports.groups.push(new ObjectGroup(options.file, options.testCase));
			} else {
				if (!_.endsWith(options.file, '.js')) {
					options.file += '.js';
				}

				exports.groups.push(new ObjectGroup(options.file));
			}
		} else {
			// log something
		}
	}
};

exports.setUp = 'setUp';
exports.tearDown = 'tearDown';
exports.option = 'option';

exports.next = function() {
	while (exports.groups.length > 0) {
		var group = exports.groups[exports.groups.length - 1];
		var next = group.next();
		if (next) {
			if (next instanceof DirGroup || next instanceof ObjectGroup) {
				exports.groups.push(next);
			} else {
				var r = {};
				r[exports.setUp] = group[exports.setUp];
				r[exports.tearDown] = group[exports.tearDown];
				r[exports.option] = group[exports.option];
				r.testCase = next;
				return r;
			}
		} else {
			exports.groups.pop();
		}
	}
};

function DirGroup(dir) {
	this.groups = _.map(fs.readdirSync(dir), function(f) {
		return path.join(dir, f);
	});
	this.nextI = 0;
}

DirGroup.prototype.next = function() {
	if (this.nextI < this.groups.length) {
		var next = this.groups[this.nextI++];
		var state = fs.statSync(next);
		if (!state) {
			throw new Error('Fail to access ' + next);
		}

		if (state.isDirectory()) {
			next = new DirGroup(next);
		} else {
			next = new ObjectGroup(next);
		}

		return next;
	}
};

function ObjectGroup(fileOrObj, testCase) {
	if (typeof fileOrObj === 'string') {
		this.group = require(path.relative(path.dirname(module.filename), fileOrObj));
	} else {
		this.group = fileOrObj;
	}

	if (this.group[exports.setUp] && typeof this.group[exports.setUp] !== 'function') {
		throw new Error('setUp must be a function!');
	}

	if (this.group[exports.tearDown] && typeof this.group[exports.tearDown] !== 'function') {
		throw new Error('tearDown must be a function!');
	}

	if (this.group[exports.option] && typeof this.group[exports.option] !== 'object') {
		throw new Error('option must be a simple object!');
	}

	_.map([exports.setUp, exports.tearDown, exports.option], function(f) {
		this[f] = this.group[f];
	}.bind(this));

	if (testCase) {
		this.theCase = this.group[testCase];
		if (!this.theCase) {
			throw new Error('Testcase ' + testCase + ' is not exist');
		}
	} else {
		this.keys = _.filter(_.keys(this.group), function(k) {
			return k !== exports.setUp && k !== exports.tearDown && k !== exports.option;
		});
		this.nextI = 0;
	}
}

ObjectGroup.prototype.next = function() {
	if (this.theCase) {
		var theCase = this.theCase;
		if (typeof this.theCase !== 'function') {
			theCase = new ObjectGroup(this.theCase);
		}

		delete this.theCase;
		return theCase;
	}

	if (!_.isUndefined(this.nextI) && !_.isUndefined(this.keys) && this.nextI < this.keys.length) {
		var next = this.group[this.keys[this.nextI++]];
		if (typeof next !== 'function') {
			next = new ObjectGroup(next);
		}
		return next;
	}
};