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
let [columns3,lstOfMove3] = coppy(firstState);	//dumb way to coppy columns
let lstOfStates = [firstState];


function doAllMove(state,lstCrissCross){
	//console.log("\n  do all move");
	let newState = [];
	let output = [];
	
	
	for(way in lstCrissCross){
		if(way != lstCrissCross.length-1){
			newState = coppy(state);
			lstOfStates.push(newState)
		}else{
			newState = state;
		}
		doTheMove(newState,lstCrissCross[way]);
		output.push(newState)
	}
	return output
}

let nbEmptyBotle = 1;	//how mayn empty botle we use

for(let cycle=0;cycle <3; cycle++ ){

	let lstOfStates2 = [];
	
	console.log("main2",lstOfStates.length,"branche");
	
	for(state in lstOfStates){
		let thisState = lstOfStates[state];
		let [columns2,lstOfMove2] = thisState;
		
		if(state == lstOfStates.length -1){
			if(lstOfStates2.length ==0){	//if we are stuck with one botle
				nbEmptyBotle =2;
			}
		}
		
		if(isFinish(columns2)){
			console.log("\nit's over");
			abstract(columns3);
			console.log("the solution:");
			console.log(lstOfMove2);
			
  		    var end = new Date().getTime();	//timer
   			var time = end - startTime;
   			console.log(time/1000,"s");
			
			break;
		}
		
		let loop = step(columns2, nbEmptyBotle);
		nbEmptyBotle =1;

			abstract(columns3);
		console.log("\n\n\nthe loop");
		console.log(loop);
		
		let newState = doAllMove(thisState,loop);
		lstOfStates2 = lstOfStates2.concat(newState);	//add to the next cycle
	}
	
	if(lstOfStates2.length ==0){	//if we are stuck
		break
	}
	
	lstOfStates = lstOfStates2;
}









