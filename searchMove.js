
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
			
				
		output.push(i);		
	}
	return output
}

function coppyBranch([Vcolumn2,lstOfMove2]){
	let Vcolumn3 = [];
	let lstOfMove3 = [];
	
	for(let col=0;col<Vcolumn2.length;col++){
		Vcolumn3.push([...Vcolumn2[col]]);
	}
	for(let mv=0;mv<lstOfMove2.length;mv++){
		lstOfMove3.push([...lstOfMove2[mv]]);
	}
	return [Vcolumn3,lstOfMove3]
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
	
	return [output,endGame]
}

function secondBall(branch2,columns2){
	console.log("\n\nsecond opening");
	let [Vcolumn2,lstOfMove2] = branch2;
	
	let secondOpening = bestOpening2(Vcolumn2);
	
	lstOfMove2.push(secondOpening);
	Vupdate(columns2,Vcolumn2,secondOpening)
	
	console.log(Vcolumn2);
	
	//now start the funny part
	let branch3 = coppyBranch(branch2);
	let lstBranch = [branch3];
	let lstOfSolution = [];
	let largestBranch =0;	//the size of the tree
	
	
	for(i=0;i<12;i++){
		lstBranch2 =[];
		
		
		for(j=0;j<lstBranch.length;j++){
			let [Vcolumn3,lstOfMove3] = lstBranch[j];
			console.log("Vcolumn",j)
			console.log(Vcolumn3);
			
			
			let [MoveTo,finishTo] = simpleMove(lstBranch[j],columns2);
			lstBranch2 = lstBranch2.concat(MoveTo);
			
			if(finishTo.length == 0){continue}
			
			if(Vempty(Vcolumn3) == null){
				console.log("finish to");
				console.log(finishTo.length);
				
				lstBranch2 = lstBranch2.concat(finishTo);
				continue;			
			}else{
				console.log("finish to",finishTo);
				addToList(lstOfSolution,finishTo);
				continue
			}
		}
		
		console.log("lstbranch",lstBranch2.length,"i",i);
		
		if(lstBranch2.length ==0){
			console.log("second solution");
			console.log(lstOfSolution);
			
			if(lstOfSolution.length >0){
				return lstOfSolution
			}
			if(!Vempty(lstBranch[0][0])){	//no free botle
				abstract(columns2);
				console.log(lstBranch[0]);
				console.log("i",i);
				console.log("simple moves",lstOfMove2.length);
				console.log("we ave",lstBranch.length,"branch");
				console.log("largest branch",largestBranch);
				console.log("second Ball return nothing");
				throw Error;
			}else{
		
				console.log("we ave afree botle");
				
				let [Vcolumn4,lstOfMove4] = lstBranch[0];
				let secondOpening = bestOpening2(Vcolumn4);
				
				console.log("second opening",secondOpening);
				
				lstOfMove4.push(secondOpening);
				Vupdate(columns2,Vcolumn4,secondOpening)
				
				lstBranch = [[Vcolumn4,lstOfMove4]];//make new branch
				continue;
			}
			
			
			
			throw Error
		}else{
			lstBranch = lstBranch2;
			
			if(lstBranch.length > largestBranch){
				largestBranch = lstBranch.length
			}
		}
		
	}
	console.log("second Ball i loop is over")
	throw Error
}

module.exports = [simpleMove,secondBall]
