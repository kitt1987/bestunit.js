'use strict';

module.exports = {
	setUp: function(t) {
		t.done();
	},

	tearDown: function(t) {
		t.done();
	},

	option: {},

	simpleCase1: function(t) {
		t.done();
	},

	testGroup1: {
		testGroup3: {
			setUp: function(t) {
				t.done();
			},

			tg3C1: function(t) {
				t.done();
			},

			tearDown: function(t) {
				t.done();
			},

			option: {}
		},

		tg1Case1: function(t) {
			t.done();
		},

		tg1Case2: function(t) {
			t.done();
		},

		setUp: function(t) {
			t.done();
		},

		tearDown: function(t) {
			t.done();
		},

		option: {}
	},

	simpleCase2: function(t) {
		t.done();
	},

	simpleCase3: function(t) {
		t.done();
	},

	testGroup2: {
		tg2Case1: function(t) {
			t.done();
		},

		tg2Case2: function(t) {
			t.done();
		}
	}
};