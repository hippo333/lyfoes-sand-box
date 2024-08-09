var Column = require('./column');
var bigBall = require('./bigBall')[0];
var lstOfMove = [];


function move(state,from,to){
	//console.log("move: from:",from,"to:",to);	
	
	let [columns3,lstBigBall3,xxx] = state;
	
	if(from ==-1 || to ==-1){
		console.log("there are a probleme with the move",from,to);
	}
	
	let colFrom = columns3[from];
	let colTo = columns3[to];
	
	let ballFrom = colFrom[colFrom.length -1];
	let ballTo = colTo[colTo.length -1];
	
	
	if(columns3[to].length ==4){
		console.log("error the column",to,"is full",colTo)
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
		console.log("lstBigBall from",lstBigBall3[from]);
		return "error";
	}
	//console.log("la colune from contien",lstBigBall3[from][0]);
	//bigBall 
	
	colFrom.pop();
	colTo.push(ballFrom);
	for ( let ball =1;ball < lstBigBall3[from][0];ball++){
		colFrom.pop();
		colTo.push(ballFrom);
	}
	bigBall(columns3,from);
	bigBall(columns3,to);
	lstOfMove.push([from,to]);
}

module.exports = [move, lstOfMove];
