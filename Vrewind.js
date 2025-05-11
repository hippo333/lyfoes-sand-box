
var Column = require('./column');

function Vrewind([Vcolumn2,lstOfMove2],columns2){

	let lastMove = lstOfMove2[lstOfMove2.length-1];
	
	let [from,to] = lastMove;
	let colFrom = Vcolumn2[from];
	let colTo = Vcolumn2[to]
	console.log(from,colFrom);
	console.log(to,colTo);
	
	if(colTo[2] == 1){
		console.log("a");
		let newHeigh = colFrom [2] +colTo[2];
		colFrom = [...colTo];
		colFrom[2] = newHeigh;
		
		colTo = [0,0,0];
		lstOfMove2.pop();
		
		Vcolumn2[from] = colFrom;
		Vcolumn2[to] = colTo;
		return
	}
	if(colFrom[2] == 3){
		console.log("b");
		colFrom = [...colTo];
		colFrom[2] = 4;
		colFrom[1] = 1;
		
		colTo[2] -= 1;
		colTo[1] -= 1;
		lstOfMove2.pop();
		
		Vcolumn2[from] = colFrom;
		Vcolumn2[to] = colTo;
		console.log(from,colFrom);
		console.log(to,colTo);
		return
	
	}else{
		console.log("c");
		
		
		colFrom[0] = colTo[0];
		colFrom[2] += 1;
		colFrom[1] = 1;
		
		colTo[2] -= 1;
		colTo[1] -= 1;
		
		let setFrom = false;
		let setTo = false;
		for(let mv=lstOfMove2.length-2;mv >=0;mv--){
			let thisMv = lstOfMove2[mv];
			
			console.log("mv",mv);
			console.log("thismv",thisMv);
					console.log(from,colFrom);
					console.log(to,colTo);
			if(thisMv[0] ==to){
				setTo = true;
				console.log("setTo");
				//one ball for begening
			}if(thisMv[1] ==to){
				if(!setTo){
					console.log("\nfeed to");
					setTrue = true;
					
					
					console.log(from,colFrom);
					console.log(to,colTo);
					
					
					break;
				}
				//one ball for begening
			}if(thisMv[0] ==from){
				setFrom == true;
				console.log("set from");
				//one ball for begening
				
			}
			if(thisMv[1] ==from){
				if(!setFrom){
					setFrom = true;
					console.log("\nfeed from");
					
								
					colFrom[2] += 1;
					colFrom[1] += 1;
					
					colTo[2] -= 1;
					colTo[1] -= 1;
					//v update col to
					console.log(from,colFrom);
					console.log(to,colTo);
					
					break
				}
				//one ball for begening
			}
		}
		
		
		
		lstOfMove2.pop();
		
		Vcolumn2[from] = colFrom;
		Vcolumn2[to] = colTo;
		
	
	}
	
	
}

var columns0 = [
	new Column([7,7,2]),
	new Column([2,2,5,2]),
	new Column([5,5,7,7]),
	new Column([]),
	new Column([5]),
];

let lstOfMove0 =[ [ 1, 0 ],[1, 3], [0, 1] ];
let Vcolumn0 = [ [ 7, 2, 2 ], [ 2, 4, 4 ], [ 7, 2, 4 ], [ 5, 1, 1 ], [ 5, 1, 1 ] ];
/*
var columns0 = [
	new Column([7,7,7,2]),
	new Column([2,2,2,5]),
	new Column([5,5,5,7]),
	new Column([]),
	new Column([]),
];

let lstOfMove0 =[ [ 0, 3 ], [ 2, 0 ], [ 1, 2 ], [ 3, 1 ] ];
let Vcolumn0 = [ [ 7, 4, 4 ], [ 2, 4, 4 ], [ 5, 4, 4 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];*/


Vrewind([Vcolumn0,lstOfMove0],columns0);
console.log(Vcolumn0);
console.log(lstOfMove0);



module.exports = Vrewind
