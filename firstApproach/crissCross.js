
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');



function emptyBotle(columns2){
	
	let level = columns2[0].content.length;
	
	if(level %2 ==0){
		return columns2.findIndex(x => x.isEmpty())
	}else{
		//return columns2.findLastIndexOf(x => x.isEmpty())
		if(columns2[columns2.length-1].isEmpty()){
			return columns2.length -1
		}else{
			return -1
		}
	}
}


let columns0 = [];
let lstOfMove = [];
let state = [columns0,lstOfMove];


//set up



function nextCol(lstOfCol){
	console.log("nextCol");
	
	let lastCol = lstOfCol[lstOfCol.length -1];
	let thisCol = columns0[lastCol];
	let secondBll = thisCol.secondBall();
	console.log("lastCol",lastCol,"secondBll",secondBll);
	
	let placeToFeed = 4-thisCol.content.length+thisCol.bigBall;
	
	let lstNextCol = columns0.filter(
		nxt => nxt.top() == secondBll		
	).map(x => columns0.indexOf(x));	
	
	return lstNextCol
}

let lstOfCrissCross = [];
function crissCross(columns2,lstOfCol2){
	console.log("crissCross",lstOfCol2);
	
	if(lstOfCol2.length >= columns2.length){
		throw Error("to many move");	//nececary?
	}
	
	let lstNextCol = nextCol(lstOfCol2);
	
	for(col of lstNextCol){
		let thisList = [...lstOfCol2];
		colAlreadyTry.push(col);
		if(thisList.includes(col)){
			let theStart = thisList.indexOf(col);
			thisList = thisList.slice(theStart)
			
			let firstCol = thisList.indexOf(Math.min(...thisList));
			let begening = thisList.splice(firstCol);
			begening.push(...thisList);
			thisList = begening.join();
			
			if(lstOfCrissCross.includes(thisList)){continue}
			lstOfCrissCross.push(thisList);
			
		}else{
			thisList.push(col);
			crissCross(columns2,thisList);
		}
	}
}


function doCrissCross(lstOfCol2){
	console.log("doCrissCross",lstOfCol2);
	
	let emptyBtl = emptyBotle(columns0);
	console.log("emptyBtl",emptyBtl);
	let target = emptyBtl;
	
	for(i in lstOfCol2){
		let col = lstOfCol2[i];
		if(i>0){
			target = lstOfCol2[i-1];
		}
		console.log("move",col,target);
		move(state,col,target);
	}
	move(state,emptyBtl,lstOfCol2[lstOfCol2.length-1])
	abstract(columns0);
}


let colAlreadyTry = [];
function main(state2){
	console.log("crissCross");
	[columns0,lstOfMove] = state2;
	state = state2;
	lstOfCrissCross = []
	
	//nextCol([0]);
	for(let i=0; i<columns0.length; i++){
		//anty redondancy to heavy
		//if(colAlreadyTry.includes(i)){continue}
		crissCross(columns0,[i]);
	}
	console.log("lstOfCrissCross",lstOfCrissCross);
	lstOfCrissCross = lstOfCrissCross.map(x => x.split(",").map(
		y => parseInt(y)
	));
	console.log("lstCrissCross",lstOfCrissCross);
	
	let firstCrissCross = lstOfCrissCross[0];
	console.log("firstCrissCross",firstCrissCross);
	
	if(firstCrissCross == undefined){return false}
	else{
		doCrissCross(lstOfCrissCross[0]);
		return true
	}
}

module.exports = main


