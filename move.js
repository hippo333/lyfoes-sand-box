var Column = require('./column');
var columns = require('./level');
var [bigBall,lstBigBall] = require('./bigBall');

function move(from,to){
	
	let colFrom = columns[from];
	let colTo = columns[to];
	
	//console.log("move: from:",from,"to:",to);	
	let ballFrom = colFrom[colFrom.length -1];
	let ballTo = colTo[colTo.length -1];
	
	
	if(columns[to].length ==4){
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
	if(colTo.length + lstBigBall[from][0] >4){
		console.log("arg");
		console.log("lstBigBall from",lstBigBall[from]);
		return "error";
	}
	//console.log("la colune from contien",lstBigBall[from][0]);
	//bigBall 
	
	colFrom.pop();
	colTo.push(ballFrom);
	for ( let ball =1;ball < lstBigBall[from][0];ball++){
		colFrom.pop();
		colTo.push(ballFrom);
	}
	bigBall(from);
	bigBall(to);
}

module.exports = move;
