'use strict';

var $ = require('colors');

exports.CliReport = CliReport;

function CliReport() {

}

CliReport.prototype.runTest = function(name) {
	process.stdout.write($.green('RUN TEST ') + '[' + name + ']');
}

CliReport.prototype.doneTest = function(name) {
	console.log($.green(' DONE'));
}

CliReport.prototype.doneAll = function() {
	console.log($.green('==All tests are done=='));
}

CliReport.prototype.error = function(err) {
	console.log($.yellow(err));
}

CliReport.prototype.log = function(log) {
	console.log($.yellow(log));
}