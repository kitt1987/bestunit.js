'use strict';

var Loader = require('./test_loader');
var DirGroup = Loader.DirGroup;
var ObjectGroup = Loader.ObjectGroup;

exports = module.exports = TestLoop;

function TestLoop(options) {
  this.groups = [];
  this.dirs = [];
  this.reporter = new(require('./report').CliReport)(options.debug);
  if (options.dir) {
    options.dir.forEach(dir => this.dirs.push(new DirGroup(dir)));
  } else {
    if (options.file) {
      if (!options.file.endsWith('.js'))
        options.file += '.js';

      if (options.testCase) {
        this.dirs.push(new ObjectGroup(options.file, options.testCase));
      } else {
        this.dirs.push(new ObjectGroup(options.file));
      }
    } else {
      this.reporter.error('You should choose some tests. Or type -h.');
      return;
    }
  }

  Object.assign(this, require('./assertion'));
  process.on('exit', () => {
    if (this.groups.length > 0) {
      this.reporter.error('\nSome tests are waiting.You may forget to call done in the last test or its before* or after* function.');
    }
  });

  process.on('uncaughtException', err => {
    this.reporter.error(err);
    this.shutdown(err);
  });
}

TestLoop.prototype.next = function() {
  var tc = [];
  while (!this.tc && (this.groups.length > 0 || this.dirs.length > 0)) {
    if (this.groups.length === 0 && !this.breaks) {
			this.reporter.runDirectory(this.dirs[0].name);
      this.groups.push(this.dirs[0]);
      this.dirs.shift();
      var $_$ = this.groups[0];
      this.reporter.debug('Load DirGroup ' + $_$.name);
      if ($_$.before) {
        this.reporter.debug('Run ' + $_$.name + '.before');
        return $_$.before.bind(null, this);
      }
    }

    if (this.groups.length === 0) return;

    var lastGroup = this.groups[this.groups.length - 1];
    var next = lastGroup.next();
    if (!next || this.breaks) {
      this.groups.pop();
      if (lastGroup.after) {
        this.reporter.debug('Run ' + lastGroup.name + '.after');
        tc.push(lastGroup.after.bind(null, this));
      }

      if (this.groups.length > 0 && this.groups[this.groups.length - 1].afterEach) {
        this.reporter.debug('Run ' + lastGroup.name + '.afterEach');
        lastGroup = this.groups[this.groups.length - 1];
        tc.push(lastGroup.afterEach.bind(null, this));
      }

      if (tc.length === 0) continue;
      this.tc = tc;
      break;
    }

    if (next.next) {
      if (lastGroup.beforeEach) {
        this.reporter.debug('Run ' + lastGroup.name + '.beforeEach');
        tc.push(lastGroup.beforeEach.bind(null, this));
      }

      this.reporter.debug('Load Group ' + next.name);
      this.groups.push(next);
      if (next.before) {
        this.reporter.debug('Run ' + next.name + '.before');
        tc.push(next.before.bind(null, this));
      }

      if (tc.length === 0) continue;
      this.tc = tc;
      break;
    }

    this.reporter.debug('Load TestCase ' + next.name);
    if (next.before) {
      this.reporter.debug('Run ' + next.name + '.before');
      tc.push(next.before.bind(null, this));
    }

    this.reporter.runTest(next.name);
    tc.push(next.run.bind(null, this));

    if (next.after) {
      this.reporter.debug('Run ' + next.name + '.after');
      tc.push(next.after.bind(null, this));
    }

    this.tc = tc;
  }

  if (this.tc) {
    var runner = this.tc[0];
    this.tc.shift();
    if (this.tc.length === 0) {
      this.reporter.doneTest();
      this.tc = null;
    }

    return runner;
  }
};

TestLoop.prototype.done = function() {
  var call = this.next();
  if (call) {
    call();
  } else {
    if (this.breaks) throw this.breaks;
		this.reporter.doneAll();
  }
};

TestLoop.prototype.start = function() {
  this.done();
};

TestLoop.prototype.shutdown = function(err) {
  this.reporter.debug('Failure arises. Will shutdown!');
  this.breaks = err;
  this.done();
};
