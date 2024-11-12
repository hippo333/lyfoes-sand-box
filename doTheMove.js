var Column = require('./column');
var move = require('./move');
var abstract = require('./abstract');


var doTheMove = function(state,order){
	//console.log("// do the move");
	
	[columns2,lstOfMove] = state;
	//console.log("state of the game");
	//abstract(columns2);
	//console.log("list of move already done",lstOfMove);
	//console.log("what i ave to do",order);

	let from;
	let to;
	
	for(i in order){
		let botle = order[i];
		//console.log("the element n°",botle,i);
		
		if(typeof(botle) == "object"){	// first move
			//console.log("it's array",botle);
			from = botle[0];
			to = botle[1];
		}else{
			//console.log("it's not an array",botle,typeof(botle));
			from = botle;
			to = order[i-1];
			
			if(typeof(to) == "object"){	//to color
				to = to[0];			
			}	
		}
		//console.log("i move from to",from,to,"\n");
		move(state,from,to);	
	}

	//console.log("the result");
	//abstract(columns2);
	return [columns2]
}

module.exports = doTheMove;
