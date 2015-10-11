To be the best unit test framework for node.js .

All afterEach function of failed Test Case and after function of Test Group which
contains it will be called before assertion thrown.

# ChangeLog

# Installation
    npm install -g bestunit.js

# Run all tests
    bu -h

# Test Group and Test Case
BU only defines Test Case and Test Group which includes Test Cases.
A Test Group could be a javascript object which contains some functions or a
directory contains some files.Test Groups can be nested.
You can define 4 methods for a Test Group other than Test Cases, which are before,
after, beforeEach, afterEach. before/after will be called before/after running Test Group.
beforeEach/afterEach will be called before/after each Test Case in the Test Group.
