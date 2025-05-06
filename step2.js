//var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var abstract = require('./abstract');
var [newVcolumn,Vupdate] = require('./Vcolumn');
var addToList = require('./addToList');
var [simpleMove,secondBall,Vempty,oneBotle,sdBall] = require('./searchMove');


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
	
	let largestBranch = 0 ;	//mesure the largest branch
			
	for(let i=0;i<12;i++){
		console.log("\nstep cycle",i);
		let branch2 = oneBotle(branch,columns2,lstOfSolution);
		
		//if we can't do nothing we stop
		if(branch2.length == 0){	
			if(lstOfSolution.length >0){	//if we ave a solution
				return lstOfSolution
			}
			
			console.log("\n\n\nstep2,step no move possible");
			
			
			if(nbEmptyBotle ==1){break}	//main decide
			
			/*
			if(!Vempty(branch[0][0])){	//no free botle
				abstract(columns2);
				console.log(branch[0]);
				console.log("i",i);
				console.log("simple moves",lstOfMove.length);
				console.log("we ave",branch.length,"branch");
				console.log("largest branch",largestBranch);
				console.log("second Ball return nothing");
				throw Error;
			}else{
		
				console.log("we ave afree botle");
				
				
				branch = sdBall(branch,columns2);//make new branch
				continue;
			}
			*/
			
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
			
		//size of largest branch
		if(branch.length > largestBranch){
			largestBranch = branch.length
		}
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



