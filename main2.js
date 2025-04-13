var startTime = new Date().getTime();
var Column = require('./column');
var columns = require('./level');
var doTheMove = require('./doTheMove');
var coppy = require('./coppy');
var abstract = require('./abstract');
var isFinish = require('./isFinish');
var step = require('./step2')

abstract(columns);
let lstOfMove =[];
let firstState = [columns,lstOfMove];
let lstOfStates = [firstState];


function doAllMove(state,lstCrissCross){
	//console.log("\n  do all move");
	let newState = [];
	
	
	for(way in lstCrissCross){
		if(way != lstCrissCross.length-1){
			newState = coppy(state);
			lstOfStates.push(newState)
		}else{
			newState = state;
		}
		doTheMove(newState,lstCrissCross[way]);
	}
}


for(state in lstOfStates){
	let thisState = lstOfStates[state];
	let [columns2,lstOfMove2] = thisState;
	
	let Step = step(columns2);

	console.log("\n\n\nthe solution");
	console.log("out",Step);
	
	doAllMove(thisState,Step);
	if(isFinish(columns2)){
		console.log("it's over");
		console.log("the solution:");
		console.log(lstOfMove2);
	}
}










