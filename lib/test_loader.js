'use strict';

var path = require('path');
var fs = require('fs');

exports.DirGroup = DirGroup;
exports.ObjectGroup = ObjectGroup;

var methods = ['before', 'after', 'beforeEach', 'afterEach'];

function DirGroup(dir) {
  var propsFile = dir + '.js';
  try {
    this.groups = fs.readdirSync(dir).map(f => path.join(dir, f));
    this.name = path.join(path.relative(process.cwd(), dir), path.basename(dir, '.js'));
    this.nextI = 0;
    fs.statSync(propsFile);
    var props = require(path.relative(path.dirname(module.filename), propsFile));
		methods.map(m => this[m] = props[m]);
  } catch (e) {}
}

DirGroup.prototype.next = function() {
  if (this.nextI < this.groups.length) {
    var next = this.groups[this.nextI++];
    var state = fs.statSync(next);
    if (!state) throw new Error('Fail to access ' + next);

    if (state.isDirectory()) {
			this.groups = this.groups.filter((each) => each !== next + '.js');
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
      this.name = path.join(path.relative(process.cwd(), fileOrName), path.basename(modulePath, '.js'));
      this.theCase = testCaseOrObj;
      if (!this.group[testCaseOrObj]) throw new Error('Testcase ' + testCaseOrObj + ' is not exist');
    } else {
      this.group = testCaseOrObj;
      this.name = fileOrName;
    }
  } else {
    var modulePath = path.relative(path.dirname(module.filename), fileOrName);
    this.group = require(modulePath);
    this.name = path.join(path.relative(process.cwd(), fileOrName), path.basename(modulePath, '.js'));
  }

  if (!this.theCase) {
    this.keys = Object.keys(this.group).filter(k => methods.every(m => m !== k));
    this.nextI = 0;
  }

	methods.forEach(m => {
		if (this.group[m] && typeof this.group[m] !== 'function')
			throw new Error(m + ' of ' + this.name + ' must be a function!');
	});

  methods.map(f => this[f] = this.group[f]);
}

ObjectGroup.prototype.next = function() {
  if (this.theCase) {
    var theCase = this.group[this.theCase];
    if (typeof theCase !== 'function') {
      var r = new ObjectGroup(this.theCase, theCase);
      this.theCase = null;
      return r;
    }

    var r = {
			before: this.beforeEach,
			after: this.afterEach,
      name: this.name + '.' + this.theCase,
      run: theCase
    };

    this.theCase = null;
    return r;
  }

  if (this.nextI !== undefined && this.keys && this.nextI < this.keys.length) {
    var name = this.keys[this.nextI++];
    var next = this.group[name];
    if (typeof next !== 'function') {
      next = new ObjectGroup(this.name + '.' + name, next);
      return next;
    }

    return {
			before: this.beforeEach,
			after: this.afterEach,
      name: this.name + '.' + name,
      run: next
    };
  }
};
