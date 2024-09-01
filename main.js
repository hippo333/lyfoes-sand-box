var startTime = new Date().getTime();
var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');
var doTheMove = require('./doTheMove');
var coppy = require('./coppy');
var CrissCross = require('./crissCross');
var lstOfMove = [];

let firstState = [columns,lstBigBall,lstOfMove];
let lstOfStates = [firstState];

for(let col of columns){
	console.log(col.content);
}

function doAllMove(state,lstCrissCross){
	let newState = [];
	
	
	for(way in lstCrissCross){
		if(way != lstCrissCross.length-1){
			newState = coppy(state);
			lstOfStates.push(newState)
		}else{
			newState = state;
		}
		doTheMove(newState,lstCrissCross[way]);
	}
}

function isFinish(lstBigBall2){
	//console.log("is finish ?");
	
	for(col in lstBigBall2){
		if(lstBigBall2[col][0] != 0 && lstBigBall2[col][1] ==0){
			console.log("no the col",col,"is not finish");
			console.log(lstBigBall2);
			return false
		}
	}
	//console.log("all is finish");
	return true
}



	//first Cycle
let thisCc ;
let thisState =[];
for(let i=0;i<5;i++){

	console.log("\n",i,"step");
	console.log(" ",lstOfStates.length,"way");
	
	for(j in lstOfStates){
		thisState = lstOfStates[j];
		thisCc = CrissCross(thisState);
				//console.log("\nthisstate",thisState[0]);
	
		if(thisCc.length ==0){
			console.log("\nno move posible");
			if(isFinish(thisState[1])){
			
				console.log("it works");
				var end = new Date().getTime();
				var time = end - startTime;
				console.log("calcul in",time/1000,"s");
				console.log(thisState[2]);
				return
				
			}else{
				console.log("what can i do ?\n",thisState[0]);
				lstOfStates.splice(j,1);
				continue;
			}
		}else{
		//console.log("this crisscross",thisCc);
		//console.log("history of move",thisState[2]);
		doAllMove(thisState,thisCc);
		}
	}
}

