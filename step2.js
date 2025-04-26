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
	//console.log("  moveTo");
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
			
			/*/debug
				console.log("\nVcoumn",Vcolumn4);
				console.log("lst of move",lstOfMove4);/**/
			
			Vupdate(columns2,Vcolumn4,[colFrom,colTo])
			lstOfMove4.push([parseInt(colFrom),parseInt(colTo)]);
			
			//we free a botle
			if(Vcolumn4[colFrom][1] == 0){
				endGame.push(lstOfMove4);
				continue
			}
			
			/*/debug
			if(Vcolumn4[0][0] ==5 ){
			if(Vcolumn4[0][1] ==2 ){
				console.log("we get it ");
				console.log("move",colFrom,colTo);
				console.log("Vcoumn",Vcolumn4);
				console.log("lst of move",lstOfMove4);
				console.log("\n:\n:\n:\n:\n:\n:\n:");
				//throw Error
			}}/**/
			
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

function compareArray(arr1,arr2){
	return arr1.toString() === arr2.toString()
}

function normalise(lstOfMove2){
	//console.log("normalise");
	
	let leftCol = [99,0];	//col,order
	let emptyBtl = lstOfMove2[0][1];
	
	//is criss cross
	for(k=1; k<lstOfMove2.length; k++){
		//console.log("k",k);
		let mv = lstOfMove2[k];
		let lastMv = lstOfMove2[k-1];
		
		if(mv[1] != lastMv[0]){
			console.log("it's not criss cross");
			return lstOfMove2
		}
		if(lastMv[0] < leftCol[0]){
			leftCol = [lastMv[0],k-1];
			console.log("it's on left",leftCol);
		}
	
	}
	//if we are already normalised
	if(leftCol[1] == 0){return lstOfMove2}
	
	//if we dont free the empty botle
	if(lstOfMove2[0][1] != lstOfMove2[lstOfMove2.length -1][0]){
		console.log("first move",lstOfMove2[0]);
		console.log("last Move",lstOfMove2[lstOfMove2.length -1]);
		return	lstOfMove2
	}
	
	let firstPart = lstOfMove2.slice(1,leftCol[1]+1);
	let lastPart =  lstOfMove2.slice(leftCol[1]+1);
	
	lastPart.pop();	//remove the ending botle
	
	let hibrid = [lstOfMove2[0][0],lstOfMove2[lstOfMove2.length-1][1]];
	lastPart.push(hibrid);	//join the two part
	firstPart.pop();	//old join
	
	lastPart.splice(0,0,[lastPart[0][1],emptyBtl]);	//opening
	
	let newLstOfMove = lastPart.concat(firstPart);
	newLstOfMove.push([emptyBtl,newLstOfMove[newLstOfMove.length -1][0]]);
	
	/*
	console.log("it's criss cross");
	console.log("the left col",leftCol);
	console.log("first part",firstPart,"lastPart",lastPart);
	console.log("l'hybride",hibrid);
	console.log("lst of move",lstOfMove2);
	console.log("new list of move",newLstOfMove);*/
	lstOfMove2 = newLstOfMove;
	return lstOfMove2
}

function addToList(list,newList){
	//console.log("\n\n\n\nadd to list");
	//console.log("old list",list.length);
	//console.log("new list",newList.length);
	
	for(element in newList){
		let newElement0 = newList[element];
		let newElement = normalise(newElement0);
		
		//console.log("the solution ",newElement);
		
		
		for(solution in list){
			//console.log("list",solution,list[solution]);
			if(compareArray(list[solution], newElement)){/*
				console.log("is already on the list");
				console.log("newElement",newElement)
				console.log("original",list[solution]);*/
	
				return 
			}
			//console.log(compareArray(list[solution][0], newElement[0]));
		}
		//console.log("is not on the list");
		list.push(newElement);
	}
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
			
			
	for(let i=0;i<8;i++){
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

		branch = branch2;	//for the next cycle
		console.log("step2",branch.length,"branch");
		
		if(branch.length == 0){break}	//if we can't do nothing we stop
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



