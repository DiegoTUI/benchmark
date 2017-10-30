'use strict';

const Suite = require('../suite');
const NodeLru = require('lru-cache');
const LutierLru = require('lutier/ds/cache/lru').LRUCache;

const nodeLru = NodeLru(50);
const lutierLru = new LutierLru().maxSize(50);

function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i=0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const addKeys = new Suite()
  .add('node add keys', function() {
    for (let i=0; i < 1000; i++) {
      nodeLru.set(randomString(), randomString())
    }
  })
  .add('lutier add keys', function() {
    for (let i=0; i < 1000; i++) {
      lutierLru.set(randomString(), randomString())
    }
  });

const getKeys = new Suite()
  .add('node get keys', function() {
    for (let i=0; i < 1000; i++) {
      nodeLru.get(randomString())
    }
  })
  .add('lutier add keys', function() {
    for (let i=0; i < 1000; i++) {
      lutierLru.get(randomString())
    }
  });


  
exports.description = 'LRU caches';
exports.run = async () => {
  await addKeys.run();
  await getKeys.run();
};
  
// run if invoked directly     
if (__filename === process.argv[1]) exports.run().then(() => process.exit(0));
