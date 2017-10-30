'use strict';

const Suite = require('../suite');
const map = new Map();
const obj = {};

function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i=0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const suite = new Suite()
  .add('map set key-value', function() {
    for (let i=0; i < 1000; i++) {
      map.set(randomString(), randomString())
    }
  })
  .add('obj set key-value', function() {
    for (let i=0; i < 1000; i++) {
      obj[randomString()] = randomString();
    }
  })  
  
exports.description = 'set key-value';
exports.run = suite.run.bind(suite);
  
// run if invoked directly     
if (__filename === process.argv[1]) exports.run().then(() => process.exit(0));
