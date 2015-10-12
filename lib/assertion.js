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

function typeIs(v, t) {
	if (typeof v !== t) throw new BuAssertionError('' + $(v) + ' should be ' + $(t));
	return v;
}

BuAssertionError.prototype = Object.create(Error.prototype);
BuAssertionError.prototype.constructor = BuAssertionError;

/**
 * Assertion
 * @exports Assertion
 */
module.exports = {
	/**
	 * Assertion fails if (!e)
	 * @example t.ok(true);
	 * @param {any} e
	 * @returns {any} e
	 */
	ok: function(e) {
		if (!e) throw new BuAssertionError('' + $(e) + ' should be true');
		return e;
	},

	/**
	 * Assertion fails if (e)
	 * @example t.nothing(false);
	 * @param {any} e
	 * @returns {any} e
	 */
	nothing: function(e) {
		if (e) throw new BuAssertionError('' + $(e) + ' should be nothing');
		return e;
	},

	/**
	 * Assertion fails if (e)
	 * @example t.fail(e);
	 * @param {any} e
	 * @returns {any} e
	 */
	fail: function(e) {
		if (e) throw new BuAssertionError('' + $(e) + ' should be false');
		return e;
	},

	/**
	 * Assertion fails if (obj.length !== 0)
	 * @example t.empty([]);
	 * @param {(Array|String)} obj
	 * @returns {(Array|String)} obj
	 */
	empty: function(obj) {
		if (obj.length !== 0) throw new BuAssertionError('' + $(obj) + ' should be empty');
		return obj;
	},

	/**
	 * Assertion fails if (obj.length === 0)
	 * @example t.notEmpty([]);
	 * @param {(Array|String)} obj
	 * @returns {(Array|String)} obj
	 */
	notEmpty: function(obj) {
		if (obj.length === 0) throw new BuAssertionError('' + $(obj) + ' should be not empty');
		return obj;
	},

	/**
	 * Assertion fails if (!(o instanceof c))
	 * @example t.isA([], Array);
	 * @param {any} o
	 * @param {any} c
	 * @returns {any} o
	 */
	isA: function(o, c) {
		if (!(o instanceof c)) throw new BuAssertionError('' + $(o) + ' should be a ' + $(c));
		return o;
	},

	/**
	 * Assertion fails if (typeof v !== t)
	 * @example t.typeIs([], Object);
	 * @param {any} v
	 * @param {any} t
	 * @returns {any} v
	 */
	typeIs,

	/**
	 * Assertion fails if (typeof s !== 'string')
	 * @example t.isString('t.isString');
	 * @param {String} s
	 * @returns {String} s
	 */
	isString: function(s) {
		return typeIs(s, 'string');
	},

	/**
	 * Assertion fails if (a !== b)
	 * @example t.eq(false, false);
	 * @param {any} a
	 * @param {any} b
	 * @returns {any} a
	 */
	eq: function(a, b) {
		if (a !== b) throw new BuAssertionError('' + $(a) + ' === ' + $(b));
		return a;
	},

	/**
	 * Assertion fails if (a === b)
	 * @example t.ne(0, 1);
	 * @param {any} a
	 * @param {any} b
	 * @returns {any} a
	 */
	ne: function(a, b) {
		if (a === b) throw new BuAssertionError('' + $(a) + ' !== ' + $(b));
		return a;
	},

	/**
	 * Assertion fails if (a <= b)
	 * @example t.gt(1, 0);
	 * @param {Number} a
	 * @param {Number} b
	 * @returns {Number} a
	 */
	gt: function(a, b) {
		typeIs(a, 'number');
		typeIs(b, 'number');
		if (a <= b) throw new BuAssertionError('' + $(a) + ' > ' + $(b));
		return a;
	},

	/**
	 * Assertion fails if (a < b)
	 * @example t.ge(1, 1);
	 * @param {Number} a
	 * @param {Number} b
	 * @returns {Number} a
	 */
	ge: function(a, b) {
		typeIs(a, 'number');
		typeIs(b, 'number');
		if (a < b) throw new BuAssertionError('' + $(a) + ' >= ' + $(b));
		return a;
	},

	/**
	 * Assertion fails if (a >= b)
	 * @example t.lt(1, 2);
	 * @param {Number} a
	 * @param {Number} b
	 * @returns {Number} a
	 */
	lt: function(a, b) {
		typeIs(a, 'number');
		typeIs(b, 'number');
		if (a >= b) throw new BuAssertionError('' + $(a) + ' < ' + $(b));
		return a;
	},

	/**
	 * Assertion fails if (a > b)
	 * @example t.le(1, 1);
	 * @param {Number} a
	 * @param {Number} b
	 * @returns {Number} a
	 */
	le: function(a, b) {
		typeIs(a, 'number');
		typeIs(b, 'number');
		if (a > b) throw new BuAssertionError('' + $(a) + ' <= ' + $(b));
		return a;
	},

	/**
	 * Assertion fails if nothing thrown from f()
	 * @example t.throws(() => t.lt(2, 1), Object), f() must contains at most 1 assertion will throw exceptions.
	 * @param {Function} f
	 * @returns {any} sth. f() returns
	 */
	throws: function(f, err) {
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
	},
};
