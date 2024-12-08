var startTime = new Date().getTime();
var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var doTheMove = require('./doTheMove');
var coppy = require('./coppy');
var CrissCross = require('./crissCross');
var lstOfMove = [];
var abstract = require('./abstract');

let firstState = [columns,lstOfMove];
let lstOfStates = [firstState];

for(let col of columns){
	console.log(col.content);
}

function doAllMove(state,lstCrissCross){
	//console.log("\n  do all move");
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

function emptyBotle(columns2){
	for(col in  columns2){
		if(columns2[col].isEmpty()){return col}
	}
	return null
}

function trySecond(state,emptyBtl){
	//console.log("try second");	
	//console.log("    empty botle",emptyBtl);
	let newState = [];
	let columns3 =state[0];
	
	
	for(col7 in columns3){
		if(columns3[col7].content.length ==0){continue}
		if(col7 ==emptyBtl){continue}
		
		if(col7 != columns3.length-1){
			newState = coppy(state);
			lstOfStates.push(newState)
		}else{
			newState = state;
		}
		doTheMove(newState,[[col7,emptyBtl]]);
	}
}

function isFinish(columns2){
	//console.log("is finish ?");
	
	for(col in columns2){
		if(columns2[col].bigBall != 0 && columns2[col].color ==0){
			//console.log("no the col",col,"is not finish");
			//console.log(lstBigBall2);
			return false
		}
	}
	//console.log("all is finish");
	return true
}



	//first Cycle
let finish = false;
let countOfDeadStates =0
let thisCc ;
let thisState =[];
for(let i=0;i<7;i++){

	console.log("\n",i,"step");
	console.log(" ",lstOfStates.length,"way");
	console.log("  dead states",countOfDeadStates);
	countOfDeadStates = 0;
	
	for(j in lstOfStates){
		thisState = lstOfStates[j];
		thisCc = CrissCross(thisState);
		//abstract(thisState[0]);
	
		if(thisCc.length ==0){
			//console.log("\nno move posible");
			if(isFinish(thisState[0])){
			
				console.log("it works");
				console.log("on",thisState[1].length,"move");
				var end = new Date().getTime();
				var time = end - startTime;
				finish = true;
				console.log("calcul in",time/1000,"s");
				console.log(thisState[1]);
				abstract(thisState[0]);
				return
				
			}else{
				let emptyBtl = emptyBotle(thisState[0]);
				if (emptyBtl == null){
					console.log("what can i do ?\n");
					abstract(thisState[0]);
					lstOfStates.splice(j,1);
					countOfDeadStates++;
					continue;
				}else {
					if(lstOfStates.length > 2){continue}//random
					//it work only for last way
					
					console.log("\ntry second ball");
					trySecond(thisState,emptyBtl)
					continue;
				}
			}
		}else{/*
		console.log("this crisscross",thisCc);
		console.log("history of move",thisState[2]);
		abstract(thisState[0]);
		console.log(thisCc,"move posible\n\n\n");*/
		
		doAllMove(thisState,thisCc);
		}
	}
}
if(!finish){
	console.log("\n\n__the loop is over");
				var end = new Date().getTime();
				var time = end - startTime;
				console.log("calcul in",time/1000,"s");
				abstract(thisState[0]);
}

