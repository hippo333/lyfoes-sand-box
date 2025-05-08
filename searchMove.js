
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


function simpleMove(lstBranch,columns2,lstOfSolution2){
	let lstBranch2 = [];

		
		for(j=0;j<lstBranch.length;j++){
		
			let [Vcolumn3,lstOfMove3] = lstBranch[j];
			console.log("Vcolumn",j)
			console.log(Vcolumn3);
			
			
			let [MoveTo,finishTo] = oneBtl(lstBranch[j],columns2);
			lstBranch2 = lstBranch2.concat(MoveTo);
			
			if(finishTo.length == 0){continue}
			
			if(Vempty(Vcolumn3) == null){
				console.log("finish to");
				console.log(finishTo.length);
				
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

function thirdOpening(lstBranch3,columns2){
	
	let [Vcolumn2,lstOfMove2] = lstBranch3[0];
	let lstBranch4 = [];
	
	let emptyBtl = Vempty(Vcolumn2);
	
	if(emptyBtl == null){
		console.log(Vcolumn2);
		throw Error
	}
	
	for(let i=0;i<Vcolumn2.length;i++){
		if(Vcolumn2[i][2] ==0){continue}
		
		if(Vcolumn2[i][1] == Vcolumn2[i][2]){continue}	//color
		
		let Vcolumn3 = [...Vcolumn2];
		let lstOfMove3 = [...lstOfMove2];
		
		let sdOpening = [i,emptyBtl];
		lstOfMove3.push(sdOpening);
		Vupdate(columns2,Vcolumn3,sdOpening)
		
		lstBranch4.push([Vcolumn3,lstOfMove3]);
	}
	return lstBranch4
}

function secondOpening(lstBranch3,columns2){

	let [Vcolumn4,lstOfMove4] = lstBranch3[0];
	let sdOpening = bestOpening2(Vcolumn4);
	
	console.log("second opening",sdOpening);
	
	lstOfMove4.push(sdOpening);
	Vupdate(columns2,Vcolumn4,sdOpening)
	
	return [[Vcolumn4,lstOfMove4]];//make new branch

}


//module.exports = [Vempty,simpleMove,secondOpening]
module.exports = [Vempty,simpleMove,thirdOpening]


