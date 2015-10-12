To be the best unit test framework for node.js .

# ChangeLog
## v0.1.0
  1. Replace setUp and tearDown with before(Each) and after(Each).
  2. Setup ```before*``` and ```after*``` for a directory by adding a ```.js``` file with the same name.
  3. The -dd/--debug option.

# Installation
    npm install -g bestunit.js

# Run all tests
    bu -h
    bu -d /directory1/tests/placed -d /directory2/tests/placed
    bu -f /the/test/case
    bu -f /the/test/case -tc testCaseName

    -f will be ignored if -d is given.

# Promise
  1. Simplest assertion style.
  2. No more tests will be executed after assertion failed.
  3. All ```after*``` functions of the failed ```TestCase``` and its ```TestGroup``` hierarchy will be called after assertion failed.
  4. Feel free to save anything in the context and share then among all tests.

# TestGroup and TestCase
BU only defines ```TestCase``` and ```TestGroup``` which includes ```TestCase```s.
A ```TestGroup``` can be a javascript object or a directory.And it can be nested.
You can define 4 methods for a ```TestGroup```, which are before,after, beforeEach, afterEach. before/after will be called before/after running ```TestGroup```.
beforeEach/afterEach will be called before/after each ```TestCase```/```TestGroup``` in the ```TestGroup```.

# Assertion
  You can require any assertion 3rd-party module you like or just use intrinsics.

# How to
## Simplest
  Touch a js source file looks like:
  ```
  module.exports = {
  	simpleCase1: function(t) {
  		t.done();
  	},
    simpleCase2: function(t) {
  		t.done();
  	},
  };
  ```

  DO NOT forget to call ```t.done()``` when the case is done.

  ```t``` is an object and you can save anything into it to share them among all tests.

## Nested
  ```
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
  	},

  	simpleCase2: function(t) {
  		t.done();
  	},

  	testGroup2: {
  		tg2Case1: function(t) {
  			t.done();
  		},
  	},
  };
  ```
## With SetUps and TearDowns
  ```
  module.exports = {
  	before: function(t) {
      // Be called before any tests and beforeEach.
  		t.done();
  	},
  	after: function(t) {
      // Be called after all tests and afterEach.
  		t.done();
  	},
  	beforeEach: function(t) {
      // Be called before running g1, t and t2
  		t.done();
  	},
  	afterEach: function(t) {
      // Be called after running g1, t and t2
  		t.done();
  	},
  	g1: {
  		t: function(t) {
  			t.done();
  		},
  		t2: function(t) {
  			t.done();
  		}
  	},
  	t: function(t) {
  		t.done();
  	},
  	t2: function(t) {
  		t.done();
  	}
  };
  ```
## Directory
  [Example](https://github.com/kitt1987/bestunit.js/tree/master/example/folder)

  ```before*``` and ```after*``` of case.js will be applied to TestGroup defined by directory ```case```.

# Example
[Example1](https://github.com/kitt1987/bestunit.js/tree/master/example)

[Example2](https://github.com/kitt1987/bestunit.js/tree/master/test)
