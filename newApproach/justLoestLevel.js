var column = require('../tools/column');
var columns999 = require('../level');
var [newVcolumn,Vupdate] = require('../tools/Vcolumn');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var raining = require('./raining');



function emptyBotle(columns2){
	
	for(let col=0 ; col<columns2.length; col++){
		if(columns2[col].isEmpty()){return col}
		
	}
	//else
	return null
}

function makeColumns(){
	let columns2 = [];

	for(col of columns999){
		let thisCol = [...col.content];
		let groundOfCol = thisCol.splice(0,2);
		let firstBall = groundOfCol[0];
		
		if(firstBall == undefined){
			firstBall = null
		}
		columns2.push(new column(groundOfCol));
	}

	return columns2;
}

//set up



//manual solution
let lstOfMove = [];
let columns0 = [];
let state = [columns0,lstOfMove];

let mySolution = [
	[8,13],[10,13],[11,13],
	[9,8],[12,8],[10,6],[1,11],[4,9],[4,12],[7,1],
	[0,4],[0,13],
	[2,0],[2,7],
	[3,2],[5,10],[5,3]
];

function mySol(){
	
	for(mv of mySolution){
		move(state,mv[0],mv[1]);
	}
	
	abstract(columns0);
	console.log("i ave finish");
	throw Error
}	

//mySol();









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

function lstOfFirstMove(){
	let lst = [];

	for(let col =0; col< columns0.length; col++){
		let newMove = firstLevel(col,columns0)
		
		if(newMove ==-1){continue}
		
		//console.log("new move",newMove);
		//move(state, newMove[0], newMove[1]);
		lst.push(newMove);
		
	}
	//abstract(columns0);
	console.log("lst of move for the first level",lst,"\n");
	
	return lst
}



//second level





function cleanFirstLst(){
	//remove all column already solved
	let lstOfFirstMove2 = [];
	for(mv of lstOfFirstMove()){
		let colFrom = columns0[mv[0]];
		let colTo = columns0[mv[1]];
		
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
	let thisCol = columns0[col2];
	let theBall = thisCol.top();
	
	let otherCol = columns0.findIndex(
		oCol => columns0.indexOf(oCol) != col2
		&& !oCol.isEmpty()
		&& oCol.top() == theBall
	);
	
	if(otherCol ==-1){
		otherCol = emptyBotle(columns0)
	}
	
	return otherCol
}

//addapte
function free(col2,level2){
	//console.log("free",col2,columns0[col2].content,"level",level2);
	
	if(columns0[col2].isMonochrome()){return}
	
	let otherCol = theOtherCol(col2);
	
	if(otherCol ==-1){
	
		console.log("Error Free",col2,"no empty botle");
		abstract(columns0);
		throw Error;
	}
	
	//console.log("move from",col2, columns0[col2].content);
	//console.log("to",otherCol, columns0[otherCol].content);
	move(state,col2,otherCol);
}



function addapte(mv2,level){
	let colFrom = columns0[mv2[0]];
	let colTo = columns0[mv2[1]];
	let newMove = [];
	
	//free from
	//console.log("free from",mv2[0]);
	free(mv2[0],level);
	
	//free to
	//console.log("free to",mv[1]);
	free(mv2[1],level);
	
	
	
	move(state,mv2[0],mv2[1])
}

function addaptAll(){
	console.log("addapt all move");
	
	let lstOfFirstMove2 = cleanFirstLst();
	for(mv of lstOfFirstMove2){
		addapte(mv,1);
	
	}
}


let finishList = [];
function finish(){
	
	for(let col=0; col<columns0.length; col++){
		let thisCol = columns0[col];
		
		if(thisCol.isEmpty()){
			finishList.push(-1);
				
		}else if(thisCol.isMonochrome()){
			finishList.push(-1)
			
		}else{
			finishList.push(0);
			free(col,1);
			
			
			let otherCol = theOtherCol(col);
			if(!columns0[otherCol].isEmpty()){
				move(state,col,otherCol);
			}
			
			
		}
	}
	//console.log("finish list",finishList);
}

function main(){
	
	
	columns0 = makeColumns();
	abstract(columns0);
	state = [columns0,lstOfMove];
	
	//mySol();	//debug
	raining(state);
	//abstract(columns0);
	
	addaptAll();
	//abstract(columns0);
	
	finish();
	abstract(columns0)
}




main();




