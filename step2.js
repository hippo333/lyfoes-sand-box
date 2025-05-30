
var abstract = require('./tools/abstract');
var [newVcolumn,Vupdate] = require('./tools/Vcolumn');
var addToList = require('./tools/addToList');
var [Vempty,secondOpening,allSecondOpening,simpleMove] = require('./searchMove');


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

function bestBranch(branch2){	//all branch with empty botle
	//console.log("bestBranch");
	let lstBest = [];
	
	for(let br=0; br< branch2.length; br++){
		//console.log("branch",branch2[br][1]);
		
		if(Vempty(branch2[br][0])){
			//console.log("a empty");
			lstBest.push(branch2[br]);
		}
	}
	return lstBest
}


function step(columns2,nbEmptyBotle,branchView){

	let lstOfSolution =[];	//output of the function
	let lstOfMove = [];
	let Vcolumn = newVcolumn(columns2);
	console.log(Vcolumn);
	
	// 	initial branch
	let branch0 = [[Vcolumn,lstOfMove]];
	
	//new branch for each opening
	let branch = opening(branch0,columns2);
	
	let largestBranch = 0 ;	//mesure the largest branch
	
			
	for(let i=0;i<45;i++){
		console.log("\nstep cycle",i);
		
		//
		let branch2 = simpleMove(branch,columns2,lstOfSolution);
			
		
		//console.log("\n|\n|\n|\n|\nlstOfSolution",lstOfSolution);
			
		if(lstOfSolution.length >0){	//if we ave a solution
			return lstOfSolution
		}
			
		//if we can't do nothing we stop
		if(branch2.length == 0){
			
			console.log("\n\n\nstep2,step no move possible");
			
			if(nbEmptyBotle ==1){break}	//main decide
			
			let branchOneBtl = bestBranch(branch);
			
			if(branchOneBtl.length ==0 ){	//no free botle
				
				branch2 = allSecondOpening(branch,columns2);
				branchView.push("all O");
				
			}else{
				//console.log("branchOneBtl",branchOneBtl.length);
				
				branch2 = secondOpening(branchOneBtl,columns2);//make new branch
				branchView.push("sd O");
				
			}
		}

		branch = branch2;	//for the next cycle
		console.log("step2",branch.length,"branch");
			
		//size of largest branch
		if(branch.length > largestBranch){
			largestBranch = branch.length
		}
		branchView.push(branch.length);
		
		//debug
		if(branch.length == 28){
			console.log("\n|\n|\n|\n|\n|\n28 branch");
			for(br of branch){
				console.log(br[1]);	
				
			}
			//throw Error
		}
		
	}
	console.log("Step loop is over");
	throw Error
	return lstOfSolution
}



module.exports = step;



