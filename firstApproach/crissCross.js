
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
	console.log("lastCol", lastCol,"secondBll",secondBll);
	
	let placeToFeed = 4-thisCol.content.length+thisCol.bigBall;
	console.log("placeToFee",placeToFeed);
	
	let lstNextCol = columns0.filter(
		nxt => nxt.top() == secondBll		
	).map(x => columns0.indexOf(x));	
	console.log("lstNextCol",lstNextCol);
	
	return lstNextCol
}

let lstOfCrissCross = [];
function crissCross(columns2,lstOfCol2){
	console.log("crissCross",lstOfCol2);
	
	if(lstOfCol2.length >= 7){
		throw Error("to many move");	//nececary?
	}
	
	let lstNextCol = nextCol(lstOfCol2);
	
	for(col of lstNextCol){
		let thisList = [...lstOfCol2];
		if(thisList.includes(col)){
			console.log("thisList",thisList);
			let theStart = thisList.indexOf(col);
			console.log("thestart",theStart);
			thisList = thisList.slice(theStart)
			console.log("thisList",thisList);
			lstOfCrissCross.push(thisList);
			
		}else{
			thisList.push(col);
			crissCross(columns2,thisList);
		}
		
	}
	
	
}


function main(state2){
	console.log("crissCross");
	[columns0,lstOfMove] = state2;
	
	//nextCol([0]);
	for(let i=0; i<columns0.length; i++){
		crissCross(columns0,[i]);
	}
	console.log("lstCrissCross",lstOfCrissCross);

}

module.exports = main


