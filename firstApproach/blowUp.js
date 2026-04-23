
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
columns0 = getTheLevel("blowUp0");
abstract(columns0);

function emptyTheCol(col2,level2){
	console.log("emptyTheCol, col2",col2,"level2",level2);
	
	let thisCol = columns0[col];
	let bigBll =1;
	for(let bll =thisCol.content.length-1; bll >=0; bll--){
		let thisBll = thisCol.content[bll];
		let bllUnder = thisCol.content[bll-1];
		if(thisBll == bllUnder){
			bigBll++;
			continue;
		}
		
		
		bigBll = 1
	}
}

function reset(nbMaxBall2){
	nbMaxBall = nbMaxBall2;
	history = [];
}

let colUsed = [];
let colUsedFor = []; //[col, color];
let ballToHide = [];
let [col, level] = [4, 0]; //test

function main(state2){
	console.log("\nblowUp");
	[columns0,lstOfMove] = state2;
	state = state2;
	abstract(columns0);
	
	emptyTheCol(col,level);
	
	
}

main(state);


module.exports = [main,reset]
