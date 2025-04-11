var startTime = new Date().getTime();
var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var doTheMove = require('./doTheMove');
var coppy = require('./coppy');
var CrissCross = require('./crissCross');
var lstOfMove = [];
var abstract = require('./abstract');

abstract(columns);

function isMonochrome(col2){
	console.log("is monochrome");
	let differentBallInCol = [... new Set(col2.content)];
	
	console.log(differentBallInCol);
	
	if(!Array.isArray(differentBallInCol)){
		console.log("monochrom error for the col");
		console.log(col2.content);
		return null
	}
	if(differentBallInCol.length >1){return false}
	
	else {return true}
}

function isFinish(columns2){
	for(let i=0;i<columns2.length;i++){
		console.log("i",i);
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

console.log(isFinish(columns));
