var Column = require('./column');
var columns = require('../level');

var abstract = function(columns2){
	let i =0
	for(let col of columns2){
		console.log(i++,col.content);
	} 
}
module.exports = abstract;
