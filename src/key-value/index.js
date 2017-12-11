'use strict';

const Suite = require('../suite');
const map = new Map();
const obj = {};
const strings = [];
const TWO_32 = 0x100000000;
const TWO_16 = 0x10000;
const ARRAY_LENGTH = TWO_16;

function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i=0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function randomNumber() {
  return Math.floor(Math.random() * ARRAY_LENGTH);
};

for (let i=0; i<ARRAY_LENGTH; i++) {
  strings.push(randomString());
}

const suite = new Suite()
  .add('map set key-value same key', function() {
    for (let i=0; i < 1000; i++) {
      map.set('same-key', strings[randomNumber()]);
    }
  })
  .add('obj set key-value same key', function() {
    for (let i=0; i < 1000; i++) {
      obj['same-key'] = strings[randomNumber()];
    }
  }) 
  .add('map set key-value', function() {
    for (let i=0; i < 1000; i++) {
      map.set(strings[randomNumber()], strings[randomNumber()]);
    }
  })
  .add('obj set key-value', function() {
    for (let i=0; i < 1000; i++) {
      obj[strings[randomNumber()]] = strings[randomNumber()];
    }
  }) 
  
exports.description = 'set key-value';
exports.run = suite.run.bind(suite);
  
// run if invoked directly     
if (__filename === process.argv[1]) exports.run().then(() => process.exit(0));
