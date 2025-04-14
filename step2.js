//var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var abstract = require('./abstract');
var [newVcolumn,Vupdate] = require('./Vcolumn');


//abstract(columns);

function emptyBotle(columns2){
	for(col in  columns2){
		if(columns2[col].isEmpty()){return parseInt(col)}
	}
	return null
}

function WhoCanGoTo(Vcolumn2,col2){		//move to the last from
	console.log("    who can go to ",col2);
	let output = [];
	console.log("    the ball",Vcolumn2[col2][0]);
	
	for(let i=0;i<Vcolumn2.length;i++){
		if(i == col2){continue};
		if(Vcolumn2[i][2] ==0){continue}	//no emptyBotle
		//if the ball are the same
		if(Vcolumn2[i][0]!=Vcolumn2[col2][0]){continue}
		
		//dont over feed
		if(Vcolumn2[i][1] + Vcolumn2[col2][2] >4){continue}
		
		if(Vcolumn2[i][1] + Vcolumn2[col2][1] ==4){	//we compleat a col
			if(Vcolumn2[i][1] == Vcolumn2[i][2]){	//from is mono
			if(Vcolumn2[i][1] >= Vcolumn2[col2][1]){continue;}
			}//big ball to single
		}	//avoid bigBall to single ball
		output.push(i);		
	}
	return output
}

function WereCanGoTo(Vcolumn2,col2){	//move from the last from
	//console.log("    who can go from ",col2);
	let output = [];
	//console.log("    the ball is",Vcolumn2[col2][0]);
	
	for(let i=0;i<Vcolumn2.length;i++){
		if(i == col2){continue};
		if(Vcolumn2[i][2] ==0){continue}	//no emptyBotle
		//if the ball are the same
		if(Vcolumn2[i][0]!=Vcolumn2[col2][0]){continue}
		
		//dont over feed
		if(Vcolumn2[i][2] + Vcolumn2[col2][1] >4){continue}
		
		if(Vcolumn2[i][1] + Vcolumn2[col2][1] ==4){//we compleat a col
			if(Vcolumn2[col2][1] == Vcolumn2[col2][2]){//from is mono
				if(Vcolumn2[i][1] < Vcolumn2[col2][1]){continue;}
			}//big ball to single
		}	//avoid bigBall to single ball
		output.push(i);		
	}
	return output
}

function moveTo([Vcolumn2,lstOfMove2]){		//move to the last from
	//console.log("  moveTo");
	let output = [];
	let endGame = [];
	
	colTo =lstOfMove2[lstOfMove2.length-1][0];
	let lst = WhoCanGoTo(Vcolumn2,colTo);
	//console.log("  lst",lst);
	//console.log(" ",colTo)
	
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
		console.log("  move to",colFrom,colTo);
		output.push([Vcolumn4,lstOfMove4]);
	}
	
	return [output,endGame]
}

function moveFrom([Vcolumn2,lstOfMove2]){	//move from the last from
	//console.log("  moveFrom");
	let output = [];
	let endGame = [];
		
	colFrom =lstOfMove2[lstOfMove2.length-1][0];	//dafuck
	let lst = WereCanGoTo(Vcolumn2,colFrom);
	//console.log("  lst",lst);
	//console.log(" ",colFrom);
	
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
		console.log("  move From",colFrom,colTo);
		output.push([Vcolumn4,lstOfMove4]);
	}
	return [output,endGame]
}

function moveToBottle([Vcolumn2,lstOfMove2],firstBottle){//move to first empty
	console.log("  move to bottle",firstBottle);
	
	let output = [];
	let endGame = [];
	
	let colTo = firstBottle;
	let lst = WhoCanGoTo(Vcolumn2,colTo);
	console.log("  lst",lst);
	
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
		console.log("  move to empty botle",colFrom,colTo);
		output.push([Vcolumn4,lstOfMove4]);
	}
	return [output,endGame]
}

function step(columns2){

	let lstOfSolution =[];	//output of the function
	let lstOfMove = [];
	let Vcolumn = newVcolumn(columns2);
	console.log(Vcolumn);

	let btl0 = emptyBotle(columns2);

	if(btl0 == null){return}


	let From0 = 0;
	let To0 = btl0;
	let Vlist = [[Vcolumn,lstOfMove]];

	if (Vcolumn[From0][1] ==4 ){return}


	Vupdate(columns2,Vcolumn,[From0,To0])
	lstOfMove.push([From0,To0]);
	//console.log(Vcolumn);
	console.log("first move",From0,To0);		
			
			
	for(let i=0;i<4;i++){
		console.log("\ncycle",i);
		let Vlist2 =[];
		
		for(let j=0;j<Vlist.length;j++){
			console.log("j",j);
			let [Vcolumn2,lstOfMove2] = Vlist[j];
			
			//move to the last botle from
			let [MoveTo,finishTo] = moveTo(Vlist[j]);
			Vlist2 = Vlist2.concat(MoveTo);
			//console.log("move to",MoveTo);
			lstOfSolution = lstOfSolution.concat(finishTo);
			
			//move from the last bottle from
			let [MoveFrom,finishFrom] = moveFrom(Vlist[j]);
			Vlist2 = Vlist2.concat(MoveFrom);
			console.log("MoveFrom",MoveFrom);
			lstOfSolution = lstOfSolution.concat(finishFrom);
			
			//move to the first empty botle
			let [MoveToBottle,finishToBottle] = moveToBottle(Vlist[j],btl0);
			Vlist2 = Vlist2.concat(MoveToBottle);
			console.log("move to bottle",MoveToBottle)
			lstOfSolution = lstOfSolution.concat(finishToBottle);
			
			console.log("lst of looped cycle",lstOfSolution);
			//feed empty botle then make a new one
		}

		Vlist = Vlist2;	//for the next cycle
		console.log("Vlist",Vlist2.length);
		
		if(Vlist == []){break}	//if we can't do nothing we stop
	}
	return lstOfSolution
}

/*
let out = step(columns);

console.log("\n\n\nthe solution");
console.log(out);
*/







module.exports = step;



