'use strict';

const Suite = require('../suite');

const DATA = Buffer.from('Tue Oct 24 07:21:20 2017 us=467764 /sbin/ip addr \
	add dev tun0 10.8.1.141/25 broadcast 10.8.1.255\n');
const MARK_STR = '\n';
const MARK_BUF = Buffer.from(MARK_STR);
const MARK_CHAR = MARK_STR.charCodeAt();

function indexOf(x, xs, off) {
  const l = xs.length;
  var i = off;
  while (i < l && xs[i] !== x) i++;
  return (i < l) ? i : -1;
}

const suite = new Suite()
  .add('string', function() {
    return DATA.indexOf(MARK_STR, 0);
  })
  .add('string+enc', function() {
    return DATA.indexOf(MARK_STR, 0, 'utf8');
  })
  .add('buffer', function() {
    return DATA.indexOf(MARK_BUF, 0);
  })
  .add('char', function() {
    return DATA.indexOf(MARK_CHAR, 0);
  })
  .add('pure', function() {
    return indexOf(MARK_CHAR, DATA, 0);
  });

exports.description = 'indexOf benchmark';
exports.run = suite.run.bind(suite);

// run if invoked directly
if (__filename === process.argv[1]) exports.run().then(() => process.exit(0));
