var Column = require('./column');
var move = require('./move')[0];


var doTheMove = function(state,order){/*
	console.log("\n// do the move");
	console.log("list of move already done",lstOfMove);
	console.log("state of the game",columns);
	console.log("what i ave to do",order,"\n");*/
	
	[columns2,lstBigBall,lstOfMove] = state;

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
		move(state,from,to);	
	}
	//finish line
	from = order[0][1];
	to = order[order.length -1];
	//console.log("to",to);
	if(typeof(to) == "object"){
		to = to[0];			
	}	
	//console.log("finish move",from,to);
	move(state,from,to);
	

	console.log(columns2);
	return [columns2]
}

module.exports = doTheMove;
