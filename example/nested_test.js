'use strict';

module.exports = {
	simpleCase1: function(t) {
		t.done();
	},

	testGroup1: {
		testGroup3: {
			tg3C1: function(t) {
				t.done();
			}
		},

		tg1Case1: function(t) {
			t.done();
		},

		tg1Case2: function(t) {
			t.done();
		}
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
	},
};