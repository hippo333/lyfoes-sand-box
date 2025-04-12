var startTime = new Date().getTime();
var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var doTheMove = require('./doTheMove');
var coppy = require('./coppy');
var abstract = require('./abstract');
var isFinish = require('./isFinish');
var [newVcolumn,Vupdate,Vfinish] = require('./Vcolumn');


abstract(columns);

function emptyBotle(columns2){
	for(col in  columns2){
		if(columns2[col].isEmpty()){return parseInt(col)}
	}
	return null
}

function WhoCanGoTo(Vcolumn2,col2){
	//console.log("    who can go to ",col2);
	let output = [];
	
	for(let i=0;i<Vcolumn2.length;i++){
		if(i == col2){continue};
		if(Vcolumn[i][2] ==0){continue}	//no emptyBotle
		//if the ball are the same
		if(Vcolumn2[i][0]!=Vcolumn2[col2][0]){continue}
		
		//dont over feed
		if(Vcolumn2[i][1] + Vcolumn2[col2][2] >4){continue}
		
		if(Vcolumn2[i][1] + Vcolumn2[col2][1] ==4){
			if(Vcolumn2[i][1] >= Vcolumn2[col2][1]){continue;}
		}	//avoid bigBall to single ball
		
		output.push(i);		
	}
	return output
}

function WhoCanGoFrom(Vcolumn2,col2){
	//console.log("    who can go to ",col2);
	let output = [];
	
	for(let i=0;i<Vcolumn2.length;i++){
		if(i == col2){continue};
		if(Vcolumn[i][2] ==0){continue}	//no emptyBotle
		//if the ball are the same
		if(Vcolumn2[i][0]!=Vcolumn2[col2][0]){continue}
		
		//dont over feed
		if(Vcolumn2[i][2] + Vcolumn2[col2][1] >4){continue}
		
		if(Vcolumn2[i][1] + Vcolumn2[col2][1] ==4){
			if(Vcolumn2[i][1] < Vcolumn2[col2][1]){continue;}
		}	//avoid bigBall to single ball
		
		output.push(i);		
	}
	return output
}

function moveTo([Vcolumn2,lstOfMove2]){	
	//console.log("  moveTo");
	let output = [];
	let endGame = [];
	
	colTo =lstOfMove2[lstOfMove2.length-1][0];
	let lst = WhoCanGoTo(Vcolumn2,colTo);
	//console.log("  lst",lst);
	
	//add to the list for the next Cycle
	for(k in lst){
		let Vcolumn4 = [...Vcolumn2];
		let lstOfMove4 = [...lstOfMove2];
		colFrom = lst[k];
	
		Vupdate(columns,Vcolumn4,[colFrom,colTo])
		lstOfMove4.push([colFrom,colTo]);
		
		//we free a botle
		if(Vcolumn4[colFrom][1] == 0){
			endGame.push(lstOfMove4);
		}
		//console.log(" ",colFrom,colTo);
		output.push([Vcolumn4,lstOfMove4]);
	}
	
	return [output,endGame]
}

function moveFrom([Vcolumn2,lstOfMove2]){	
	//console.log("  moveFrom");
	let output = [];
	let endGame = [];
	
	colFrom =lstOfMove2[lstOfMove2.length-1][0];
	let lst = WhoCanGoFrom(Vcolumn2,colFrom);
	//console.log("  lst",lst);
	
	//add to the list for the next Cycle
	for(k in lst){
		let Vcolumn4 = [...Vcolumn2];
		let lstOfMove4 = [...lstOfMove2];
		colTo = lst[k];
	
		Vupdate(columns,Vcolumn4,[colFrom,colTo])
		lstOfMove4.push([colFrom,colTo]);
		
		//we free a botle
		if(Vcolumn4[colFrom][1] == 0){
			endGame.push(lstOfMove4);
		}
		//console.log(" ",colFrom,colTo);
		output.push([Vcolumn4,lstOfMove4]);
	}
	return [output,endGame]
}




let lstOfSolution =[];	//output of the function
let lstOfMove = [];
let Vcolumn = newVcolumn(columns);
console.log(Vcolumn);

let btl0 = emptyBotle(columns);

if(btl0 == null){return}


let From0 = 0;
let To0 = btl0;
let Vlist = [[Vcolumn,lstOfMove]];

if (Vcolumn[From0][1] ==4 ){return}


Vupdate(columns,Vcolumn,[From0,To0])
lstOfMove.push([From0,To0]);
console.log(Vcolumn);
		
		
		
for(let i=0;i<4;i++){
	console.log("\ncycle",i);
	let Vlist2 =[];
	
	for(let j=0;j<Vlist.length;j++){
		console.log("j",j);
		let [Vcolumn3,lstOfMove3] = Vlist[j];
		
		
		let [MoveTo,finishTo] = moveTo(Vlist[j]);
		Vlist2 = Vlist2.concat(MoveTo);
		lstOfSolution = lstOfSolution.concat(finishTo);
		
		let [MoveFrom,finishFrom] = moveFrom(Vlist[j]);
		Vlist2 = Vlist2.concat(MoveFrom);
		lstOfSolution = lstOfSolution.concat(finishFrom);
	}

	Vlist = Vlist2;	//for the next cycle
	console.log("Vlist",Vlist.length);
	
	if(Vlist == []){break}	//if we can't do nothing we stop
}

console.log("\n\n\nthe solution");
console.log(lstOfSolution);












