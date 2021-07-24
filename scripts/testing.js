#! /usr/bin/env node

const { execSync } = require('child_process');
const { writeFileSync, mkdirSync, rmSync } = require('fs');
const pkg = require('../package.json');
const { path, ifEmptyDelete } = require('./shared');

pkg.scripts.test = 'yarn run prestart && jest';
pkg.scripts['test:coverage'] = 'yarn run prestart && jest --coverage';

writeFileSync(path('package.json'), JSON.stringify(pkg, null, 4));
writeFileSync(
	path('jest.config.js'),
`module.exports = {
	verbose: true,
	moduleFileExtensions: ['ts', 'js'],
	preset: 'ts-jest',
	testEnvironment: 'node',
	coverageDirectory: 'coverage',
	testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
	collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
};`);

mkdirSync(path('tests'));
console.log('Installing packages... do not quit.');
execSync(`yarn add -D ts-jest @types/jest typescript jest ${pkg.devDependencies.eslint && !pkg.devDependencies['eslint-plugin-jest'] ? 'eslint-plugin-jest' : ''}`);
rmSync(path('scripts', 'testing.js'));
ifEmptyDelete();
