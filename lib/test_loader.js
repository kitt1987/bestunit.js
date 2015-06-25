'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

// start at a directory, a file or a test case
exports = module.exports = function(options) {
	this.groups = [];
	if (options.dir) {
		this.groups.push(new DirGroup(options.dir));
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
			// log something
		}
	}
};

exports.setUp = 'setUp';
exports.tearDown = 'tearDown';
exports.option = 'option';

exports.prototype.next = function() {
	while (this.groups.length > 0) {
		var group = this.groups[this.groups.length - 1];
		var next = group.next();
		if (next) {
			if (next instanceof DirGroup || next instanceof ObjectGroup) {
				this.groups.push(next);
			} else {
				var r = {};
				r[exports.setUp] = group[exports.setUp];
				r[exports.tearDown] = group[exports.tearDown];
				r[exports.option] = group[exports.option];
				r.name = _.map(this.groups, 'name').join('/') + '/' + next.name;
				r.testCase = next.call;
				return r;
			}
		} else {
			this.groups.pop();
		}
	}
};

function DirGroup(dir) {
	this.groups = _.map(fs.readdirSync(dir), function(f) {
		return path.join(dir, f);
	});
	this.name = path.basename(dir);
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

function ObjectGroup(fileOrName, testCaseOrObj) {
	if (testCaseOrObj) {
		if (typeof testCaseOrObj === 'string') {
			var modulePath = path.relative(path.dirname(module.filename), fileOrName);
			this.group = require(modulePath);
			this.name = path.basename(modulePath);
			this.theCase = testCaseOrObj;
			if (!this.group[testCaseOrObj]) {
				throw new Error('Testcase ' + testCaseOrObj + ' is not exist');
			}
		} else {
			this.group = testCaseOrObj;
			this.name = fileOrName;
		}
	} else {
		var modulePath = path.relative(path.dirname(module.filename), fileOrName);
		this.group = require(modulePath);
		this.name = path.basename(modulePath);
	}

	if (!this.theCase) {
		this.keys = _.filter(_.keys(this.group), function(k) {
			return k !== exports.setUp && k !== exports.tearDown && k !== exports.option;
		});
		this.nextI = 0;
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
}

ObjectGroup.prototype.next = function() {
	if (this.theCase) {
		var theCase = this.group[this.theCase];
		if (typeof theCase !== 'function') {
			var r = new ObjectGroup(this.theCase, theCase);
			delete this.theCase;
			return r;
		}

		var r = {
			name: this.theCase,
			call: theCase
		};

		delete this.theCase;
		return r;
	}

	if (!_.isUndefined(this.nextI) && !_.isUndefined(this.keys) && this.nextI < this.keys.length) {
		var name = this.keys[this.nextI++];
		var next = this.group[name];
		if (typeof next !== 'function') {
			next = new ObjectGroup(name, next);
			return next;
		}

		return {
			name: name,
			call: next
		};
	}
};