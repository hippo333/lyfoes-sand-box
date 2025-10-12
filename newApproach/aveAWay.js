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
		
		if(theCol.isEmpty()){continue}
		
		let level = theCol.content.lastIndexOf(ball2);
		//console.log("level",level);
		if(level ==-1){continue}
		if(level ==3){continue}//no place for the ball
		
		if(dejaVu(previousTry,col,level)){continue}
	
		if(theCol.top() == ball2){
			//return [[col2],[col]]
			outputLst.push([[col2,col]]);
			console.log("outputList add top",outputLst);
			continue;
		}
		
		//arbitrary
		if(level ==0){continue}
		previousTry2 = [...previousTry];
		previousTry2.push([col,level]);
		
		if(level >=1){
			let thisList =[]
			for(let bll=theCol.content.length-1;bll >1;bll--){
				let secondMove = aveAWay(col,theCol.content[bll],++nbCycle,previousTry2);
				if(secondMove.length == 0){continue columns0}
				
				if(thisList.length ==0){
					thisList.push(...secondMove);
				}else{
					let thisList2 = [];
					thisList.forEach(x => x.push(...(secondMove[0]))&& thisList2.push(x));
					thisList = thisList2;
				}
			}
			let theMv = [col2,col]
			console.log("thisList befor",thisList);
			let thisList2 = [];
			thisList.forEach(x => x.push(theMv) && thisList2.push(x));
			thisList = thisList2;
			console.log("thisList after",thisList);
			//return thisList
			outputLst.push(...thisList);
		}
		
		
		
	}
	console.log("outputLst",outputLst,"\n");
	return outputLst	//no way
}
abstract(columns);
let firstCol = 2;


let firstLevel = columns[firstCol].content.length-1;
let theBall = columns[firstCol].top();	//top

let theSolution = aveAWay(firstCol,theBall,0,[[firstCol,firstCol]]);

console.log("the solution",...theSolution);









