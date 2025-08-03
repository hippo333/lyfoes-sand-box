var column = require('../tools/column');
var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var raining = require('./raining');


let columns = [];
let lstOfMove = [];
let state = [columns,lstOfMove];
let alreadyTry = false

function whatIsTheProblem(state,oldLstOfMove,remainingMove){
	console.log("\n\n\n\n\nredcon");
	console.log("what is the probleme?");
	
	[columns,lstOfMove] = state;
	
	
	abstract(columns);
	console.log("lstOfMove",lstOfMove);
	//console.log("old lst of move",oldLstOfMove);
	//console.log("remaining move",remainingMove);
	
	if(alreadyTry){
		console.log("Error What is the problem, already try");
		throw Error	
		
	}
	
	let lstTwin = findTwinColumn();
	
	
	console.log("lst twin",lstTwin);	
		
	let firstTwin = lstTwin[1];
	let firstFrom = firstTwin[0];
	let firstTo = firstTwin[1];
	
	let beforFrom = lastMoveTo(firstFrom);	
	console.log("index of last move from",firstTwin,beforFrom);
	
	let beforTo = lastMoveTo(firstTo);
	console.log("index of last move To",firstTwin,beforTo);
	let theMove = [];
	let theIndex = -1;
	
	if(beforFrom ==-1){
		console.log("we can move to from",firstFrom);
		theIndex = beforTo;
		
	}else if(beforTo ==-1){
		console.log("we can move to To",firstTo);
		theIndex = beforFrom;
		
	}else{
		console.log("Error What is the problem, no col from");
		throw Error
	}
	
	theMove = lstOfMove[theIndex];	
	console.log("the move",theMove,"at",theIndex);
	
	
	let state3 = recreateTheSet(theIndex);
	//replace old state by the new one
	state = state3;
	
	alreadyTry = true;
	return state3;
	//throw Error
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
		
		
	}

	return output
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

let alreadyRecreated = false;
function recreateTheSet(index){
	
	if(alreadyRecreated){
		console.log("\n\nError recreate the set, we already do that one")
		throw Error
		
	}
	let lstOfMove3 = [];
	let columns3 = [];
	let state3 = [columns3,lstOfMove3];
	
	for(let col=0; col<columns999.length; col++){
		let thecol = columns999[col];
		
		columns3.push(new column(thecol.content));
		
		
	}	
	abstract(columns3);
	
	//do the move untile the error
	for(let mv=0; mv<index; mv++){
		
		let theMove = lstOfMove[mv];
		let [from,to] = theMove;
		
		move(state3,from,to);
		
	}
	abstract(columns3)	
	console.log("lst of move3",lstOfMove3);
	
	let wrongMove = lstOfMove[index];
	let otherWay = studyPosibility(state3,wrongMove);
	
	if(otherWay ==-1){
		console.log("no col compatible with",wrongMove);
	}
	
	
	//what col gona free a botle?
	let priceTo = price(state3,wrongMove[1]);
	console.log("for the col",wrongMove[1],"price to",priceTo)
	
	if(priceTo != 0){
		console.log("Error recreateSet,i can't free",wrongMove[1]);
		console.log("priceTo",priceTo);
		console.log("you must finish this program");
		
		throw Error	
	}
	
	let firstTo = columns3[wrongMove[1]]
	let otherBigBall = columns3[otherWay].bigBall
	
	if(firstTo.content.length + otherBigBall > 4){
		console.log("Error recreateSet, we overFeed",wrongMove[1]);
		console.log("firstTo",firstTo.content,"otherBigBall",otherBigBall);
		console.log("you must finish this program");
		
		throw Error
	}
	
	move(state3,otherWay,wrongMove[1]);
		
	abstract(columns3);
	console.log("lstOfMove3",lstOfMove3);
	
	return state3
}



function price(state2,col2){
	console.log("price col",col2);
	
	let [columns3,lstOfMove3] = state2;
	
	let theCol = columns3[col2].content;
	
	for(let bll=theCol.length -2; bll >=0; bll--){
		console.log(bll,theCol[bll]);
		
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
	console.log("free",col2,colFrom.content,"level",level2);
	
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
//free
//botle who can recive the topBall of col2
function otherBotle(state2,col2,ball2){
	let [columns2,lstOfMove2] = state2;
	
	let otherCol = theOtherCol(state2,col2,ball2);
	
	
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


module.exports = whatIsTheProblem;
