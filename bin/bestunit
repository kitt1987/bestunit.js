#!/usr/bin/env node

'use strict';

function defineOptions() {
	var ArgumentParser = require('argparse').ArgumentParser;
	var parser = new ArgumentParser({
		version: '0.0.0',
		addHelp: true,
		description: 'Unit testing framework'
	});

	parser.addArgument(
		['-d', '--dir'], {
			help: 'test case directory'
		}
	);

	parser.addArgument(
		['-f', '--file'], {
			help: 'test case file'
		}
	);

	parser.addArgument(
		['-tc', '--testCase'], {
			help: 'Test case of some files'
		}
	);

	return parser.parseArgs();
}

require('../lib/test_loop').run(defineOptions());