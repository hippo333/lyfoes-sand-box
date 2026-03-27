var startTime = new Date().getTime();
var column = require('../tools/column');
var getTheLevel = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');

var [raining,resetRaining] = require('./raining');
var [crissCross,resetCrissCross] = require('./crissCross');
var [capillarity,resetCapilarity] = require('./capillarity');
var [removeMidle,resetRemoveMidle] = require('./removeMidle');
var [whatIsBrocken,resetWhatIsBrocken] = require('./whatIsBrocken');


let lstOfMove = [];
let columns0 = [];
let state = [columns0,lstOfMove];

function emptyBotle(columns2){
	
	let emptyBtl = columns2.findIndex(
		btl => btl.isEmpty()
	)
	
	return emptyBtl
}

//addapte
function theOtherCol(col2){
	let [columns2,lstOfMove2] = state;

	let thisCol = columns2[col2];
	let theBall = thisCol.top();
	
	let otherCol = columns2.findIndex(
		oCol => columns2.indexOf(oCol) != col2
		&& !oCol.isEmpty()
		&& oCol.top() == theBall
		&& columns2[col2].bigBall + oCol.content.length <5
	);
	
	
	return otherCol
}




function isFinish(columns2){
	console.log("\nisFinish");
	let unfinishedCol = columns2.findIndex(
		cll => !cll.isEmpty()
		&& !cll.isFinish()	
	);
	console.log("unfinishedCol",columns2[3].nbMaxBall);
	
	if(unfinishedCol == -1){return true}
	else{return false}
}

function resetAll(){
	//console.log("resetAll");
	let nbMaxBall = columns0[0].content.length;
	resetCapilarity(nbMaxBall);
	resetRemoveMidle(nbMaxBall);
	resetCrissCross(nbMaxBall);
	resetRaining(nbMaxBall);
	resetWhatIsBrocken(nbMaxBall);
	
	columns0.map(x => x.nbMaxBall = nbMaxBall);
}

let history = [];
let maxCycle = 16;
function main(theLevel){
	console.log("main");
	
	let columns = getTheLevel(theLevel);
	columns0 = getTheLevel(theLevel);
	
	lstOfMove = [];
	state = [columns0,lstOfMove];
	history = [];
	let countOfFix = 0;
	
	
	
	resetAll();
	let lastFaill = null; //false if we rewind
	
	for(let cycle=0;cycle<=maxCycle;cycle++){
		console.log("cycle",cycle);
		abstract(columns0);
		
		if(cycle == maxCycle){throw Error("to Many Cycle");}
		
		let succes = false;
		if(!succes){succes= capillarity(state, lastFaill)}
		if(!succes){succes= removeMidle(state, lastFaill)}
		if(!succes){succes= crissCross(state, lastFaill)};
		if(!succes){succes= raining(state, lastFaill)}
		
		lastFaill = null;
		if(!succes){
			if(isFinish(columns0)){
				console.log("\nwe did it",theLevel);
				abstract(columns);
				console.log("lstOfMove",lstOfMove);
				console.log("history",history);
				return
			}else{
				console.log("\nfail at",cycle);
				console.log("lstOfMove",lstOfMove);
				abstract(columns0);
				
				lastFaill = history[history.length -1][0];
				whatIsBrocken(state,history);
				countOfFix++;
				console.log("countOfFix",countOfFix);
				console.log("history",history);
				
				//throw Error("can't move animore");
				
				
			}
		}else{
			history.push([succes,lstOfMove.length]); //*/
		}
	}
}



//test one level
//2.1 -2.12, 2.14 -2.17,; 
//main(3.24);


var end = new Date().getTime();	//timer
var time = end - startTime;
console.log(time/1000,"s");




module.exports = main

