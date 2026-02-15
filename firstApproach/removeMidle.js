
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');



function emptyBotle(){
	return columns0.findIndex(x => x.isEmpty())
}

function otherBotle(col2){
	let botle = emptyBotle();
	
	if(botle ==-1){
		let thisCol = columns0[col2];
		let placeToFeed = thisCol.content.length - thisCol.secondBigBall();
		botle = columns0.findIndex(
			btl => btl.top() == thisCol.top()
			&& columns0.indexOf(btl) != col2
			&& btl.content.length + thisCol.bigBall <=nbMaxBall	//first step
			&& placeToFeed + btl.bigBall <=nbMaxBall //last step
		);
	
	}
	
	return botle
}


let columns0 = [];
let lstOfMove = [];
let state = [columns0,lstOfMove];
let theEmptyBotle = -1;
let nbMaxBall = 4;


function isSuspect(thisCol2){
	let col = columns0.indexOf(thisCol2);
	//console.log(col,"isSuspect?");
	
	if(thisCol2.content.length <3){return false}
	let secondBigBll = columns0[col].secondBigBall();
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
	let secondBigBll = thisCol.secondBigBall();
	
	let target = columns0.findIndex(
		tgt => tgt.top() == secondBll
		&& tgt.content.length + secondBigBll <= nbMaxBall
	);
	//console.log("target",target);
	if(target !=-1){return target}
	
	let secondEmpty = columns0.findIndex(
		tgt => tgt.isEmpty()
		&& columns0.indexOf(tgt) != emptyBtl2	
	);	
	//console.log("secondEmpty",secondEmpty);
	return secondEmpty
}

function doTheThing(col2,emptyBtl2,target2){
	console.log("doTheThing",col2,emptyBtl2,target2);
	
	move(state,col2,emptyBtl2);
	move(state,col2,target2);
	move(state,emptyBtl2,col2);
	
}

function reset(nbMaxBall2){
	nbMaxBall = nbMaxBall2;
}

function main(state2){
	console.log("\nremoveMidle");
	state = state2;
	[columns0,lstOfMove]= state
	//abstract(columns0);
		
	
	let suspect = findSuspect();
	if(suspect == -1){ return false}
	console.log("suspect",suspect);
	
	let otherBtl = otherBotle(suspect);
	if(otherBtl ==-1){return false}
	console.log("otherBtl",otherBtl);
	
	let target = getTarget(suspect,otherBtl);
	if(target ==-1){return false}
	console.log("target",target);
	
	doTheThing(suspect,otherBtl,target)
	abstract(columns0);
	//throw Error("debug");
	
	console.log("removeMidle",true);
	//return true;
	return "removeMidle"
}






module.exports = [main,reset]


