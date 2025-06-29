var column = require('../tools/column');
var columns = require('../level');
var [newVcolumn,Vupdate] = require('../tools/Vcolumn');
var abstract = require('../tools/abstract');
var move = require('../tools/move');


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
let state = [columns0,lstOfMove];

for(let col =0; col< columns0.length; col++){
	let newMove = firstLevel(col,columns0)
	
	if(newMove ==-1){continue}
	
	console.log("new move",newMove);
	move(state, newMove[0], newMove[1]);
	
}


abstract(columns0);











