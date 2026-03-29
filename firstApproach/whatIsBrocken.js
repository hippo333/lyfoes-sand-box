
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var [price,resetPrice] = require('./price');
var [newVcolumn, Vupdate, Vcoppy] = require('../tools/Vcolumn');



function emptyBotle(){
	return columns0.findIndex(x => x.isEmpty())
}


let columns0 = [];
let lstOfMove = [];
let history = [];
let Vcolumn = [];
let state = [columns0,lstOfMove];
let succes0 = false;
let nbMaxBall = 4;


//set up


function findProblem(){
	console.log("findProblem");
	
	let theTriple = Vcolumn.findIndex(
		tr => tr[1] ==nbMaxBall-1
		&& tr[2] == nbMaxBall
	);
	console.log("theTriple",theTriple);
	
	return theTriple
}

function removeLastMv(){
	//console.log("removeLastMv")
	
	let lastMv = lstOfMove.pop();
	//console.log("lastMv",lastMv);
	
	let [from,to,bigBll] = lastMv;
	let colFrom = columns0[from];
	let colTo = columns0[to];
	
	let ballToMove = colTo.content.splice(-bigBll,bigBll);
	colFrom.content.push(...ballToMove);
	
	colTo.bigBall -= bigBll
	colFrom.bigBall = bigBll
	
	//abstract(columns0);
}

function removeNbMove(nb){
	//console.log("removeNbMove",nb);
	
	for(let i=0; i<nb; i++){
		removeLastMv();
	}
}


function wayBack(col2){
	console.log("wayBack",col2);
	
	let lstOfMoveRevers = [...lstOfMove].reverse();
	let theCut = 1+ lstOfMoveRevers.findIndex(
		ct => ct[1] == col2		
	);
	
	let historyRevers = [...history].reverse();
	let theCount = historyRevers.find(
		cnt => cnt[1] <= lstOfMove.length -theCut -1
	);
	theCut = lstOfMove.length -theCount[1]
	//go to last history befor
	
	removeNbMove(theCut);
	
	console.log("lstOfMove",lstOfMove);
	abstract(columns0);
}


function reset(nbMaxBall2){
	nbMaxBall = nbMaxBall2;
	resetPrice(nbMaxBall2);
}

function main(state2,history2){
	console.log("\nwhatIsBrocken");
	[columns0,lstOfMove] = state2;
	history = history2
	Vcolumn = newVcolumn(columns0);
	
	abstract(columns0);
	
	let theProblem = findProblem();
	wayBack(theProblem);
	
	//throw Error("debug");
}

module.exports = [main,reset]


