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
	if (typeof o === 'function') {
		return o.toString();
	}

	return util.inspect(o);
}

BuAssertionError.prototype = Object.create(Error.prototype);
BuAssertionError.prototype.constructor = BuAssertionError;

exports.ok = function(e) {
	if (!e) {
		throw new BuAssertionError('' + $(e) + ' should be true');
	}
};

exports.nothing = function(e) {
	if (e) {
		throw new BuAssertionError('' + $(e) + ' should be nothing');
	}
};

exports.fail = function(e) {
	if (e) {
		throw new BuAssertionError('' + $(e) + ' should be false');
	}
};

exports.empty = function(obj) {
	if (obj.length !== 0) {
		throw new BuAssertionError('' + $(obj) + ' should be empty');
	}
}

exports.notEmpty = function(obj) {
	if (obj.length === 0) {
		throw new BuAssertionError('' + $(obj) + ' should be not empty');
	}
}


exports.isA = function(o, c) {
	if (!(o instanceof c)) {
		throw new BuAssertionError('' + $(o) + ' should be a ' + $(c));
	}
};

exports.isString = function(s) {
	if (typeof s !== 'string') {
		throw new BuAssertionError('' + $(s) + ' should be String');
	}
};

exports.eq = function(a, b) {
	if (a !== b) {
		throw new BuAssertionError('' + $(a) + ' === ' + $(b));
	}
};

exports.ne = function(a, b) {
	if (a === b) {
		throw new BuAssertionError('' + $(a) + ' !== ' + $(b));
	}
};

exports.gt = function(a, b) {
	if (a <= b) {
		throw new BuAssertionError('' + $(a) + ' > ' + $(b));
	}
};

exports.ge = function(a, b) {
	if (a < b) {
		throw new BuAssertionError('' + $(a) + ' >= ' + $(b));
	}
};

exports.lt = function(a, b) {
	if (a >= b) {
		throw new BuAssertionError('' + $(a) + ' < ' + $(b));
	}
};

exports.le = function(a, b) {
	if (a > b) {
		throw new BuAssertionError('' + $(a) + ' <= ' + $(b));
	}
};

exports.throws = function(b, err) {
	var catched = false;
	try {
		b();
	} catch (e) {
		if (err) {
			catched = (e instanceof err);
		} else {
			catched = true;
		}
	} finally {
		if (!catched) {
			throw new BuAssertionError('Error should be thrown from ' + $(b));
		}
	}
};