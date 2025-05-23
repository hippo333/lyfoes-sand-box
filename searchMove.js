
var addToList = require('./addToList');
var abstract = require('./abstract');
var [newVcolumn,Vupdate] = require('./Vcolumn');


function Vempty(Vcolumn2){
	
	for(let col=0; col<Vcolumn2.length;col++){
		if(Vcolumn2[col][2] ==0){
		
			return parseInt(col)
		}
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
		
		if(col2==11 && i ==8){	//debug
			console.log("Vcolumn",Vcolumn2);
			//throw Error
		}
				
		output.push(i);		
	}
	return output
}


function bestOpening2(Vcolumn2){
	let smolestCol =[99,-1];	//size, position
	let emptyBotle = -1;
	
	for(col in Vcolumn2){
		if(Vcolumn2[col][2] ==0){
			emptyBotle = col;
			continue
		}
		if(Vcolumn2[col][1] > 2 ){continue}//we can't empty
		if(Vcolumn2[col][1] == Vcolumn2[col][2]){continue}//monochrome
		
		if(Vcolumn2[col][2] < smolestCol[0]){
			smolestCol = [Vcolumn2[col][2],col];
		}	
	}
	if(smolestCol[1] ==-1){
		console.log("secondBall, no smolestCol")
		console.log(Vcolumn2);
		throw Error
	}
	if(emptyBotle ==-1){
		console.log("secondBall, no empty Botle")
		console.log(Vcolumn2);
		throw Error
	}
	return [parseInt(smolestCol[1]),parseInt(emptyBotle)]
}


//each move simple move without empty botle
function oneBtl([Vcolumn2,lstOfMove2],columns2){		
	//console.log("  oneBtl");
	let output = [];
	let endGame = [];
	
	for(colTo in Vcolumn2){	
		let lst = WhoCanGoTo(Vcolumn2,colTo);
		//console.log("  lst",lst);
		//console.log(" ",colTo)
		
		//add to the list for the next Cycle
		for(k in lst){
			//console.log("  k");
			let Vcolumn4 = [...Vcolumn2];
			let lstOfMove4 = [...lstOfMove2];
			colFrom = lst[k];
			
			
			Vupdate(columns2,Vcolumn4,[colFrom,colTo])
			lstOfMove4.push([parseInt(colFrom),parseInt(colTo)]);
			
			//we free a botle
			if(Vcolumn4[colFrom][1] == 0){
				
				endGame.push([Vcolumn4,lstOfMove4]);
				continue
			}
			
			//console.log("  move to",colFrom,colTo);
			output.push([Vcolumn4,lstOfMove4]);
		}
	}
	if(output == [] && endGame ==[]){
		console.log("  i'm stuck");
		console.log(lstOfMove2);
		
		
	}
	//console.log("endGame",endGame[0]);
	return [output,endGame]
}


function simpleMove(lstBranch,columns2,lstOfSolution2){
	let lstBranch2 = [];

		
		for(j=0;j<lstBranch.length;j++){
		
			let [Vcolumn3,lstOfMove3] = lstBranch[j];
			console.log("branch",j)
			console.log(Vcolumn3);
			
				/*if(lstOfMove3[lstOfMove3.length-1][0] ==5){//debug
				if(lstOfMove3[lstOfMove3.length-1][1] ==8){
					console.log("\n\n\n\n\n\n",lstOfMove3);
					console.log("Vcolumn3",Vcolumn3)
					//throw Error
				}}*/
			
			
			let [MoveTo,finishTo] = oneBtl(lstBranch[j],columns2);
			lstBranch2 = lstBranch2.concat(MoveTo);
			
						
			if(finishTo.length == 0){continue}
		
		
			//console.log("finishTo of oneBtl",finishTo.length);
			//console.log(finishTo[0]);
			
			if(Vempty(Vcolumn3) == null){
				console.log("finish to");
				
				lstBranch2 = lstBranch2.concat(finishTo);
				continue;			
			}else{
				console.log("finish to",finishTo);
				addToList(lstOfSolution2,finishTo);
				continue
			}
		}
	
	return lstBranch2
}


let macGuffin = [] //if we fail do all Second opening
let sdOp = 0;

function secondOpening(branch2,columns2){

	let [Vcolumn4,lstOfMove4] = branch2[0];
	macGuffin = [[...Vcolumn4],[...lstOfMove4]];
	console.log("new macguffin",macGuffin);
	
	
	let sdOpening = bestOpening2(Vcolumn4);
	sdOp = sdOpening[0];
	
	console.log("second opening",sdOpening);
	
	lstOfMove4.push(sdOpening);
	Vupdate(columns2,Vcolumn4,sdOpening)
	
	return [[Vcolumn4,lstOfMove4]];//make new branch

}


function allSecondOpening(branch2,columns2){
	
	let [Vcolumn2,lstOfMove2] = branch2[0];
	
	if(branch2.length > 1){
		console.log("all second branch we ave",branch2.length);
		//console.log(branch2);
		//throw Error
	}
	
	if(macGuffin.length ==0){
		
		console.log("\n\nError");
		abstract(columns2);
		console.log(branch2[0]);
		console.log("simple moves",lstOfMove2.length);
		console.log("we ave",branch2.length,"branch");
		console.log("second Ball return nothing");
		throw Error;
		
	}
	
	console.log("macGuffin",macGuffin);
		
	[Vcolumn2,lstOfMove2] = macGuffin;
	
	let branch3 = [];
	
	let emptyBtl = Vempty(Vcolumn2);
	
	if(emptyBtl == null){
		console.log(Vcolumn2);
		throw Error
	}
	
	for(let i=0;i<Vcolumn2.length;i++){
		if(Vcolumn2[i][2] ==0){continue}
		
		if(Vcolumn2[i][1] == Vcolumn2[i][2]){continue}	//color
		
		if(i== sdOp){continue}	//dont repeat second opening
		
		let Vcolumn3 = [...Vcolumn2];
		let lstOfMove3 = [...lstOfMove2];
		
		let sdOpening = [i,emptyBtl];
		lstOfMove3.push(sdOpening);
		Vupdate(columns2,Vcolumn3,sdOpening)
		
		branch3.push([Vcolumn3,lstOfMove3]);
		console.log("Vcolumn",i,Vcolumn3);
	}
	macGuffin = [];		//avoid infinit loop
	
	return branch3
}

/*
function justOpening(branch0,columns2){
	let [Vcolumn2,lstOfMove2] = branch0;
	let output = [];
	
	let emptyBtl = Vempty(Vcolumn2);
	
	if(emptyBtl == null ){return []}
	
	for(let col=0;col<Vcolumn2.length;col++){
		
		if(Vcolumn2[col][2] ==0){continue}
		
		let Vcolumn3 = [...Vcolumn2];
		let lstOfMove3 = [...lstOfMove2];
		let opening = [col,emptyBtl];
	
		Vupdate(columns2,Vcolumn3,opening);
		lstOfMove3.push(opening)
		output.push([Vcolumn3,lstOfMove3]);
	}
	return output



}


function search2(branch,columns2,lstOfSolution2){
	console.log("search2");
	branch2 = [];	
	
	for(let br=0; br<branch.length;br++){
		thisBranch = branch[br];
		let lastLstOfSolution = lstOfSolution2.length;
		
		let branchOne =simpleMove([thisBranch],columns2,lstOfSolution2);
		
		if(branchOne.length >0){	
			branch2 = branch2.concat(branchOne);
			
			console.log("\n\n\n\n\nlstOfSolution",lstOfSolution2);
		}else{
			if(lstOfSolution2.length > lastLstOfSolution){
				return []
			}
			//if we get a solution
			
			if(Vempty(thisBranch[0]) == null){continue}
			
			console.log("branchTwo");
			let branchTwo = justOpening(thisBranch,columns2);
			
			console.log("brtwo",branchTwo);
			
			branch2 = branch2.concat(branchTwo);
		}
	}
	return branch2
}
*/










//module.exports = [Vempty,search2,secondOpening,allSecondOpening]
module.exports = [Vempty,simpleMove,secondOpening,allSecondOpening]


