//var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var abstract = require('./abstract');
var [newVcolumn,Vupdate] = require('./Vcolumn');
var addToList = require('./addToList');


//abstract(columns);

function emptyBotle(columns2){
	for(col in  columns2){
		if(columns2[col].isEmpty()){return parseInt(col)}
	}
	return null
}

function WhoCanGoTo(Vcolumn2,col2){		
	//console.log("    who can go to ",col2);
	let output = [];
	//console.log("    the ball",Vcolumn2[col2][0]);
	
	for(let i=0;i<Vcolumn2.length;i++){
		if(i == col2){continue};
		if(Vcolumn2[i][2] ==0){continue}	//no emptyBotle
		//if the ball are the same
		if(Vcolumn2[i][0]!=Vcolumn2[col2][0]){continue}
		
		//dont over feed
		if(Vcolumn2[i][1] + Vcolumn2[col2][2] >4){continue}
		
		if(Vcolumn2[i][1] + Vcolumn2[col2][1] ==4){	//we compleat a col
			if(Vcolumn2[i][1] == Vcolumn2[i][2]){	//from is mono
				if(Vcolumn2[i][1] > Vcolumn2[col2][1]){continue;}//3->1
				if(Vcolumn2[i][1] == Vcolumn2[col2][1] && i>col){continue;}
			}	//2 ball to 2 ball not count twice 
		}	//avoid bigBall to single ball
				
		output.push(i);		
	}
	return output
}

//each move simple move without empty botle
function simpleMove([Vcolumn2,lstOfMove2],columns2){		
	//console.log("  simpleMove");
	let output = [];
	let endGame = [];
	
	for(colTo in Vcolumn2){	
		let lst = WhoCanGoTo(Vcolumn2,colTo);
		//console.log("  lst",lst);
		//console.log(" ",colTo)
		
		//add to the list for the next Cycle
		for(k in lst){
			let Vcolumn4 = [...Vcolumn2];
			let lstOfMove4 = [...lstOfMove2];
			colFrom = lst[k];
			
			
			Vupdate(columns2,Vcolumn4,[colFrom,colTo])
			lstOfMove4.push([parseInt(colFrom),parseInt(colTo)]);
			
			//we free a botle
			if(Vcolumn4[colFrom][1] == 0){
				endGame.push(lstOfMove4);
				continue
			}
			
			console.log("  move to",colFrom,colTo);
			output.push([Vcolumn4,lstOfMove4]);
		}
	}
	if(output == [] && endGame ==[]){
		console.log("  i'm stuck");
		console.log(lstOfMove2);
	}
	
	return [output,endGame]
}

//in first move
//ball who can go to emptyBotle
function opening(branchInit,columns2){	
	let branch = [];
	
	if(branchInit .length > 1){
		console.log("opening dafuck to many init set");
		return []
	}
	
	let btl0 = emptyBotle(columns2);
	let from0 ;

	if(btl0 == null){
		console.log("opening no empty botle");
		return []
	}
	
	let [Vcolumn2,lstOfMove2] = branchInit[0];
	
	for (col in Vcolumn2){
		if(Vcolumn2[col].length ==0){continue}	//empty column
		if(Vcolumn2[col][1] == Vcolumn2[col][2]){continue}	
		//monochrome col
		
		let Vcolumn3 = [...Vcolumn2];
		let lstOfMove3 = [...lstOfMove2];
		
		from0 = parseInt(col)
		
		Vupdate(columns2,Vcolumn3,[from0,btl0])	//move the ball to empty botle
		lstOfMove3.push([parseInt(from0),parseInt(btl0)])
					
		branch.push([Vcolumn3,lstOfMove3]);	//new branch for each opening
	}
	console.log("opening ",branch.length,"opening");
	return branch
}



function isTarget(lstOfMove2){	//compare 2 array (debug)
	let target =[ [ 0, 3 ], [ 2, 3 ], [ 2, 0 ], [ 2, 1 ] ];
	
	for(let e=0;e<lstOfMove2.length;e++){
		if(lstOfMove2[e][0] != target[e][0]){return}
		if(lstOfMove2[e][1] != target[e][1]){return}
	}
	throw Error
}


function step(columns2){

	let lstOfSolution =[];	//output of the function
	let lstOfMove = [];
	let Vcolumn = newVcolumn(columns2);
	console.log(Vcolumn);
	
	// 	initial branch
	let branch0 = [[Vcolumn,lstOfMove]];
	
	//new branch for each opening
	let branch = opening(branch0,columns2);
			
			
	for(let i=0;i<12;i++){
		console.log("\nstep cycle",i);
		let branch2 =[];
		
		for(let j=0;j<branch.length;j++){
			console.log("j",j);
			let [Vcolumn2,lstOfMove2] = branch[j];
			
			/*console.log("column");
			abstract(columns2);
			console.log("lst of move",lstOfMove2);*/
			
			//each move posible without empty botle
			let [MoveTo,finishTo] = simpleMove(branch[j],columns2);
			branch2 = branch2.concat(MoveTo);
			
			
			//kill dublon
			//lstOfSolution = lstOfSolution.concat(finishTo);
			addToList(lstOfSolution,finishTo);
			
			console.log("lst of looped cycle",lstOfSolution);
			//feed empty botle then make a new one
		}
		
		//if we can't do nothing we stop
		if(branch2.length == 0){	
			console.log("\n\n\nstep2,step no move possible");
			
			for(j in branch){
				console.log("branch",j);
				console.log(branch[j][1]);
			}	
			console.log("");
			abstract(columns2);		
			//throw Error
			break;
		}


		branch = branch2;	//for the next cycle
		console.log("step2",branch.length,"branch");
	}
	console.log("Step loop is over");
	return lstOfSolution
}

/*
let out = step(columns);

console.log("\n\n\nthe solution");
console.log(out);
*/







module.exports = step;



