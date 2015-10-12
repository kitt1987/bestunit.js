'use strict';

var util = require('util');
var colors = require('colors');

function BuAssertionError(m) {
	this.name = 'AssertionError';
	this.message = colors.red('AssertionError:' + m);
	Object.defineProperty(this, 'stack', {
		enumerable: false,
		writable: false,
		configurable: false,
		value: new Error(this.message).stack
	});
}

function $(o) {
	if (typeof o === 'function')
		return o.toString();

	return util.inspect(o);
}

BuAssertionError.prototype = Object.create(Error.prototype);
BuAssertionError.prototype.constructor = BuAssertionError;

/**
 * Assertion failed if (!e)
 * @name t.ok
 * @param {any} e - anything
 */
exports.ok = function(e) {
	if (!e) throw new BuAssertionError('' + $(e) + ' should be true');
	return e;
};

exports.nothing = function(e) {
	if (e) throw new BuAssertionError('' + $(e) + ' should be nothing');
	return e;
};

exports.fail = function(e) {
	if (e) throw new BuAssertionError('' + $(e) + ' should be false');
	return e;
};

exports.empty = function(obj) {
	if (obj.length !== 0) throw new BuAssertionError('' + $(obj) + ' should be empty');
	return obj;
};

exports.notEmpty = function(obj) {
	if (obj.length === 0) throw new BuAssertionError('' + $(obj) + ' should be not empty');
	return obj;
};

exports.isA = function(o, c) {
	if (!(o instanceof c)) throw new BuAssertionError('' + $(o) + ' should be a ' + $(c));
	return o;
};

exports.typeIs = function(v, t) {
	if (typeof v !== t) throw new BuAssertionError('' + $(v) + ' should be ' + $(t));
	return v;
};

exports.isString = function(s) {
	return exports.typeIs(s, 'string');
};

exports.eq = function(a, b) {
	if (a !== b) throw new BuAssertionError('' + $(a) + ' === ' + $(b));
	return a;
};

exports.ne = function(a, b) {
	if (a === b) throw new BuAssertionError('' + $(a) + ' !== ' + $(b));
	return a;
};

exports.gt = function(a, b) {
	exports.typeIs(a, 'number');
	exports.typeIs(b, 'number');
	if (a <= b) throw new BuAssertionError('' + $(a) + ' > ' + $(b));
	return a;
};

exports.ge = function(a, b) {
	exports.typeIs(a, 'number');
	exports.typeIs(b, 'number');
	if (a < b) throw new BuAssertionError('' + $(a) + ' >= ' + $(b));
	return a;
};

exports.lt = function(a, b) {
	exports.typeIs(a, 'number');
	exports.typeIs(b, 'number');
	if (a >= b) throw new BuAssertionError('' + $(a) + ' < ' + $(b));
	return a;
};

exports.le = function(a, b) {
	exports.typeIs(a, 'number');
	exports.typeIs(b, 'number');
	if (a > b) throw new BuAssertionError('' + $(a) + ' <= ' + $(b));
	return a;
};

exports.throws = function(f, err) {
	var catched = false;
	try {
		return f();
	} catch (e) {
		if (err) {
			catched = (e instanceof err);
		} else {
			catched = true;
		}
	} finally {
		if (!catched) {
			throw new BuAssertionError('Error should be thrown from ' + $(f));
		}
	}
};
