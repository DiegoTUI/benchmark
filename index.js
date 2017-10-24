'use strict';

const fs = require('fs');
const path = require('path');
const stdio = require('stdio');

const opts = stdio.getopt({
  tests: {key: 't', args: '*'
    , description: 'Test(s) you want to run. If empty, it runs all of them'}
});

const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs.readdirSync(source).map(i => path.join(source, i)).filter(isDirectory);
const intersection = (arr1, arr2) => arr1.filter((n) => arr2.includes(n));

const srcPath = path.resolve(__dirname, './src');
const nilTest = require(path.join(srcPath, 'nil'));
const includedTests = (opts.tests !== undefined
  ? (opts.tests instanceof Array ? opts.tests : [opts.tests])
  : [])
  .map(t => path.join(srcPath, t));

let tests = getDirectories(srcPath).filter(p => !p.includes('/nil'));
if (includedTests.length > 0) tests = intersection(tests, includedTests);
tests = tests.map(t => require(t));
tests.unshift(nilTest);

const main = async () => {
  for (let i=0; i< tests.length; i++) {
    console.info(tests[i].description);
    await tests[i].run();
  }
}

main();
