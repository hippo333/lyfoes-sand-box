

var abstract = require('../tools/abstract');
var move = require('../tools/move');
var redcon = require('./redCon');


let state =[];

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
	console.log("\nfix It(addapt)");
	let [columns,lstOfMove] = state;
	let newEmptyBotle = -1;
	
	abstract(columns);
	console.log("lstOfMove",lstOfMove);
	
	
	for(let col2=0; col2<columns.length; col2++){
		let otherCol =theOtherCol(col2)
		
		
		if(otherCol != -1){
			
			//simplest Move
			let firstCol = columns[col2];
			let secondCol = columns[otherCol];
			if(firstCol.length +  secondCol.bigBall){
			if(firstCol.content.length > secondCol.content.length){continue}
			}
			
			console.log("move",col2,otherCol);
			
			
			move(state,col2,otherCol);
			
			//the botle we ave free
			if(firstCol.isEmpty()){
				newEmptyBotle = col2;
				
			}else if(firstCol.content.length ==1){	//to specific
				col2--;//if we can free the ball under
			}
		}
	}
	
	console.log("new empty botle",newEmptyBotle);
	return newEmptyBotle
}

//addapte
//botle who can recive topBall of col2
function theOtherCol(col2,theBall){
	let [columns,lstOfMove] = state;

	let thisCol = columns[col2];
	let bigBll = -1;
	
	if(theBall == undefined){
		theBall = thisCol.top();
		bigBll = thisCol.bigBall;
	}else{
		bigBll =1;	//if theBall is not on the top
	}
	
	
	let otherCol = columns.findIndex(
		oCol => columns.indexOf(oCol) != col2
		&& !oCol.isEmpty()
		&& oCol.top() == theBall
		&& bigBll + oCol.content.length <5
	);
	
	
	return otherCol
}

//botle who can recive the topBall of col2
function otherBotle(col2){
	let [columns,lstOfMove] = state;
	
	let otherCol = theOtherCol(col2);
	
	if(otherCol ==-1){
		otherCol = emptyBotle(columns)
	}/*
	if(otherCol == col2){
		throw Error //debug
	}*/
	return otherCol
}

//addapte
//remove the ball above level2
function free(col2,level2){
	let [columns,lstOfMove] = state;
	
	let colFrom = columns[col2];
	console.log("free (addapt)",col2,colFrom.content,"level",level2);
	
	
	if(colFrom.isMonochrome()){return true}
	if(colFrom.isEmpty()){
		//console.log("skip for emptyness");
		return true
	}
	if(colFrom.bigBall >1){	//the ball change nothing
		//console.log("skip for the bigBall");
		return true
	}
	
	let otherCol = otherBotle(col2);
	
	if(otherCol ==-1){
		console.log("Error Free",col2,"no other column");
		//abstract(columns);
		return false;
	}
	
	//console.log("move from",col2, colFrom.content);
	//console.log("to",otherCol, columns[otherCol].content);
	move(state,col2,otherCol);
	
	
	if(colFrom.content.length -colFrom.bigBall > level2){
		abstract(columns);
		console.log("Error fail to free from",mv2[0],colFrom.content);
		throw Error
	
	}
	return true
}



//free the ball above the level of the last cycle
function addapte(mv2,level){
	let [columns,lstOfMove] = state;
	
	let colFrom = columns[mv2[0]];
	let colTo = columns[mv2[1]];
	let newMove = [];
	
	
	
	
	
	
	
	//free from
	//console.log("free from",mv2[0]);
	let freeFrom = free(mv2[0],level);
	
	
	//free to
	//console.log("free to",mv[1]);
	let freeTo = free(mv2[1],level);
	
		
	if(colFrom.isEmpty()){
		//console.log("in the move",mv2,"col from is empty")
		return false
	}if(colFrom.isFinish()){
		//console.log("in the move",mv2,"col from is finish");
		return false
	}
		
	if(colFrom.top() != colTo.top() && !colTo.isEmpty() ){
		abstract(columns);
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
	
	
	move(state,mv2[0],mv2[1])
	
	return true
}


function isFinished(){
	console.log("isFinished");
	
	let [columns,lstOfMove] = state;

	let unFinishedCol = columns.findIndex(
		col => !col.isFinish()
		&& !col.isEmpty()
	);
	
	console.log("un finished col",unFinishedCol);
	
	if(unFinishedCol ==-1){
		return true
	}
	return false
}


function finish(){
	//console.log("finish (addapt)");
	
	let [columns,lstOfMove] = state;
	let finishList = [];
	
	
	neutralMove();
	
	for(let col=0; col<columns.length; col++){
		let thisCol = columns[col];
		//console.log("\nfinish",col,thisCol.content);
		
		if(thisCol.isEmpty()){
			finishList.push(-1);
				
		}else if(thisCol.isFinish()){
			finishList.push(-1)
			
		}else{
			finishList.push(0);
						
			free(col,0);
			
			
			let otherCol = otherBotle(col);
			
			if(otherCol ==-1){
				console.log("\n\nerror finish no col to",col);
				abstract(columns);
				console.log(lstOfMove);
		
				//for redcon
				redcon(state);
						
				neutralMove();
			
				let level = 4 //arbitrary
				addaptAll(newLst,level,state);
				return
				
			}
			//console.log("otherCol",otherCol);
			if(!columns[otherCol].isEmpty()){
				move(state,col,otherCol);
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

function neutralMove(){
	console.log("neutral move (addapt)");
	
	let [columns,lstOfMove] = state;
	let lstThirdUp = [];	//only one ball under the BigBall
	
	abstract(columns);
	let emptyBtl = emptyBotle(columns);
	
	if(emptyBtl ==-1){
		console.log("\nError neutralMove, no empty botle");
		
		return
		//throw Error
	
	}
	
	for(let col=0; col<columns.length; col++){
		let thisCol = columns[col];
		
		if(thisCol.isEmpty()){continue}
		if(thisCol.isFinish()){continue}
		if(thisCol.isMonochrome()){continue};
		if(thisCol.content.length < 4){continue}
		
		//one ball under the bigBall
		if(thisCol.content.length > thisCol.bigBall +1){continue}
		
		lstThirdUp.push(col);		
	}
	
	console.log("lstThirdUp",lstThirdUp);
	
	for(let id=0; id<lstThirdUp.length; id++){
		let col = lstThirdUp[id];
		
		let theBall = columns[col].content[0];//ball under the bigball
		console.log("the ball",theBall);
		
		let otherCol = theOtherCol(col,theBall)
		
		if(otherCol != -1){
		
			move(state,col,emptyBtl);
			
			move(state,col,otherCol);
			
			emptyBtl = col;
		
		}
	}
	
	abstract(columns);
	
	//throw Error
}


function addaptAll(lastLstOfMove,level,state2){
	console.log("\n\naddapt all move");
	console.log("last lst of move",lastLstOfMove);
	
	state = state2;	//use the same state from main module
	
	let [columns2,lstOfMove2] = state;
	
	
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
			//console.log("we can't addapt",mv);
			let lastFr = mv[0];
			let lastFrom = columns2[lastFr]
			
			if(lastFrom.isFinish()){continue}//the move is pointless
			if(lastFrom.isMonochrome()){
				if(lastFrom.content.length >2){continue}//not sure about that
			}
		
			lstAddaptLater.push(mv);
			
		}else{
			succes = true;
		}	//at least we ave addapt one
	}
	
	if(lstAddaptLater.length !=0){
	
		if(succes){
			addaptAll(lstAddaptLater,level,state);
		
		}else{	//if this loop adapte nothing we are stuck
		
			abstract(columns2);
			console.log("move we ave skiped",lstAddaptLater,"\n\n\n");
			
			newLst = lstAddaptLater;
			//throw Error	
		}
	}
	
	
	//abstract(state[0])
	//console.log("lstOfMove",state[1]);
	finish();
	
	return state
}

module.exports = addaptAll
