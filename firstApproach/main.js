var startTime = new Date().getTime();
var column = require('../tools/column');
var columns0 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var raining = require('./raining');
var crissCross = require('./crissCross');
var capillarity = require('./capillarity');
var goToColor = require('./goToColor');

abstract(columns0)
let lstOfMove = [];
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
	console.log("isFinish");
	let unfinishedCol = columns2.findIndex(
		cll => !cll.isEmpty()
		&& !cll.isFinish()	
	);
	if(unfinishedCol == -1){return true}
	else{return false}
}


function main(){
	console.log("main");
	
	for(let i=0;i<10;i++){
		console.log("cycle",i);
		abstract(columns0);
	
		let succes = false;
		//succes = goToColor(state);
		if(!succes){capillarity(state)}
		if(!succes){succes = crissCross(state)};
		if(!succes){succes= raining(state)}
		
		if(!succes){
			if(isFinish(columns0)){
				console.log("\nwe did it");
				abstract(columns0);
				console.log("lstOfMove",lstOfMove);
				return
			}else{
				console.log("\nfail at",i);
				abstract(columns0);
				return
				
			}
		}
	}
}




main();


var end = new Date().getTime();	//timer
var time = end - startTime;
console.log(time/1000,"s");






