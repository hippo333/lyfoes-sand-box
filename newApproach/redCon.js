var column = require('../tools/column');
var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var fixTwin = require('./fixTwin');

let columns = [];
let lstOfMove = [];
let state = [columns,lstOfMove];


let countOfTry =0;
let lastLength = -1;
let lstPreviousTry = [];

let lstTwinCol =[];


function tstMatch(col2,from2,to2){
	console.log("tstMatch, col2",col2,"from2",from2,"to2",to2);
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
	console.log("alternativeMove, lastMove",lastMove2)
	
	let [from2,to2,bb999] = lastMove2;
	
	let colFrom2 = columns[from2];
	let colTo2 = columns[to2];
	let theBall = colFrom2.top();
	console.log("theBall",theBall);
	
	//continue with the remaining move
	let previousId = lstPreviousTry.indexOf(lstOfMove.join());
	if(previousId ==-1){
		console.log("i never see ths lstOfMove");
		lstTwinCol = [];
		lstPreviousTry.push(lstOfMove.join());
	}else{
		console.log("this lstOfMove seems familiar");
		let previousLst = lstPreviousTry[previousId+1];
		
		if(typeof(previousLst) == "string"){
			console.log("bad track")
			lstTwinCol = [];
			return lstTwinCol
		}else{
			console.log("last time we left this move",previousLst);
			
			
			lstTwinCol = previousLst.slice(1)//nextMove
			lstPreviousTry[previousId+1] = lstTwinCol
			return lstTwinCol
		}
		
	}
	
	if(colTo2.isEmpty()){
		let lstTopBall = columns.map(x => x.top());
		console.log("lst top ball",lstTopBall);
			
		for(let col=0; col<columns.length;col++){
			if(col == from2){continue}
			if(col == to2){continue}
			
			let secondBall = columns[col].secondBall()
			
			if(lstTopBall.includes(secondBall)){
				lstTwinCol.push([col,to2]);
			}
			//throw Error("debug second Ball");
			
		}
		lstPreviousTry.push(lstTwinCol);
		return lstTwinCol
	}
		
	for(let col=0; col<columns.length; col++){
		let thisCol = columns[col];
		
		if(thisCol.top() != theBall){
			//if(!thisCol.isEmpty()){continue}
			continue
		}
		
		lstTwinCol = lstTwinCol.concat(tstMatch(col,from2,to2))
		
	}
	
	lstPreviousTry.push(lstTwinCol);
	//lstPreviousTry.push(lstTwinCol);	//untouched lst
	
	console.log("lstTwinCol",lstTwinCol);
	return lstTwinCol
}


function undoLastMove(){
	console.log("undoLastMove");
	
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
	
	/*if(from ==0 && to== 5  && lstOfMove.length > 3){	//debug
		console.log("lstOfMove",lstOfMove);
		console.log("lastMove from",from,"to",to)
		console.log("alternative move",alternativeMv);
		//console.log("lstPreviousTry",lstPreviousTry);
		throw Error("debug");
	}//*/
	
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


let countRedcon = 0;

function redcon(state2){
	console.log("\n\n\nRedcon");
	console.log("countRedcon",++countRedcon);
	let start = new Date().getTime();	//timer
	
	state = state2;//global var
	[columns,lstOfMove] = state;
	
	if(countOfTry >100){
		console.log("lstPreviousTry",lstPreviousTry);
		throw Error("too many try try");
	}
	
	undoLastMove()
	countOfTry++;
	
	let end = new Date().getTime();	//timer
	let time = end - start;
	lstPreviousTry.push(time);
	
	/*if(countOfTry >10){
		console.log("lstPreviousTry",lstPreviousTry);
		throw Error("debug");
	}//*/
	console.log("lstPreviousTry",lstPreviousTry);
}


module.exports = redcon;
