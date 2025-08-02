var column = require('../tools/column');
var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var raining = require('./raining');


let columns2 = [];
let lstOfMove2 = [];
let state = [columns2,lstOfMove2];


function whatIsTheProblem(state,oldLstOfMove,remainingMove){
	console.log("\n\n\n\n\nredcon");
	console.log("what is the probleme?");
	
	[columns2,lstOfMove2] = state;
	
	
	abstract(columns2);
	console.log("lstOfMove",lstOfMove2);
	console.log("old lst of move",oldLstOfMove);
	console.log("remaining move",remainingMove);
	
	let lstTwin = findTwinColumn();
	
	
	console.log("lst twin",lstTwin);	
		
	
	
	
	throw Error
}

//get all column who ave the same top than an other
function findTwinColumn(){
	console.log("find twinsColumn");
	let output = [];
	
	for(let col=0;col<columns2.length; col++){
		let thisCol = columns2[col];
		
		let secondCol = otherCol(col);
		
		if(secondCol ==-1){continue}
		
		output.push([col,secondCol]);
		
		
	}

	return output
}
function otherCol(col2){
	//console.log("otherCol",col2);
	
	let theCol = columns2[col2];
	let theBall = theCol.top();
	
	let secondCol = columns2.findIndex(
		sdCl => columns2.indexOf(sdCl) > col2	//anty dublon anty col2
		&& sdCl.top() == theBall
		
	)
	
	//console.log("secondCol",secondCol);
	return secondCol
}

/*
function revers(state,mv2){
	console.log("revers");
	let [columns2,lstOfMove2] = state;
	
	let [from,to] = mv2;
	let lastFrom = columns2[from];
	let lastTo = columns2[to];
	let theBall = lastTo.top();
	
	for(let bll=0; bll<lastTo.bigBall; bll++){
		lastFrom.content.push(theBall);
		lastTo.content.pop();
		
		
	}
	lastFrom.newBigBall();
	lastTo.newBigBall();
	
	correct(lstOfMove2,mv2,[to,from]);
	
	
}
*/
/*
function correct(lstOfMove2,mv2,mv3){
	console.log("correct");
	
	let index = lstOfMove2.findIndex(
		id => id[0] ==mv2[0]
		&& id[1] == mv2[1]
		
	);
	console.log("index",index);
	
	lstOfMove2.splice(index,1,mv3);
	
	console.log("lstOfMove2",lstOfMove2);
	
}

*/






module.exports = whatIsTheProblem;
