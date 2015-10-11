'use strict';

module.exports = {
	before: function(t) {
		t.nothing(t.before);
		t.before = true;
		t.done();
	},
	after: function(t) {
		t.ok(t.before);
		t.before = null;
		t.done();
	},
	beforeEach: function(t) {
		t.ok(t.before);
		t.nothing(t.beforeEach);
		t.beforeEach = true;
		t.done();
	},
	afterEach: function(t) {
		t.ok(t.before);
		t.ok(t.beforeEach);
		t.beforeEach = null;
		t.done();
	},
	g1: {
		before: function(t) {
			t.ok(t.before);
			t.ok(t.beforeEach);
			t.nothing(t.beforeG1);
			t.beforeG1 = true;
			t.done();
		},
		after: function(t) {
			t.ok(t.before);
			t.ok(t.beforeEach);
			t.ok(t.beforeG1);
			t.beforeG1 = null;
			t.done();
		},
		beforeEach: function(t) {
			t.ok(t.before);
			t.ok(t.beforeEach);
			t.ok(t.beforeG1);
			t.nothing(t.beforeEachOfG1);
			t.beforeEachOfG1 = true;
			t.done();
		},
		afterEach: function(t) {
			t.ok(t.before);
			t.ok(t.beforeEach);
			t.ok(t.beforeG1);
			t.ok(t.beforeEachOfG1);
			t.beforeEachOfG1 = null;
			t.done();
		},
		g2: {
			before: function(t) {
				t.ok(t.before);
				t.ok(t.beforeEach);
				t.ok(t.beforeG1);
				t.ok(t.beforeEachOfG1);
				t.nothing(t.beforeG2);
				t.beforeG2 = true;
				t.done();
			},
			after: function(t) {
				t.ok(t.before);
				t.ok(t.beforeEach);
				t.ok(t.beforeG1);
				t.ok(t.beforeEachOfG1);
				t.ok(t.beforeG2);
				delete t.beforeG2;
				t.done();
			},
			beforeEach: function(t) {
				t.ok(t.before);
				t.ok(t.beforeEach);
				t.ok(t.beforeG1);
				t.ok(t.beforeEachOfG1);
				t.ok(t.beforeG2);
				t.nothing(t.beforeEachOfG2);
				t.beforeEachOfG2 = true;
				t.done();
			},
			afterEach: function(t) {
				t.ok(t.before);
				t.ok(t.beforeEach);
				t.ok(t.beforeG1);
				t.ok(t.beforeEachOfG1);
				t.ok(t.beforeG2);
				t.ok(t.beforeEachOfG2);
				t.beforeEachOfG2 = null;
				t.done();
			},
			t: function(t) {
				t.ok(t.before);
				t.ok(t.beforeEach);
				t.ok(t.beforeG1);
				t.ok(t.beforeEachOfG1);
				t.ok(t.beforeG2);
				t.ok(t.beforeEachOfG2);
				t.done();
			},
			t2: function(t) {
				t.ok(t.before);
				t.ok(t.beforeEach);
				t.ok(t.beforeG1);
				t.ok(t.beforeEachOfG1);
				t.ok(t.beforeG2);
				t.ok(t.beforeEachOfG2);
				t.done();
			},
		},
		t: function(t) {
			t.ok(t.before);
			t.ok(t.beforeEach);
			t.ok(t.beforeG1);
			t.ok(t.beforeEachOfG1);
			t.nothing(t.beforeG2);
			t.done();
		},
		t2: function(t) {
			t.ok(t.before);
			t.ok(t.beforeEach);
			t.ok(t.beforeG1);
			t.ok(t.beforeEachOfG1);
			t.nothing(t.beforeG2);
			t.done();
		}
	},
	t: function(t) {
		t.ok(t.before);
		t.nothing(t.beforeG1);
		t.nothing(t.beforeEachOfG1);
		t.done();
	},
	t2: function(t) {
		t.ok(t.before);
		t.nothing(t.beforeG1);
		t.nothing(t.beforeEachOfG1);
		t.done();
	}
};
