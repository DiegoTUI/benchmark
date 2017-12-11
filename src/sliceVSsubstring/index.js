
'use strict';

const Suite = require('../suite');

const N = 10000;
const STR = Array.apply(null, {length: N}).map(Number.call, Number).join('');
    
const suite = new Suite()      
  .add('slice', function() {
		for(let i = 0; i < STR.length; i++) STR.slice(i, i+1);
	})
	.add('substring', function() {
		for(let i = 0; i < STR.length; i++) STR.substring(i, i+1);
	})
	.add('substr', function() {
		for(let i = 0; i < STR.length; i++) STR.substr(i, 1);
	});   
  
exports.description = 'Slice vs substring vs substr';
exports.run = suite.run.bind(suite); 
  
// run if invoked directly     
if (__filename === process.argv[1]) exports.run().then(() => process.exit(0));
