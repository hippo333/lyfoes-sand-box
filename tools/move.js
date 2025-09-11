var Column = require('./column');
var abstract = require('./abstract');

function move(state,from,to){
	//console.log("__move: from:",from,"to:",to);	
	
	let [columns2,lstOfMove2] = state;
	
	if(from ==-1 || to ==-1){
		console.log("error Move, from",from,"to",to);
		throw Error
	}
	
	let colFrom = columns2[from].content;
	let colTo = columns2[to].content;
	
	let ballFrom = colFrom[colFrom.length -1];
	let ballTo = colTo[colTo.length -1];
	
	let bigBallFrom = columns2[from].bigBall;
	
	
	if(columns2[to].isFull()){
		console.log("error Move, col is overfeeding",to,colTo);
		throw Error
		
		//the botle to is not empty
	}else if(ballTo != undefined){
		if(ballFrom != ballTo){
			console.log("error Move, the ball are diferent");
			console.log("  from",from,"col from",colFrom);
			console.log("  to",to,"col to",colTo);
			throw Error
		}
	}
	if(ballFrom == undefined){
		console.log("\nerror Move, no ball From",from,colFrom);
		console.log(`from ${from}, to ${to}`);
		throw Error;
	}
	if(colTo.length + bigBallFrom >4){
		console.log("\nerror Move, overFeed ",from,to);
		abstract(columns2);
		throw Error;
	}
	
	//we can do the move
	
	colFrom.pop();
	colTo.push(ballFrom);
	for ( let ball =1;ball < bigBallFrom;ball++){
		colFrom.pop();
		colTo.push(ballFrom);
	}
	//console.log("__move: from:",from,columns2[from].content);	
	
	columns2[from].newBigBall();
	columns2[to].newBigBall();
	
	lstOfMove2.push([from,to,bigBallFrom]);//add the move into the history
}

module.exports = move;
