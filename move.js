var Column = require('./column');
var abstract = require('./abstract');

function move(state,from,to){
	console.log("__move: from:",from,"to:",to);	
	
	let [columns3,lstOfMove3] = state;
	
	if(from ==-1 || to ==-1){
		throw Error("error from",from,"to",to);
	}
	
	let colFrom = columns3[from].content;
	let colTo = columns3[to].content;
	
	let ballFrom = colFrom[colFrom.length -1];
	let ballTo = colTo[colTo.length -1];
	
	
	if(columns3[to].isFull()){
		throw Error("error col is overfeeding",to,colTo);
		//the botle to is not empty
	}else if(ballTo != undefined){
		if(ballFrom != ballTo){
			console.log("error the ball are diferent");
			console.log("  from",from,"col from",colFrom);
			console.log("  to",to,"col to",colTo);
		}
	}
	if(ballFrom == undefined){
		console.log("error no ball From",from,colFrom);
		throw Error(`from ${from}, to ${to}`);
	}
	if(colTo.length + columns3[from].bigBall >4){
		console.log("\nerror lstBigBall from",columns3[from].bigBall);
		abstract(columns3);
		throw Error();
	}
	
	//we can do the move
	
	colFrom.pop();
	colTo.push(ballFrom);
	for ( let ball =1;ball < columns3[from].bigBall;ball++){
		colFrom.pop();
		colTo.push(ballFrom);
	}
	
	columns3[from].newBigBall();
	columns3[to].newBigBall();
	
	lstOfMove3.push([from,to]);//add the move into the history
}

module.exports = move;
