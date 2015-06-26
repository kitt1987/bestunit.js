'use strict';

module.exports = {
	setUp: function(t) {
		t.nothing(t.setUpG);
		t.setUpG = true;
		t.done();
	},
	tearDown: function(t) {
		t.ok(t.setUpG);
		delete t.setUpG;
		t.done();
	},
	g1: {
		setUp: function(t) {
			t.nothing(t.setUpG1);
			t.setUpG1 = true;
			t.done();
		},
		tearDown: function(t) {
			t.ok(t.setUpG1);
			delete t.setUpG1;
			t.done();
		},
		g2: {
			setUp: function(t) {
				t.nothing(t.setUpG2);
				t.setUpG2 = true;
				t.done();
			},
			tearDown: function(t) {
				t.ok(t.setUpG2);
				delete t.setUpG2;
				t.done();
			},
			t: function(t) {
				t.ok(t.setUpG);
				t.ok(t.setUpG1);
				t.ok(t.setUpG2);
				t.done();
			}
		},
		t: function(t) {
			t.ok(t.setUpG);
			t.ok(t.setUpG1);
			t.nothing(t.setUpG2);
			t.done();
		}
	},
	t: function(t) {
		t.ok(t.setUpG);
		t.nothing(t.setUpG1);
		t.nothing(t.setUpG2);
		t.done();
	}
};