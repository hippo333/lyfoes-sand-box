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
	console.log("Error no empty botle");
	abstract(columns2);
	console.log("list Of Move",state[1]);
	return null
}

function makeColumns(){
	let columns2 = [];
	let columns3 = [];

	for(col of columns999){
		let thisCol = [...col.content];
		let groundOfCol = thisCol.splice(0,2);
		
		columns2.push(new column(groundOfCol));
		
		let thisCol3 = [...col.content];
		let mediumOfCol = thisCol3.splice(0,3);
		
		columns3.push(new column(mediumOfCol));
	}
	
	
	return [columns2,columns3];
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
	let [columns2,lstOfMove2] = state;

	let thisCol = columns2[col2];
	let theBall = thisCol.top();
	
	let otherCol = columns2.findIndex(
		oCol => columns2.indexOf(oCol) != col2
		&& !oCol.isEmpty()
		&& oCol.top() == theBall
	);
	
	if(otherCol ==-1){
		otherCol = emptyBotle(columns2)
	}
	
	return otherCol
}

//addapte
function free(col2,level2){
	let [columns2,lstOfMove2] = state;
	console.log("free",col2,columns2[col2].content,"level",level2);
	
	if(columns2[col2].isMonochrome()){return}
	if(columns2[col2].isEmpty()){
		console.log("skip for emptyness");
		return
	}
	if(columns2[col2].bigBall >1){
		console.log("skip for the bigBall");
		return
	}
	
	
	let otherCol = theOtherCol(col2);
	
	if(otherCol ==-1){
	
		console.log("Error Free",col2,"no empty botle");
		abstract(columns0);
		throw Error;
	}
	
	//console.log("move from",col2, columns2[col2].content);
	//console.log("to",otherCol, columns2[otherCol].content);
	move(state,col2,otherCol);
}



function addapte(mv2,level){
	let [columns2,lstOfMove2] = state;
	
	let colFrom = columns2[mv2[0]];
	let colTo = columns2[mv2[1]];
	let newMove = [];
	
	//free from
	//console.log("free from",mv2[0]);
	free(mv2[0],level);
	if(colFrom.content.length -colFrom.bigBall -1 > level){
		abstract(columns2);
		console.log("Error fail to free from",mv2[0],colFrom.content);
		throw Error
	
	}
	
	//free to
	//console.log("free to",mv[1]);
	free(mv2[1],level);
	if(colTo.content.length -colTo.bigBall -1 > level){
		abstract(columns2);
		console.log("Error fail to free from",mv2[1],colTo.content);
		throw Error
	
	}
	
	if(colFrom.top() != colTo.top() && !colTo.isEmpty()){
		abstract(columns2);
		console.log("Error addapte, the ball are diferent",mv2);
		return
		//throw Error
	}
	
	move(state,mv2[0],mv2[1])
}

function addaptAll(lastLstOfMove,level){
	console.log("addapt all move");
	console.log("last lst of move",lastLstOfMove);
	
	
	for(mv of lastLstOfMove){
		console.log("move",mv);
		addapte(mv,level);
	
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
	
	
	[columns0,columns3] = makeColumns();
	abstract(columns0);
	state = [columns0,lstOfMove];
	
	//mySol();	//debug
	raining(state);
	//abstract(columns0);
	
	let firstList = cleanFirstLst()
	addaptAll(firstList,1);
	//abstract(columns0);
	
	finish();
	abstract(columns0)
	console.log("lstOfMove",lstOfMove);
	//finish second ball
	
	
	//third ball
	console.log("\n\n third ball");
	abstract(columns3);
	let lstOfMove3 = [];
	state = [columns3,lstOfMove3];
	
	raining(state);
	abstract(columns3);
	
	addaptAll(lstOfMove,2);
	abstract(columns3);
	console.log("lst of move 3",lstOfMove3);
}




main();




