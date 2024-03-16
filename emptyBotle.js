var Column = require('./column');
var columns = require('./level');


function emptyBotle(){
	let emptyBtl = columns.findIndex(
		btl => btl.length ==0
	);
	
	if (emptyBtl == undefined){
		
		return null
	}
	return emptyBtl;
}

module.exports = emptyBotle;
