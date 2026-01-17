
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');



function emptyBotle(){
	return columns0.findIndex(x => x.isEmpty())
}

function otherColumn(col2){
	let theBigBll = columns0[col2].bigBall;
	let theBll = columns0[col2].top();
	
	let otherCol = columns0.findIndex(
		cll => cll.top() == theBll
		&& columns0.indexOf(cll) != col2
		&& cll.content.length + theBigBll <= 4
	);
	
	if(otherCol == -1){
		otherCol = emptyBotle()
	}
	return otherCol
}


let columns0 = [];
let lstOfMove = [];
let state = [columns0,lstOfMove];


//set up



function nextCol(lstOfCol){
	//console.log("nextCol");
	
	let lastCol = lstOfCol[lstOfCol.length -1];
	let thisCol = columns0[lastCol];
	let secondBll = thisCol.secondBall();
	console.log("lastCol",lastCol,"secondBll",secondBll);
	
	let placeToFeed = 4-thisCol.content.length+thisCol.bigBall;
	
	let lstNextCol = columns0.filter(
		nxt => nxt.top() == secondBll
		&& nxt.bigBall + (thisCol.content.length- thisCol.bigBall) <=4		
	).map(x => columns0.indexOf(x));	
	
	return lstNextCol
}

let lstOfCrissCross = [];
function crissCross(columns2,lstOfCol2){
	//console.log("crissCross",lstOfCol2);
	
	if(lstOfCol2.length >= columns2.length){
		throw Error("to many move");	//nececary?
	}
	
	let lstNextCol = nextCol(lstOfCol2);
	
	for(col of lstNextCol){
		let thisList = [...lstOfCol2];
		colAlreadyTry.push(col);
		if(thisList.includes(col)){
			console.log("we loop",thisList);
		
			let target = thisList.shift();
			let theStart = thisList.indexOf(col);
			
			let theTarget = columns0[target];
			if(!theTarget.isEmpty() && theStart !=0){continue}
			
			
			thisList = thisList.slice(theStart)
			
			let firstCol = thisList.indexOf(Math.min(...thisList));
			let begening = thisList.splice(firstCol);
			begening.push(...thisList);
			begening.unshift(target);
			thisList = begening.join();
			
			if(lstOfCrissCross.includes(thisList)){continue}
			lstOfCrissCross.push(thisList);
			
		}else if(columns2[col].isMonochrome()){//we free a botle
			console.log("col is monochrome");
			console.log("thisList",thisList);
			thisList.push(col);
			thisList = thisList.join();
			lstOfCrissCross.push(thisList);
			
		}else{
			console.log("thisList",thisList);
			thisList.push(col);
			crissCross(columns2,thisList);
		}
	}
}


function doCrissCross(lstOfCol2){
	console.log("doCrissCross",lstOfCol2);
	
	let firstTarget = lstOfCol2.shift();
	let target = firstTarget;
	
	for(i in lstOfCol2){
		let col = lstOfCol2[i];
		if(i>0){
			target = lstOfCol2[i-1];
		}
		console.log("move",col,target);
		move(state,col,target);
	}
	let lastColFrom = lstOfCol2[lstOfCol2.length -1];
	let lastFrom = columns0[lastColFrom];
	if(!lastFrom.isEmpty()){
		move(state,firstTarget,lstOfCol2[lstOfCol2.length-1]);
	}
	abstract(columns0);
}


let colAlreadyTry = [];
function main(state2){
	console.log("\ncrissCross");
	[columns0,lstOfMove] = state2;
	state = state2;
	lstOfCrissCross = []
	
	//if(emptyBotle() == -1){return false}
	let firstEmpty = emptyBotle();
	
	
	for(let i=0; i<columns0.length; i++){
		let target = firstEmpty
		if(target ==-1){
			target = otherColumn(i)
			if(target ==-1){continue}
		}
		
		crissCross(columns0,[target,i]);
	}
	lstOfCrissCross = lstOfCrissCross.map(x => x.split(",").map(
		y => parseInt(y)
	));
	
	let firstCrissCross = lstOfCrissCross[0];
	
	if(firstCrissCross == undefined){
		console.log("no crissCross");
		return false
	}else{
		doCrissCross(lstOfCrissCross[0]);
		return true
	}
}

module.exports = main


