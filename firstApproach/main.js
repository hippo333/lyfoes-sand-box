var startTime = new Date().getTime();
var column = require('../tools/column');
var getTheLevel = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var raining = require('./raining');
var crissCross = require('./crissCross');
var capillarity = require('./capillarity');
var removeMidle = require('./removeMidle');


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
	if(unfinishedCol == -1){return true}
	else{return false}
}

let theLevel = 2.1;
let maxCycle = 15;
function main(theLevel){
	console.log("main");
	
	columns0 = getTheLevel(theLevel);
	lstOfMove = [];
	state = [columns0,lstOfMove];
	
	
	for(let cycle=0;cycle<=maxCycle;cycle++){
		console.log("cycle",cycle);
		abstract(columns0);
		
		if(cycle == maxCycle){throw Error("to Many Cycle");}
		
		let succes = false;
		if(!succes){succes= capillarity(state)}
		if(!succes){succes= crissCross(state)};
		if(!succes){succes= removeMidle(state)}
		if(!succes){succes= raining(state)}
		
		if(!succes){
			if(isFinish(columns0)){
				console.log("\nwe did it",theLevel);
				abstract(columns0);
				console.log("lstOfMove",lstOfMove);
				return
			}else{
				console.log("\nfail at",cycle);
				console.log("lstOfMove",lstOfMove);
				abstract(columns0);
				throw Error("can't move animore");
				return
				
			}
		}
	}
}



//test one level
//2.1 -2.12, 2.14 -2.17,; 
main(2.28);


var end = new Date().getTime();	//timer
var time = end - startTime;
console.log(time/1000,"s");




module.exports = main

