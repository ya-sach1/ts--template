#! /usr/bin/env node

const { execSync } = require('child_process');
const { writeFileSync, rmSync } = require('fs');
const { path, ifEmptyDelete } = require('./shared');
const pkg = require('../package.json');

pkg.scripts.documentation = 'typedoc --theme nord src/ --out documentation/';

writeFileSync(path('package.json'), JSON.stringify(pkg, null, 4));
console.log('Installing packages... do not quit.');
execSync('yarn add -D typedoc');
rmSync(path('scripts', 'documentation.js'));
ifEmptyDelete();
