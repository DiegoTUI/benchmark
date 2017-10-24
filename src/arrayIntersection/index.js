'use strict';

const under = require('underscore');
const Suite = require('../suite');

const ARR1 = [6, 8, 4, 5, 2, 1500, -6, -9];
const ARR2 = [4600, 2, 54, -98, 42, 8799, 0, -6];

const filter = (arr1, arr2) => arr1.filter((n) => arr2.includes(n));
const sets = (arr1, arr2) => 
	[...new Set(arr1)].filter(x => new Set(arr2).has(x));
    
const suite = new Suite()      
  .add('filter', function() {
		return filter(ARR1, ARR2);
	})
	.add('underscore', function() {
		return under.intersection(ARR1, ARR2);
	})
	.add('sets', function() {
		return sets(ARR1, ARR2);
	});   
  
exports.description = 'Array intersection benchmark';
exports.run = suite.run.bind(suite); 
  
// run if invoked directly     
if (__filename === process.argv[1]) exports.run().then(() => process.exit(0));
