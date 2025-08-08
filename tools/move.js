var Column = require('./column');
var abstract = require('./abstract');

function move(state,from,to){
	//console.log("__move: from:",from,"to:",to);	
	
	let [columns3,lstOfMove3] = state;
	
	if(from ==-1 || to ==-1){
		console.log("error Move, from",from,"to",to);
		throw Error
	}
	
	let colFrom = columns3[from].content;
	let colTo = columns3[to].content;
	
	let ballFrom = colFrom[colFrom.length -1];
	let ballTo = colTo[colTo.length -1];
	
	
	if(columns3[to].isFull()){
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
	if(colTo.length + columns3[from].bigBall >4){
		console.log("\nerror Move, overFeed ",from,to);
		abstract(columns3);
		throw Error;
	}
	
	//we can do the move
	
	colFrom.pop();
	colTo.push(ballFrom);
	for ( let ball =1;ball < columns3[from].bigBall;ball++){
		colFrom.pop();
		colTo.push(ballFrom);
	}
	//console.log("__move: from:",from,columns3[from].content);	
	
	columns3[from].newBigBall();
	columns3[to].newBigBall();
	
	lstOfMove3.push([from,to]);//add the move into the history
}

module.exports = move;
