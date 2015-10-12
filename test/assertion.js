'use strict';

module.exports = {
  logic: (t) => {
    t.fail(t.nothing(!t.ok(true)));
    t.isA(t.empty([]), Object);
    t.notEmpty([1]);
    t.typeIs(t.isString('abc'), 'string');
    t.ne(t.eq(0, 0), false);
    t.done();
  },
  arithmetic: (t) => {
    t.lt(t.le(t.lt(t.ge(t.ge(t.gt(10, 9), 10), 8), 11), 10), 12);
    t.done();
  },
  corner: (t) => {
    t.throws(() => t.ok(false), Object);
    t.throws(() => t.fail(true), Object);
    t.throws(() => t.empty([1]), Object);
    t.throws(() => t.notEmpty([]), Object);
    t.throws(() => t.isString([]), Object);
    t.throws(() => t.typeIs([], 'string'), Object);
    t.throws(() => t.eq([], 'string'), Object);
    t.throws(() => t.ne(0, 0), Object);
    t.throws(() => t.gt(1, 2), Object);
    t.throws(() => t.ge(1, 2), Object);
    t.throws(() => t.le(2, 1), Object);
    t.throws(() => t.lt(2, 1), Object);
    t.done();
  }
};
