var column = require('../tools/column');
var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var fixTwin = require('./fixTwin');
var writeOnFile = require('./writeOnFile');

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
			
		for(let col66=0; col66<columns.length;col66++){
			if(col66 == from2){continue}
			if(col66 == to2){continue}
			
			let secondBall = columns[col66].secondBall()
			console.log("second ball",secondBall);
			console.log("col66",col66);
			
			if(lstTopBall.includes(secondBall)){
				lstTwinCol.push([col66,to2]);
				console.log("lst top ball contain second ball");
			}
			//throw Error("debug second Ball");
			
		}
		lstPreviousTry.push(lstTwinCol);
		//lstPreviousTry.push(lstTwinCol);	//untouched lst
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
	lstPreviousTry.push(lstTwinCol);	//untouched lst
	
	console.log("lstTwinCol",lstTwinCol);
	return lstTwinCol
}


function undoNbMove(nb){
	console.log("undo",nb,"move");
	
	let lastMove = [];
	for(let i=0; i<nb; i++){
		lastMove = lstOfMove[lstOfMove.length -1];
		
		let [from,to,bigBll] = lastMove;
		let colFrom = columns[from];
		let colTo = columns[to];
		
		let theBall = colTo.top();
		
		
		colTo.content = colTo.content.slice(0,-bigBll);
		colFrom.content = colFrom.content.concat(Array(bigBll).fill(theBall));
		
		colTo.newBigBall();
		colFrom.newBigBall();
		
		lstOfMove.pop();
		
		//abstract(columns);
	}
	
	return lastMove
}


function undoLastMove(nb){
	
	let lastMove = undoNbMove(nb);
	
	let alternativeMv = alternativeMove(lastMove);
	
	
	if(alternativeMv.length == 0){
		undoLastMove(1)
	}else{
		let theMv = alternativeMv[0];
		console.log("theMv",theMv,"\n");
		let [newFrom,newTo] = theMv;
		
		abstract(columns);
		move(state,newFrom,newTo);
	}
	
	
}



//growUpToSoon
function backToFreeBotle(){
	console.log("back to free Botle");
	
	let emptyBtl = columns.findIndex(
		btl => btl.isEmpty()
	)
	if(emptyBtl !=-1){return}
	
	for(let mv=lstOfMove.length-1; mv>=0; mv--){
		
		let lastMove = lstOfMove[mv];
		let [from,to,theBb] = lastMove;
		let colFrom = columns[from];
		let colTo = columns[to];
		if(colFrom.isEmpty()){break}
		
		undoNbMove(1);
	}
	abstract(columns);
}//it work


//grow up to soon
//it must improve
function aveAWay(col2,ball2,nbCycle){
	console.log("ave a Way col",col2,"ball",ball2);
	
	if(nbCycle > 5){
		throw Error("to many cycles")
	}
	
	for(let col=0; col<columns.length; col++){
		if(col == col2){continue}
		let theCol = columns[col];
		
		if(theCol.isEmpty()){continue}
		
		let level = theCol.content.indexOf(ball2);
		if(level ==-1){continue}
		if(level ==3){continue}//no place for the ball
		
		//arbitrary
		if(level ==0){continue}
	
		if(theCol.top() == ball2){
			return [[col2,col]]
		}
		if(theCol.secondBall() == ball2){
			let secondMove = aveAWay(col,theCol.top(),++nbCycle);
			if(secondMove == null){continue}
			
			let theMv = [col2,col]
			secondMove.push(theMv);
			return secondMove
		}
		
		
		
	}
	
	return null	//no way
}


//grow up to soon
function rewindUntil(col2){
	
	for(let mv=lstOfMove.length -1; mv>=0; mv--){
		
		let theMove = lstOfMove[mv];
		let to = theMove[1];
		
		if(to == col2){
			undoLastMove(1);
			break;
		}else{
			undoNbMove(1)		
		}
	}
}



function growUpToSoon(){
	console.log("growUp to soon");
	
	backToFreeBotle();//necessary for the move
	let lstColStuck = [];
	
	for(let col =0; col < columns.length; col++){
		let theCol = columns[col];
		let theBall = theCol.top();
		if(theCol.content.length == theCol.bigBall){continue}
		
		//i forgot other way
		let target = columns.findIndex(
			tgt => !tgt.isEmpty()
			&& columns.indexOf(tgt) != col
			&& tgt.top() != theBall
			&& tgt.content.indexOf(theBall) != -1
			&& tgt.content.indexOf(theBall) + theCol.bigBall >3
		)
		
		if(target !=-1){
			lstColStuck.push(col);
			console.log("col",col,"target",target);
		}
	}
	if(lstColStuck.length ==0){return}
	
	let theCol = lstColStuck[0];
	
	let secondBl = columns[theCol].secondBall();
	
	let theWay = aveAWay(theCol,secondBl);
	console.log("theWay",theWay);
	if(theWay == null){
		rewindUntil(theCol)
		abstract(columns)
		console.log("lstOfMove",lstOfMove);
	}
	
	//throw Error("experimental");
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
	
	if(countOfTry == 5 ){
		growUpToSoon()
		lstPreviousTry.push("grow up to soon");
	}//*/
	
	undoLastMove(1)
	countOfTry++;
	
	let end = new Date().getTime();	//timer
	let time = end - start;
	lstPreviousTry.push(time);
	
	/*if(countOfTry >3){
		console.log("lstPreviousTry",lstPreviousTry);
		abstract(columns);
		throw Error("debug");
	}//*/
	console.log("lstPreviousTry",lstPreviousTry);
	writeOnFile(lstPreviousTry);
}


module.exports = redcon;
