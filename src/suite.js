'use strict';

class Suite {

  constructor() {
    this._suite = require('benchmark').Benchmark.Suite()
      .on('cycle', event => {
        console.info(String(event.target));
      });
  }

  add(name, fn) {
    this._suite.add(name, fn);
    return this;
  }

  run(finished) {
    return new Promise(ok => {
      this._suite.on('complete', () => {
        console.info('Fastest: ' + this._suite.filter('fastest').map('name'));
        ok();
      })
      .run({async: true});
    });    
  }
}

module.exports = Suite;
