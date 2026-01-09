var startTime = new Date().getTime();
var column = require('../tools/column');
var columns0 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var raining = require('./raining');
var crissCross = require('./crissCross');

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





function main(){
	console.log("main");
	//raining(state);
	
	abstract(columns0);
	
	crissCross(state);
}




main();


var end = new Date().getTime();	//timer
var time = end - startTime;
console.log(time/1000,"s");






