var columns = require('./level');
var abstract = require('./abstract');

function isMonochrome(col2){
	let differentBallInCol = [... new Set(col2.content)];
	
	if(!Array.isArray(differentBallInCol)){
		console.log("monochrom error for the col");
		console.log(col2.content);
		return null
	}
	if(differentBallInCol.length >1){return false}
	
	else {
	return true}
}

function isFinish(columns2){
	for(let i=0;i<columns2.length;i++){
		let isMono = isMonochrome(columns2[i]);
		if(isMono == false){return false}
		
		if(isMono == null){
			console.log("isFinish error in the col",i);
			abstract(columns2);
			return
		}
	}
	return true
}

module.exports = isFinish
