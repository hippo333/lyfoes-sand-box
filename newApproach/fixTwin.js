var column = require('../tools/column');
var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');

let columns = [];
let lstOfMove = [];
let state =[];

let columns3 = [];
let lstOfMove3 = [];
let state3 = [];

let lastEmptyUsed = -1;	//for second Way
let theFulestTwin = [];
let scoreFulest = -1;

function main(oldState,newState){
	console.log("fixTwin");
	
	[columns,lstOfMove] = oldState;
	state = oldState;
	
	[columns3,lstOfMove3] = newState;
	state3 = newState;
	
	let lstTwins = findError();	
	
	
	let twinFixed = fixTwin(newState,lstTwins);
	
	
	
	if(twinFixed){
		return [true,0,0]
	}
	return [false,lastEmptyUsed,theFulestTwin]
	
}

//get all column who ave the same top than an other
function findTwinColumn(){
	console.log("find twinsColumn");
	let output = [];
	
	for(let col=0;col<columns.length; col++){
		let thisCol = columns[col];
		
		let secondCol = otherCol(col);
		
		if(secondCol ==-1){continue}
		
		output.push([col,secondCol]);
		
		let score = columns[col].bigBall	//how many ball cumulate
		score += columns[col].bigBall
		
		if(score > scoreFulest){
			scoreFulest = score;
			theFulestTwin = [col,secondCol];
		}
		
		
	}

	return output
}

function findError(){
	console.log("\nfind error");
	
	let lstTwin = findTwinColumn();
		
	console.log("lst twin",lstTwin);	
		
	let theMove = [];
	let theIndex = -1;
		
	for(let i=0; i< lstTwin.length; i++){
		let thisTwin = lstTwin[i]; //lstTwin[1];
		let thisFrom = thisTwin[0];
		let thisTo = thisTwin[1];
		//theIndex = thisTwin[2];
		
		let beforFrom = lastMoveTo(thisFrom);	
		console.log("index of last move from",thisTwin,beforFrom);
		
		let beforTo = lastMoveTo(thisTo);
		console.log("index of last move To",thisTwin,beforTo);
		
		if(beforTo !=-1){
			//not sur about that
			if(thisFrom == lstOfMove[beforTo][0]){continue}//the same move
			
			console.log("we can move to from",thisFrom);
			theIndex = beforTo;
			thisTwin.push(theIndex)
			
		}else if(beforFrom !=-1){
			console.log("we can move to To",thisTo);
			theIndex = beforFrom;
			thisTwin.push(theIndex)
			
		}
	}
	
	theMove = lstOfMove[theIndex];
	console.log("lst twins",lstTwin);	
	console.log("the move",theMove,"at",theIndex);
	
	let lstSorted = sortTwin(lstTwin);
	
	return lstSorted
}

//sort twin by cronological last move
function sortTwin(lstTwin2){
	console.log("\nsort twin");
	
	let lstSorted = [];
	
	for(twin of lstTwin2){
		
		let indexSupp = lstSorted.findIndex(
			id => id[2] > twin[2]			
		)
		
		if(indexSupp ==-1){
			lstSorted.push(twin);
			
		}else{
			lstSorted.splice(1,0,twin);
		}
		
		
	}
	console.log("lst sorted",lstSorted);
	
	return lstSorted
}

function fixTwin(state2,lstOfTwin2){
	console.log("fixTwin");
	console.log("lst of twin2",lstOfTwin2);
	
	let [columns2,lstOfMove2] = state2;
	
	
	let indexOfTwin = 0;
	let theTwin = lstOfTwin2[indexOfTwin];	//the first twin
	let theIndex = theTwin[theTwin.length-1];
	
	//do the move untile the error
	for(let mv=0; mv<lstOfMove.length; mv++){
		
		let theMove = lstOfMove[mv];
		let [from,to] = theMove;
		
		if(theTwin == undefined){
			findLastEmptyUsed(state2,mv);	//for second Way
			return false //i ave try all twin
		}
		
		theIndex = theTwin[theTwin.length -1];	
		if(mv < theIndex){
			if(columns2[to].isEmpty() && mv>0){
				lastEmptyUsed = mv;//for second way
			}
			
			move(state2,from,to);
			console.log(mv,"theMove",theMove);
			continue;
		}
		
		console.log("\nStop the move",theMove,"is suspect");
		console.log("at index",theIndex);
		abstract(columns2)	
		console.log("lst of move3",lstOfMove2);
		
		//next twin for the next loop
		indexOfTwin++;	
		theTwin = lstOfTwin2[indexOfTwin];
		
		
		let otherWay = studyPosibility(state2,theMove);
		
		console.log("the other way",otherWay);
		
		if(otherWay ==-1){
			console.log("no col compatible with",theMove);
			
			move(state2,from,to);
			continue
		}
		
		let priceTo = price(state2,to);
		console.log("for the col",to,"price to",priceTo);
		
		
		if(priceTo != 0){
			console.log("\nError recreateSet,i can't free",from);
			console.log("priceTo",priceTo);
			console.log("you must finish this program");
			
			move(state2,from,to);
			continue;
		}
		let firstTo = columns2[to]
		let otherBigBall = columns2[otherWay].bigBall
		
		if(firstTo.content.length + otherBigBall > 4){
			console.log("Error recreateSet, we overFeed",wrongMove[1]);
			console.log("firstTo",firstTo.content,"otherBigBall",otherBigBall);
			console.log("you must finish this program");
			
			throw Error
		}
		
		break
	}
		
		
	abstract(columns2);
	console.log("lstOfMove2",lstOfMove2);
	
	return true
}

//find last move to an empty botle
function findLastEmptyUsed(state2,mv2){
	console.log("findLastEmptyUsed, mv2",mv2);
	
	
	let [columns2,lstOfMove2] = state2;
	
	for(let mv=mv2; mv< lstOfMove.length; mv++){
		let [from,to] = lstOfMove[mv];
			
		if(columns2[to].isEmpty()){
			lastEmptyUsed = mv;//for second way
		}
		move(state2,from,to);
		
	}	
	console.log("lastEmptyUsed",lastEmptyUsed);
}


function otherCol(col2){
	//console.log("otherCol",col2);
	
	let theCol = columns[col2];
	let theBall = theCol.top();
	
	let secondCol = columns.findIndex(
		sdCl => columns.indexOf(sdCl) > col2	//anty dublon anty col2
		&& sdCl.top() == theBall
		
	)
	
	//console.log("secondCol",secondCol);
	return secondCol
}

function lastMoveTo(col2){
	
	for(let mv=lstOfMove.length -1; mv >=0; mv--){
		let thisMove = lstOfMove[mv];
		
		if(thisMove[0] == col2){
			return -1
		
		}else if(thisMove[1] == col2){
			return mv
		}	
	}
	return -1
}

function price(state2,col2){
	console.log("price col",col2);
	
	let [columns3,lstOfMove3] = state2;
	
	let theCol = columns3[col2].content;
	
	for(let bll=theCol.length -2; bll >=0; bll--){
		console.log("level",bll,"ball",theCol[bll]);
		
		let otherCol = otherBotle(state2,col2,theCol[bll]);
		
		if(otherCol ==-1){return -1}
	}
	
	return 0
}

//other move than the wrong
function studyPosibility(state2,wrongMove){
	console.log("study posibility");
	
	let [columns3,lstOfMove3] = state2;
	
	let [from,to] = wrongMove;
	let theCol = columns3[from];
	let theBall = theCol.top();
	
	let otherWay = columns3.findIndex(
		othw => columns3.indexOf(othw) != from
		&& columns3.indexOf(othw) != to
		&& othw.content.indexOf(theBall) != -1
	)
	
	console.log("other Way",otherWay);
	if(otherWay == -1 ){return -1}
	
	let levelOfBall = columns3[otherWay].content.indexOf(theBall);
	if(columns3[otherWay].top() == theBall){return -1}
	
	free(state2,otherWay,levelOfBall);
	
	return otherWay
}


//studyposibility
//remove the ball above level2
function free(state2,col2,level2){
	let [columns2,lstOfMove2] = state2;
	let colFrom = columns2[col2];
	console.log("free (FixTwin)",col2,colFrom.content,"level",level2);
	
	if(colFrom.isMonochrome()){return true}
	if(colFrom.isEmpty()){
		console.log("skip for emptyness");
		return true
	}
	if(colFrom.bigBall >1){	//the ball change nothing
		console.log("skip for the bigBall");
		return true
	}
	
	let theCol = columns2[col2];
	let theBall = theCol.top();
	let otherCol = otherBotle(state2,col2,theBall);
	
	if(otherCol ==-1){
	
		console.log("Error Free",col2,"no other column");
		abstract(columns2);
		return false;
		
		
	}
	
	//console.log("move from",col2, colFrom.content);
	//console.log("to",otherCol, columns2[otherCol].content);
	move(state2,col2,otherCol);
	
	
	
	if(colFrom.content.length -colFrom.bigBall > level2){
		abstract(columns2);
		console.log("Error fail to free from",mv2[0],colFrom.content);
		throw Error
	
	}
	return true
}

//otherBotle
function emptyBotle(columns2){
	
	for(let col=0 ; col<columns2.length; col++){
		if(columns2[col].isEmpty()){return col}
		
	}
	
	
	return -1
}
//free
//botle who can recive the topBall of col2
function otherBotle(state2,col2,ball2){
	let [columns2,lstOfMove2] = state2;
	
	let otherCol = theOtherCol(state2,col2,ball2);
	
	if(otherCol ==-1){
		//it's complcated
		//otherCol = emptyBotle(columns2)
	}
	
	return otherCol
}

//otherBotle
//botle who can recive topBall of col2
function theOtherCol(state2,col2,theBall){
	console.log("the otherCol , col",col2,"theBall",theBall);
	
	let [columns2,lstOfMove2] = state2;

	let thisCol = columns2[col2];
	//let theBall = thisCol.top();
	
	let otherCol = columns2.findIndex(
		oCol => columns2.indexOf(oCol) != col2
		&& !oCol.isEmpty()
		&& oCol.top() == theBall
		&& thisCol.bigBall + oCol.content.length <5
	);
	
	
	return otherCol
}



module.exports = main
