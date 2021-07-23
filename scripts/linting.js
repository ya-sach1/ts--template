#! /usr/bin/env node

const { execSync } = require('child_process');
const { writeFileSync, rmSync } = require('fs');
const { path, ifEmptyDelete} = require('./shared');
const pkg = require('../package.json');

pkg.scripts.lint = 'eslint . --ext .ts';
pkg.scripts['lint:fix'] = "yarn run lint --quiet --fix && echo -e '\\033[32mLinted.'";

writeFileSync(path('package.json'), JSON.stringify(pkg, null, 4));
writeFileSync(
	path('.eslintrc.js'),
	JSON.stringify(
		{
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 2019,
				sourceType: 'module',
			},
			extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
			rules: {},
		},
		null,
		4,
	),
);
writeFileSync(path('.eslintignore'), ['node_modules', 'build', 'coverage'].join('\n'));
console.log('Installing packages... do not quit.');
execSync(`yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-plugin-prettier eslint-config-prettier ${pkg.devDependencies['jest'] ? 'eslint-plugin-jest' : ''}`);
rmSync(path('scripts', 'linting.js'));
ifEmptyDelete();
