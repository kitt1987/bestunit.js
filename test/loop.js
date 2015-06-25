'use strict';

var loop = require('../lib/test_loop');

module.exports = {
	run: function() {
		loop.run({
			dir: 'example/folder'
		});
	}
}