var Column = require('./column');
var bigBall = require('./bigBall')[0];


function move(state,from,to){
	//console.log("move: from:",from,"to:",to);	
	
	let [columns3,lstBigBall3,lstOfMove3] = state;
	
	if(from ==-1 || to ==-1){
		console.log("error from",from,"to",to);
	}
	
	let colFrom = columns3[from].content;
	let colTo = columns3[to].content;
	
	let ballFrom = colFrom[colFrom.length -1];
	let ballTo = colTo[colTo.length -1];
	
	
	if(columns3[to].isFull()){
		console.log("error col is overfeeding",to,colTo);
		return "error"
		//the botle to is not empty
	}else if(ballTo != undefined){
		if(ballFrom != ballTo){
			console.log("error the ball are diferent",colFrom,colTo);
			return "error"
		}
	}
	if(ballFrom == undefined){
		console.log("error no ball From",from,colFrom);
		return "error"
	}
	if(colTo.length + lstBigBall3[from][0] >4){
		console.log("arg");
		console.log("error lstBigBall from",lstBigBall3[from]);
		return "error";
	}
	//console.log("la colune from contien",lstBigBall3[from][0]);
	//console.log("column from",columns3[from].content);
	//bigBall 
	
	colFrom.pop();
	colTo.push(ballFrom);
	for ( let ball =1;ball < lstBigBall3[from][0];ball++){
		colFrom.pop();
		colTo.push(ballFrom);
	}
	bigBall(state,from);
	bigBall(state,to);
	lstOfMove3.push([from,to]);
}

module.exports = move;
