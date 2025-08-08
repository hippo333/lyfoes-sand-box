

var abstract = require('../tools/abstract');
var move = require('../tools/move');
var redcon = require('./redCon');


let state2 =[];

//for redcon
let oldLstOfMove =[];
let remainingMove = [];
let lastMove = [];
let newLst =[];


function emptyBotle(columns2){
	
	for(let col=0 ; col<columns2.length; col++){
		if(columns2[col].isEmpty()){return col}
		
	}
	//else
	console.log("Error no empty botle");
	let newEmptyBotle =fixIt();
	
	if(newEmptyBotle != -1){
		return newEmptyBotle;
	}
	
	return -1
}



//empty botle
//try to free a botle
function fixIt(){
	console.log("fix It(addapt)");
	let [columns2,lstOfMove2] = state2;
	let newEmptyBotle = -1;
	
	abstract(columns2);
	console.log("lstOfMove2",lstOfMove2);
	
	
	for(let col2=0; col2<columns2.length; col2++){
		let otherCol =theOtherCol(col2)
		
		
		if(otherCol != -1){
			
			//simplest Move
			let firstCol = columns2[col2];
			let secondCol = columns2[otherCol];
			if(firstCol.length +  secondCol.bigBall){
			if(firstCol.content.length > secondCol.content.length){continue}
			}
			
			console.log("move",col2,otherCol);
			move(state2,col2,otherCol);
			
			//the botle we ave free
			if(columns2[col2].isEmpty()){
				newEmptyBotle = col2;
			}
		}
	}
	
	console.log("new empty botle",newEmptyBotle);
	return newEmptyBotle
}

//addapte
//botle who can recive topBall of col2
function theOtherCol(col2){
	let [columns2,lstOfMove2] = state2;

	let thisCol = columns2[col2];
	let theBall = thisCol.top();
	
	let otherCol = columns2.findIndex(
		oCol => columns2.indexOf(oCol) != col2
		&& !oCol.isEmpty()
		&& oCol.top() == theBall
		&& thisCol.bigBall + oCol.content.length <5
	);
	
	
	return otherCol
}

//botle who can recive the topBall of col2
function otherBotle(col2){
	let [columns2,lstOfMove2] = state2;
	
	let otherCol = theOtherCol(col2);
	
	if(otherCol ==-1){
		otherCol = emptyBotle(columns2)
	}/*
	if(otherCol == col2){
		throw Error //debug
	}*/
	return otherCol
}

//addapte
//remove the ball above level2
function free(col2,level2){
	let [columns2,lstOfMove2] = state2;
	let colFrom = columns2[col2];
	//console.log("free",col2,colFrom.content,"level",level2);
	
	if(colFrom.isMonochrome()){return true}
	if(colFrom.isEmpty()){
		console.log("skip for emptyness");
		return true
	}
	if(colFrom.bigBall >1){	//the ball change nothing
		console.log("skip for the bigBall");
		return true
	}
	
	
	let otherCol = otherBotle(col2);
	
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



//free the ball above the level of the last cycle
function addapte(mv2,level){
	let [columns2,lstOfMove2] = state2;
	
	let colFrom = columns2[mv2[0]];
	let colTo = columns2[mv2[1]];
	let newMove = [];
	
	
	
	
	
	
	
	//free from
	console.log("free from",mv2[0]);
	let freeFrom = free(mv2[0],level);
	
	
	//free to
	console.log("free to",mv[1]);
	let freeTo = free(mv2[1],level);
	
		
	if(colFrom.isEmpty()){
		console.log("in the move",mv2,"col from is empty")
		return false
	}if(colFrom.isFinish()){
		console.log("in the move",mv2,"col from is finish");
		
		return false
	}
		
	if(colFrom.top() != colTo.top() && !colTo.isEmpty() ){
		abstract(columns2);
		console.log("Error addapte, the ball are diferent",mv2);
		
		//get new second column
		let otherCol = otherBotle(mv2[0]);
		if(otherCol == mv2[0]){
			return false
		}
		
		console.log("the col",mv2[0],"can go to",otherCol);
		//return
		if(otherCol == -1){
			console.log("Error addapte ",mv2[0],"can go nowhere");
			
			return false
			//throw Error
		}else{
			mv2[1] = otherCol;
		}
	}
	if(colTo.content.length + colFrom.bigBall > 4){
		console.log("the move",mv2,"overFeed");
		return false
	}
	
	move(state2,mv2[0],mv2[1])
	
	return true
}


function finish(){
	let [columns2,lstOfMove2] = state2;
	let finishList = [];
	
	for(let col=0; col<columns2.length; col++){
		let thisCol = columns2[col];
		
		if(thisCol.isEmpty()){
			finishList.push(-1);
				
		}else if(thisCol.isMonochrome()){
			finishList.push(-1)
			
		}else{
			finishList.push(0);
			
			free(col,1);
			
			
			let otherCol = otherBotle(col);
			
			if(otherCol ==-1){
				console.log("\n\nerror finish no col to",col);
				abstract(columns2);
				console.log(lstOfMove2);
		
				//for redcon
				state2 = redcon(state, oldLstOfMove, remainingMove);
				
				let level = 4 //arbitrary
				addaptAll(newLst,level,state2);
				
				
				//throw Error
				continue
			}
			//console.log("otherCol",otherCol);
			if(!columns2[otherCol].isEmpty()){
				move(state2,col,otherCol);
			}
			
			
		}
	}
	//console.log("finish list",finishList);
	
	//kill doublon on finish list
	let finishList2 = new Set(finishList);
	
	//if one col is not finish
	if(finishList2.length > 1 ){
		
		console.log("finish list",finishList2);
		console.log("\n Error finish (addapt)"); 
		
		throw Error	
	}
}


function addaptAll(lastLstOfMove,level,state){
	console.log("\n\naddapt all move");
	console.log("last lst of move",lastLstOfMove);
	
	state2 = state;	//use the same state from main module
	
	//for redcon
	oldLstOfMove = [...lastLstOfMove];
	
	let lstAddaptLater = [];
	let succes = false;	//recursive killer
	
	for(mv of lastLstOfMove){
		//console.log("move",mv);
		//console.log("last lst of move",lastLstOfMove);
		
		//for redcon
		lastMove = mv;
		
		
		//try to addapt
		let failToAddapt = addapte(mv,level);
		
		//if we can't skip it and do it on the next loop
		if(failToAddapt != true){
			console.log("we can't addapt",mv);
			lstAddaptLater.push(mv);
			
		}else{
			succes = true;
		}	//at least we ave addapt one
	}
	
	if(lstAddaptLater.length !=0){
	
		if(succes){
			addaptAll(lstAddaptLater,level,state2);
		
		}else{	//if this loop adapte nothing we are stuck
		
			abstract(state2[0]);
			console.log("move we ave skiped",lstAddaptLater,"\n\n\n");
			
			newLst = lstAddaptLater;
			//throw Error	
		}
	}
	
	
	//abstract(state2[0])
	//console.log("lstOfMove",state2[1]);
	finish();
	return state2
}

module.exports = addaptAll
