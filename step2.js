//var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var abstract = require('./abstract');
var [newVcolumn,Vupdate] = require('./Vcolumn');
var addToList = require('./addToList');
var [simpleMove,secondBall] = require('./searchMove');


//abstract(columns);

function emptyBotle(columns2){
	for(col in  columns2){
		if(columns2[col].isEmpty()){return parseInt(col)}
	}
	return null
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


function step(columns2,nbEmptyBotle){

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
			
			if(nbEmptyBotle ==1){break}	//main decide
			
			console.log("first branch",0);	//random
			console.log(branch[0][1]);
			let lastChance = secondBall(branch[0],columns2);
			
			if(lastChance.length !=0){
				console.log("we got it");
				return lastChance;
				
			}else{	//no move 2botle from branch0
				console.log("");
				abstract(columns2);		
				throw Error ("main2,secondBall return nothing");
				break;
			}
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



