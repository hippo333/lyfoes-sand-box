var column = require('../tools/column');
var columns = require('../level');
var abstract = require('../tools/abstract');

function dejaVu(previousTry2,col2,level2){
	let alreadyTry2 = previousTry2.findIndex(
		tr => tr[0] ==col2
		&& tr[1] == level2			
	);
	if(alreadyTry2 == -1){return false}
	console.log(col2,"is already in",previousTry2);
	return true
}

//add element at the end of each lstOfMove in theArray
function mapArray(theArray,element){
	theArray2 = [];
	theArray.forEach(
		lstMv => lstMv.push(element)
		&& theArray2.push(lstMv)
	);
	theArray = theArray2;
	return theArray2
}


function badMove(col2,level2,previousTry2){
	let theCol = columns[col2]; 
	if(theCol.isEmpty()){return true}
	if(level2 ==-1){return true}//theCol dont ave the ball
	if(level2 == 3){return true}//no place above
	if(dejaVu(previousTry2,col2,level2)){return true}
	return false
}

//find if it get an specific solution
function doAveThisSol(lst,solution,previous){
	let solution0 = solution.map(x => {return [...x]});
	let first = solution.reverse().pop().join();
	let lst2 = [...lst].join();
	solution = solution.join();
	console.log("first",first);
	console.log("solution",solution);
	
	if(!lst2.includes(first)){return}
	
	//a string who containeach first element
	let previous2 =previous.map(x => {return x[0]}).join();
	if(previous2 != solution){return}
	
	
	console.log("\ndo ave this sol succes");
	console.log("lst",lst)
	console.log("previous2",previous2);
	console.log("previous",previous);
	console.log("the solution",solution0);
	throw Error("the solution apear on aveAWay");
	
}

function aveAWay(col2,ball2,nbCycle,previousTry){
	console.log("ave a Way col",col2,"ball",ball2);
	
	if(nbCycle > 10){
		throw Error("to many cycles")
	}
	let outputLst =[];
	
	columns0:
	for(let col=0; col<columns.length; col++){
		if(col == col2){continue}
		let theCol = columns[col];
		//console.log("col",col);
		
		let level = theCol.content.lastIndexOf(ball2);
		
		if(badMove(col,level,previousTry)){continue}
		
		
		if(theCol.top() == ball2){
			outputLst.push([[col2,col]]);
			console.log("outputList add top",outputLst);
			continue;
		}
		
		let previousTry2 = [...previousTry,[col,level]];
		
		
		if(level >=0){
			let thisList =[]
			for(let bll=theCol.content.length-1;bll >1;bll--){
				let secondMove = aveAWay(col,theCol.content[bll],++nbCycle,previousTry2);
				//if(typeof(secondMove = "undefined"){continue columns0}
				if(secondMove.length == 0){continue columns0}
				
				if(thisList.length ==0){
					thisList.push(...secondMove);
				}else{
					mapArray(thisList,...secondMove[0]);
				}
			}
			let theMv = [col2,col]
			mapArray(thisList,theMv);
			
			outputLst.push(...thisList);
		}
	}
	doAveThisSol(outputLst,[[1,3],[2,1]],previousTry);
	console.log("outputLst",outputLst);
	console.log("previousTry",previousTry,"\n");
	return outputLst
	//return outputLst[0]	//
}


abstract(columns);
let firstCol = 2;


let firstLevel = columns[firstCol].content.length-1;
let theBall = columns[firstCol].top();	//top

//let theSolution = aveAWay(firstCol,theBall,0,[[firstCol,firstLevel]]);
let theSolution = aveAWay(firstCol,theBall,0,[[firstCol,-1]]);

console.log("the solution",...theSolution);



/*
when the bigBall seems stuck the game, we search all solution who can consume the secondBall befor we move the big ball
aveAWay clear the path and leave an empty botle for the bigBall then the second ball(i asume it is the botom one) go to the place we make for it
the output is a list of all path posible

*/

