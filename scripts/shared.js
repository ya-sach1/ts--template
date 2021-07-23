const { readdirSync, rmdirSync, rmSync } = require('fs');
const { resolve } = require('path');

module.exports.path = (...args) => resolve(process.cwd(), ...args);
module.exports.ifEmptyDelete = () => {
	const path = this.path('scripts');
	const files = readdirSync(path);
	if (files.length === 1) {
		rmSync(this.path(path, 'shared.js'));
		rmdirSync(path);
	}
};
