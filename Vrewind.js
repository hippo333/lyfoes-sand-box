
var Column = require('./column');


function firstBigBall(col,Vcolumn2,columns2){
	let firstBB = 0;
	let Vcol = Vcolumn2[col];
	let theCol = columns2[col].content;
	let theBall = Vcol[0];
	
	let level = Vcol[2]-Vcol[1];	//level of the first ball
	
	
	for(let ball=level; ball<theCol.length; ball++){
			if(theCol[ball] ==theBall){
				firstBB++;
			}else{
				break
			}
		
		
	}
	console.log("first BB",firstBB);
	
	if(firstBB ==0){
		theBall = 0;
	}
	
	Vcol = [theBall, firstBB, firstBB+ level];
	
	return Vcol
}

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
		
		let suspect = [from,to];
		let suspect2 = [from,to];
		let unjustified = colTo[1]
		
		for(let mv=lstOfMove2.length -2;mv>=0;mv--){
			
			if(unjustified == 0 ){break}
			
			let thisMove = lstOfMove2[mv];
			
			//we ave a ball above
			let thePlaceOut = suspect.indexOf(thisMove[0]);
			if(thePlaceOut != -1 ){
				suspect.splice(thePlaceOut,1);
			}
			
			let thePlaceIn = suspect.indexOf(thisMove[1]);
			if(thePlaceIn != -1){
			
				unjustified--
				
				if(thisMove[1] != to){
					colTo[1]--;
					colTo[2]--;
					
					Vcolumn2[thisMove[1]][2]++
					
					if(Vcolumn2[thisMove[1]][0] == colFrom[0]){
						Vcolumn2[thisMove[1]][1]++
						
					}else{
						Vcolumn2[thisMove[1]][0] = colFrom[0];
						
						Vcolumn2[thisMove[1]][1] =1;
					
					}
					
				}
			}
		
		}
		
		if(unjustified > 0){
			console.log(colFrom);
			console.log(colTo);
			console.log("we ave",unjustified,"unjustified");
			colTo = firstBigBall(to,Vcolumn2,columns2);
			
			colFrom[1] += unjustified- colTo[1];
			colFrom[2] += unjustified- colTo[1];
			
		}
		
		lstOfMove2.pop();
		
		Vcolumn2[from] = colFrom;
		Vcolumn2[to] = colTo;
		
	
	}
	
	
}

var columns0 = [
	new Column([7,7,2,5]),
	new Column([2,2,5,2]),
	new Column([5,5,7,7]),
	new Column([]),
	new Column([]),
];

let lstOfMove0 =[ [0, 4], [ 1, 0 ],[1, 3], [0, 1] ];
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
Vrewind([Vcolumn0,lstOfMove0],columns0);/*
Vrewind([Vcolumn0,lstOfMove0],columns0);
Vrewind([Vcolumn0,lstOfMove0],columns0);*/
console.log(Vcolumn0);
console.log(lstOfMove0);



module.exports = Vrewind
