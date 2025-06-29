var column = require('../tools/column');
var columns = require('../level');
var [newVcolumn,Vupdate] = require('../tools/Vcolumn');
var abstract = require('../tools/abstract');


let groundLevel = [];
let columns0 = [];

for(col of columns){
	let groundOfCol = col.content.splice(1,1);
	groundLevel.push(groundOfCol);
	columns0.push(new column(groundOfCol));
}

console.log(groundLevel);
//abstract(columns0);

let Vcolumn0 = newVcolumn(columns0);
console.log(Vcolumn0);

//set up




let columns1 = groundLevel;

/*
//not already usefule
function isMonochrome(column2){
	//column0 is an array
	if(column2[2] <2){return false}
	
	if(Vcolumn2[1] == Vcolumn2[2]){
		return true
		
	}else{
		return false
	}
}


function getColor(idColFrom,Vcolumn2){

	let colFrom = Vcolumn2[idColFrom];
	let theBall = colFrom[0];	//top ball
	let resquieSolution = -1;
	
	for(let col=0;col<Vcolumn2.length; col++){
		let thisCol = Vcolumn2[col];
		
		if(thisCol[2] ==0){continue};
		if(col == idColFrom){continue}
		
		if(thisCol[0] != theBall){continue}
		
		if(isMonochrome(thisCol)){return col}
		
		if(thisCol[2] ==1){
			if(colFrom[2] ==1){
				if(col < idColFrom){
					return col	
				}	
			}
		}
		
	}
	return -1 //no move possible
}*/
//



/*
//[color,[colA,colB]]
let indexOfColor = [];

function getColor(color){
	for(let idColor=0; idColor< indexOfColor.length; idColor++){
		if(indexOfColor[idColor][0] ==color){return indexOfColor[idColor]}
		
	}
	//if it dosen't exist yet
	//create it
	indexOfColor.push([color,[]]);
	
	//return index
	return indexOfColor.slice(-1)[0]
	
}

function addToColor(color,col2){
	let theColor = getColor(color);
	console.log("theColor",theColor);
	let theCols = theColor[1];
	
	if(theCols.indexOf(col2) == -1){
		theCols.push(col2);
	}
	
	
}*/

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

let lstOfMove = [];

for(let col =0; col< columns0.length; col++){
	let newMove = firstLevel(col,columns0)
	
	if(newMove ==-1){continue}
	
	console.log(newMove);
}












