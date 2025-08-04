var column = require('../tools/column');
var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var raining = require('./raining');
var addaptAll = require('./addapt');



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
	//throw Error
}


//empty botle
function fixIt(){
	console.log("fix It");
	let [columns2,lstOfMove2] = state;
	let newEmptyBotle = -1;
	
	abstract(columns2);
	console.log("lstOfMove2",lstOfMove2);
	
	
	for(let col2=0; col2<columns2.length; col2++){
		let otherCol =theOtherCol(col2)
		
		if(otherCol != -1){
			
			console.log("move",col2,otherCol);
			move(state,col2,otherCol);
			
			if(columns2[col2].isEmpty()){
				newEmptyBotle = col2;
			}
		}
	}
	
	
	console.log("new empty botle",newEmptyBotle);
	return newEmptyBotle
}


//make coppy of columns999 with only ground ball
function makeColumns(level){
	let columns2 = [];

	for(col of columns999){
		let thisCol = [...col.content];
		let groundOfCol = thisCol.splice(0,level);
		
		columns2.push(new column(groundOfCol));
		
	}
	
	
	return columns2;
}

//set up






//just search the firstCol with the same color at botom
function firstLevel(col2,columns2){
	
	let firstCol = columns2[col2];
	let firstBall = firstCol.content[0];
	
	for(let col=0; col < columns2.length ; col++){
		if(col == col2){continue};
		
		let secondCol = columns2[col];
		if(secondCol.isEmpty()){continue}
		
		let secondBall = secondCol.content[0];
		if(secondBall != firstBall){continue}
		
		if(col > col2){continue}
		
		return [col2,col]
		
	
	}
	
	return -1 //no move
}

function lstOfFirstMove(columns2){
	let lst = [];

	for(let col =0; col< columns2.length; col++){
		let newMove = firstLevel(col,columns2)
		
		if(newMove ==-1){continue}
		
		//console.log("new move",newMove);
		//move(state, newMove[0], newMove[1]);
		lst.push(newMove);
		
	}
	//abstract(columns2);
	console.log("lst of move for the first level",lst,"\n");
	
	return lst
}



//second level





function cleanFirstLst(columns2){
	//remove all column already solved
	let lstOfFirstMove2 = [];
	for(mv of lstOfFirstMove(columns2)){
		let colFrom = columns2[mv[0]];
		let colTo = columns2[mv[1]];
		
		if(colFrom.isMonochrome() || colFrom.isEmpty()){
			if(colTo.isMonochrome() || colTo.isEmpty()){
				continue
			}	
		}
		lstOfFirstMove2.push(mv);
		
	}
	console.log("lst of first move2",lstOfFirstMove2);
	
	return lstOfFirstMove2
}



//addapte
function theOtherCol(col2){
	let [columns2,lstOfMove2] = state;

	let thisCol = columns2[col2];
	let theBall = thisCol.top();
	
	let otherCol = columns2.findIndex(
		oCol => columns2.indexOf(oCol) != col2
		&& !oCol.isEmpty()
		&& oCol.top() == theBall
		&& columns2[col2].bigBall + oCol.content.length <5
	);
	
	
	return otherCol
}

function main(){
	
	let lastLevel = cleanFirstLst(columns999)
	let columns0 = [];
	let lstOfMove = [];
	
	for(let level=2; level<5; level++){
		columns0 = makeColumns(level);
		lstOfMove = [];
		abstract(columns0);
		state = [columns0,lstOfMove];
		
		
		raining(state);
		//abstract(columns0);
		
		state = addaptAll(lastLevel,level,state);
		console.log("c");
		//abstract(columns0);
		
		lastLevel = lstOfMove;
	}
	
	[columns0,lstOfMove] =state;
	
	abstract(columns0);
	console.log("lst of move ",lstOfMove);
	
}




main();




