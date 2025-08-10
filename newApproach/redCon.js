var column = require('../tools/column');
var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var fixTwin = require('./fixTwin');

let columns = [];
let lstOfMove = [];
let state = [columns,lstOfMove];
let alreadyTry = false;

let idLastEmpty = -1;	//for second way
let lastEmptyTaken = [];//for secondWay

function whatIsTheProblem(state,oldLstOfMove,remainingMove){
	console.log("\n\n\n\n\nredcon");
	console.log("what is the probleme?");
	
	[columns,lstOfMove] = state;
	
	
	abstract(columns);
	console.log("lstOfMove",lstOfMove);
	//console.log("old lst of move",oldLstOfMove);
	//console.log("remaining move",remainingMove);
	
	//throw Error //debug
	
	if(alreadyTry){
		console.log("Error What is the problem, already try");
		throw Error	
		
	}
	alreadyTry = true;
	
	
	let state3 = recreateTheSet();
	
	let twinFixed = fixTwin(state,state3);
	console.log("twin fixed",twinFixed);
	
	if(twinFixed){
		return state3
	}
	console.log("i can't fix the twin");
	
	state3 = recreateTheSet();
	
	console.log("id last empty",idLastEmpty);
	
	console.log("\n Error, redCon nothing work");
	throw Error
}



function recreateTheSet(){
	console.log("\nrecreate the set");
	
	
	let lstOfMove3 = [];
	let columns3 = [];
	let state3 = [columns3,lstOfMove3];
	
	for(let col=0; col<columns999.length; col++){
		let thecol = columns999[col];
		
		columns3.push(new column(thecol.content));
		
	}	
	console.log("columns999");
	abstract(columns3);
	
	return state3	
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


module.exports = whatIsTheProblem;
