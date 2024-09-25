var Column = require('./column');
var columns = require('./level');

var abstract = function(columns2){
	for(let col of columns2){
		console.log(col.content);
	} 
}
module.exports = abstract;
