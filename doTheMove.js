var Column = require('./column');
var columns = require('./level');
var [move,lstOfMove] = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');



var doTheMove = function(order){/*
	console.log("\n// do the move");
	console.log("list of move already done",lstOfMove);
	console.log("state of the game",columns);
	console.log("what i ave to do",order,"\n");*/

	let from;
	let to;
	
	for(i in order){
		let botle = order[i];
		//console.log("the element n°",botle,i);
		
		if(typeof(botle) == "object"){
			//console.log("it's array",botle);
			from = botle[0];
			to = botle[1];
		}else{
			//console.log("it's not an array",botle,typeof(botle));
			from = botle;
			to = order[i-1];
			
			if(typeof(to) == "object"){
				to = to[0];			
			}	
		}
		//console.log("i move from to",from,to,"\n");
		move(from,to);	
	}
	//finish line
	from = order[0][1];
	to = order[order.length -1];
	//console.log("to",to);
	if(typeof(to) == "object"){
		to = to[0];			
	}	
	//console.log("finish move",from,to);
	move(from,to);
	

	console.log(columns);
	return [columns]
}

module.exports = doTheMove;
