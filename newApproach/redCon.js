var column = require('../tools/column');
var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var fixTwin = require('./fixTwin');

let columns = [];
let lstOfMove = [];
let state = [columns,lstOfMove];

let alreadyTry = false;


function tstMatch(col2,from2,to2){
	//console.log("tstMatch, col2",col2,"from2",from2,"to2",to2);
	let twinCol = [];
	
	let colFrom2 = columns[from2];
	let colTo2 = columns[to2];
	let theCol2 = columns[col2];
	
	//from
	if(col2 != from2){
		if(theCol2.bigBall + colFrom2.content.length <= 4){
			twinCol.push([col2,from2]);
		}if(col2 != to2 && colFrom2.bigBall + theCol2.content.length <= 4){
			twinCol.push([from2,col2]);		
		}
	}
	//to
	if(col2 != to2){
		if(col2 != from2 && theCol2.bigBall + colTo2.content.length <= 4){
			twinCol.push([col2,to2]);
		}if(col2 != from2 && colTo2.bigBall + theCol2.content.length <= 4){
			twinCol.push([to2,col2]);		
		}
	}
	
	
	//console.log("twinCol",twinCol);
	return twinCol
}


function alternativeMove(lastMove2){
	//console.log("alternativeMove, lastMove",lastMove2)
	
	let [from2,to2,bb999] = lastMove2;
	
	let colFrom2 = columns[from2];
	let colTo2 = columns[to2];
	let theBall = colFrom2.top();
	
	let lstTwinCol =[];
	
	for(let col=0; col<columns.length; col++){
		let thisCol = columns[col];
		
		if(thisCol.isEmpty()){continue}
		if(thisCol.top() != theBall){continue}
		
		lstTwinCol = lstTwinCol.concat(tstMatch(col,from2,to2))
		
	}
	
	//console.log("lstTwinCol",lstTwinCol);
	return lstTwinCol
}


function undoLastMove(){
	
	let lastMove = lstOfMove[lstOfMove.length -1];
	
	let [from,to,bigBll] = lastMove;
	let colFrom = columns[from];
	let colTo = columns[to];
	
	let theBall = colTo.top();
	
	colTo.content = colTo.content.slice(0,-bigBll);
	colFrom.content = colFrom.content.concat(Array(bigBll).fill(theBall));
	
	colTo.newBigBall();
	colFrom.newBigBall();
	
	lstOfMove.pop();
	
	abstract(columns);
	//console.log("lstOfMove",lstOfMove);
	//console.log("lastMove",lastMove);
	
	let alternativeMv = alternativeMove(lastMove);
	
	if(alternativeMv.length == 0){
		undoLastMove()
	}else{
		let theMv = alternativeMv[0];
		console.log("theMv",theMv,"\n");
		let [newFrom,newTo] = theMv;
		
		abstract(columns);
		move(state,newFrom,newTo);
	}
	
}



function redcon(state2){
	console.log("\n\n\nRedcon");
	
	state = state2;//global var
	[columns,lstOfMove] = state;
	
	if(alreadyTry){
		throw Error("i need to make redcon");
	}
	alreadyTry = true
	
	undoLastMove()
	
}


module.exports = redcon;
