
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');



function emptyBotle(){
	
	return columns0.findIndex(x => x.isEmpty())
}


let columns0 = [];
let lstOfMove = [];
let state = [columns0,lstOfMove];
let theEmptyBotle = -1;

function secondBigBall(col2){
	//console.log("secoondBigBall",col2);
	
	let thisCol = columns0[col2];
	let secondBall = thisCol.secondBall();
	
	let sizeUnderBigBall = thisCol.content.length-1 - thisCol.bigBall 
	let sdBigBall =0;
	for(let i= sizeUnderBigBall; i>=0;i--){
		if(thisCol.content[i] != secondBall){break}
		sdBigBall++
	}
	
	//console.log("sdBigBall",sdBigBall);
	return sdBigBall
}


function isSuspect(thisCol2){
	let col = columns0.indexOf(thisCol2);
	//console.log(col,"isSuspect?");
	
	if(thisCol2.content.length <3){return false}
	let secondBigBll = secondBigBall(col);
	if( secondBigBll == 0){return false}
	
	let thirdLevel= thisCol2.content.length-1 -thisCol2.bigBall- secondBigBll;
	
	if(thirdLevel < 0){return false}
	if(thisCol2.content[thirdLevel] != thisCol2.top()){return false};
	
	//console.log("	",col,"is suspect");
	return true
}

function findSuspect(){
	//console.log("findSuspect");
	
	let theSuspect = columns0.findIndex(
		cll => isSuspect(cll)		
	);
	
	return theSuspect
}

function getTarget(col2,emptyBtl2){
	//console.log("getTarget",col2,emptyBtl2);
	
	let thisCol = columns0[col2];
	let secondBll = thisCol.secondBall();
	let secondBigBll = secondBigBall(col2);
	
	let target = columns0.findIndex(
		tgt => tgt.top() == secondBll
		&& tgt.content.length + secondBigBall <= 4
	);
	if(target !=-1){return target}
	
	let secondEmpty = columns0.findIndex(
		tgt => tgt.isEmpty()
		&& columns0.indexOf(tgt) != emptyBtl2	
	);	
	return secondEmpty
}

function doTheThing(col2,emptyBtl2,target2){
	//console.log("doTheThing",col2,emptyBtl2,target2);
	
	move(state,col2,emptyBtl2);
	move(state,col2,target2);
	move(state,emptyBtl2,col2);
	
}

function main(state2){
	console.log("\nremoveMidle");
	state = state2;
	[columns0,lstOfMove]= state
	abstract(columns0);
	
	let emptyBtl = emptyBotle();
	if(emptyBtl ==-1){return false}
	
	let suspect = findSuspect();
	if(suspect == -1){ return false}
	
	let target = getTarget(suspect,emptyBtl);
	
	doTheThing(suspect,emptyBtl,target)
	abstract(columns0);
	//throw Error("debug");
	
	console.log("removeMidle",true);
	return true;
}






module.exports = main


