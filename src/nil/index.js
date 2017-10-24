'use strict';

const Suite = require('../suite');
    
const suite = new Suite()
  .add('nil', function() {});

exports.description = 'reference benchmark';
exports.run = suite.run.bind(suite); 
  
// run if invoked directly
if (__filename === process.argv[1]) exports.run().then(() => process.exit(0));
