
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var [price,resetPrice] = require('./price');



function emptyBotle(){
	return columns0.findIndex(x => x.isEmpty())
}


let columns0 = [];
let lstOfMove = [];
let state = [columns0,lstOfMove];
let succes0 = false;
let nbMaxBall = 4;


//set up


function findNbMv(history2){
	let lastMv = history2[history2.length -1];
	let mvBefor = history2[history2.length -2];
	if(mvBefor == undefined){mvBefor = [null,0]}
	
	let nbOfMv = lastMv[1] - mvBefor[1];
	return nbOfMv
}

function removeLastMv(){
	console.log("removeLastMv")
	
	let lastMv = lstOfMove.pop();
	console.log("lastMv",lastMv);
	
	let [from,to,bigBll] = lastMv;
	let colFrom = columns0[from];
	let colTo = columns0[to];
	
	let ballToMove = colTo.content.splice(-bigBll,bigBll);
	colFrom.content.push(...ballToMove);
	
	colTo.bigBall -= bigBll
	colFrom.bigBall = bigBll
	
	abstract(columns0);
}

function removeNbMove(nb){
	console.log("removeNbMove",nb);
	
	for(let i=0; i<nb; i++){
		removeLastMv();
	}
}


function reset(nbMaxBall2){
	nbMaxBall = nbMaxBall2;
	resetPrice(nbMaxBall2);
}

function main(state2,history){
	console.log("\nwhatIsBrocken");
	[columns0,lstOfMove] = state2;
	
	console.log("history",history);
	lastNbMv = findNbMv(history);
	
	removeNbMove(lastNbMv);
	history.pop();	
	
	//throw Error("debug");
}

module.exports = [main,reset]


