
var column = require('../tools/column');
var getTheLevel = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var [newVcolumn, Vupdate, Vcoppy] = require('../tools/Vcolumn');


function emptyBotle(){
	return columns0.findIndex(x => x.isEmpty())
}

function otherColumn(col2){
	let theBigBll = columns0[col2].bigBall;
	let theBll = columns0[col2].top();
	
	let otherCol = columns0.findIndex(
		cll => cll.top() == theBll
		&& columns0.indexOf(cll) != col2
		&& cll.content.length + theBigBll <= nbMaxBall
	);
	
	if(otherCol == -1){
		otherCol = emptyBotle()
	}
	return otherCol
}


let lstOfMove = [];
let columns0 = [];
let state = [columns0,lstOfMove];
let nbMaxBall = 4; //default
let history = [];


//set up
columns0 = getTheLevel("blowUp1");
abstract(columns0);

function reset(nbMaxBall2){
	nbMaxBall = nbMaxBall2;
	history = [];
}


function main(state2, lastFaill){
	console.log("\ncrissCross");
	[columns0,lstOfMove] = state2;
	state = state2;
	
	
	
	
}

module.exports = [main,reset]


