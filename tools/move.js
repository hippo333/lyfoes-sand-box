var Column = require('./column');
var abstract = require('./abstract');

let nbMaxBall = 4

function move(state,from,to){
	//console.log("__move: from:",from,"to:",to);	
	
	let [columns2,lstOfMove2] = state;
	
	if(lstOfMove2.length ==0){	//at begening
		nbMaxBall = columns2[0].length0;
	}
	
	
	
	if(from ==-1 || to ==-1){
		console.log("from",from,"to",to);
		throw Error("error invalid argument, from");
	}
	
	//debug
	//console.log("from",columns2[from].top0);
	//console.log("to",columns2[to].top0);
			
	let colFrom = columns2[from].content;
	let colTo = columns2[to].content;
	
	let ballFrom = columns2[from].top0;
	let ballTo = columns2[to].top0;
	
	let bigBallFrom = columns2[from].bigBall;
	
	
	if(columns2[from].isEmpty()){
		console.log("\nError");
		abstract(columns2);
		console.log(from,to);
		throw Error("colFrom is empty");
		
	}else if(ballFrom != ballTo && colTo.length >0){
		console.log("\nError");
		abstract(columns2);
		console.log(from,to);
		throw Error("the ball are different");
		
	}else if(columns2[to].isFull0){
		abstract(columns2);
		console.log("\nlstOfMove",lstOfMove2);
		console.log("from",from,"to",to);
		throw Error("error Move, to is already full");
		
		//the botle to is not empty
	}else if(ballTo != undefined){
		if(ballFrom != ballTo){
			console.log("\nfrom",from,"col from",colFrom);
			console.log("to",to,"col to",colTo);
			console.log("ballFrom",ballFrom,"ballTo",ballTo);
			//console.log("from",columns0[from].top0);
			//console.log("to",columns0[to].top0);
			throw Error("error Move, the ball are diferent");
		}
	}
	if(ballFrom == undefined){
		console.log(`\nfrom ${from}, to ${to}`);
		throw Error("error Move, no ball From");
	}
	if(colTo.length + bigBallFrom > nbMaxBall){
		console.log("\nError");
		console.log("colTo",colTo);
		console.log("bigBallFrom",bigBallFrom);
		abstract(columns2);
		console.log(from,to);
		console.log("nbMaxBall",nbMaxBall);
		throw Error("error Move, overFeed ");
	}
	
	//we can do the move
	
	
	colFrom.pop();
	colTo.push(ballFrom);
	for ( let ball =1;ball < bigBallFrom;ball++){
		colFrom.pop();
		colTo.push(ballFrom);
	}//*/
	//console.log("__move: from:",from,columns2[from].content);	
	
	//columns2[to].bigBall += bigBallFrom;
	
	columns2[from].nbMaxBall = nbMaxBall;
	columns2[to].nbMaxBall = nbMaxBall;
	
	columns2[from].updateFrom();
	columns2[to].updateTo(ballFrom,bigBallFrom);
	
	lstOfMove2.push([from,to,bigBallFrom]);//add the move into the history
}

module.exports = move;
