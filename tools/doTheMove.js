var Column = require('./column');
var move = require('./move');
var abstract = require('./abstract');


var doTheMove = function(state,order){
	//console.log("// do the move");
	
	let [columns2,lstOfMove] = state;
	let from;
	let to;
	
	for(botle order){
		
		if(typeof(botle) == "object"){	
			from = botle[0];
			to = botle[1];
		}else{
			from = botle;
			to = order[i-1];
			
			if(typeof(to) == "object"){	//to color
				to = to[0];			
			}	
		}
		move(state,from,to);	
	}

	return state
}

module.exports = doTheMove;
