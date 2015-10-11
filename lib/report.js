'use strict';

var $ = require('colors');

exports.CliReport = CliReport;

function CliReport(debug) {
	this.dd = debug;
	this.caseRunning = false;
}
CliReport.prototype.runDirectory = function(name) {
	console.log($.green('RUN DIR ') + '[' + name + ']');
};

CliReport.prototype.runTest = function(name) {
	this.caseRunning = true;
	process.stdout.write($.green('RUN TEST ') + '[' + name + ']');
};

CliReport.prototype.doneTest = function() {
	if (!this.caseRunning) return;
	console.log($.green(' DONE'));
	this.caseRunning = false;
};

CliReport.prototype.doneAll = function() {
	console.log($.green('==All tests are done=='));
};

CliReport.prototype.error = function(err) {
	console.log($.yellow(err));
};

CliReport.prototype.log = function(log) {
	console.log($.yellow(log));
};

CliReport.prototype.debug = function(log) {
	if (!this.dd) return;
	console.log($.blue(log));
};
