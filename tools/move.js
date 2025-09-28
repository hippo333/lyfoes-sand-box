var Column = require('./column');
var abstract = require('./abstract');

function move(state,from,to){
	//console.log("__move: from:",from,"to:",to);	
	
	let [columns2,lstOfMove2] = state;
	
	/*if(from ==5 && to==4 ){
		abstract(columns2);
		console.log("lstOfMove",lstOfMove2);
		throw Error("the error");
	}//debug*/
	
	
	
	if(from ==-1 || to ==-1){
		throw Error("error invalid argument, from",from,"to",to);
	}
	
	let colFrom = columns2[from].content;
	let colTo = columns2[to].content;
	
	let ballFrom = colFrom[colFrom.length -1];
	let ballTo = colTo[colTo.length -1];
	
	let bigBallFrom = columns2[from].bigBall;
	
	
	if(columns2[to].isFull()){
		abstract(columns2);
		console.log("\nlstOfMove",lstOfMove2);
		console.log("from",from,"to",to);
		throw Error("error Move, col is overfeeding",to,colTo);
		
		//the botle to is not empty
	}else if(ballTo != undefined){
		if(ballFrom != ballTo){
			console.log("\nfrom",from,"col from",colFrom);
			console.log("to",to,"col to",colTo);
			throw Error("error Move, the ball are diferent");
		}
	}
	if(ballFrom == undefined){
		console.log(`\nfrom ${from}, to ${to}`);
		throw Error("error Move, no ball From",from,colFrom);
	}
	if(colTo.length + bigBallFrom >4){
		console.log("\n");
		abstract(columns2);
		throw Error("error Move, overFeed ",from,to);
	}
	
	//we can do the move
	
	
	colFrom.pop();
	colTo.push(ballFrom);
	for ( let ball =1;ball < bigBallFrom;ball++){
		colFrom.pop();
		colTo.push(ballFrom);
	}//*/
	//console.log("__move: from:",from,columns2[from].content);	
	
	columns2[to].bigBall += bigBallFrom;
	columns2[from].newBigBall();
	//columns2[to].newBigBall();
	
	lstOfMove2.push([from,to,bigBallFrom]);//add the move into the history
}

module.exports = move;
