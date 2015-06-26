'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

exports.DirGroup = DirGroup;
exports.ObjectGroup = ObjectGroup;

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
			return k !== 'setUp' && k !== 'tearDown' && k !== 'option';
		});
		this.nextI = 0;
	}

	if (this.group.setUp && typeof this.group.setUp !== 'function') {
		throw new Error('setUp must be a function!');
	}

	if (this.group.tearDown && typeof this.group.tearDown !== 'function') {
		throw new Error('tearDown must be a function!');
	}

	if (this.group.option && typeof this.group.option !== 'object') {
		throw new Error('option must be a simple object!');
	}

	_.map(['setUp', 'tearDown', 'option'], function(f) {
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