var column = require('../tools/column');
var columns = require('../level');
var abstract = require('../tools/abstract');

function aveAWay(col2,ball2,nbCycle,previousTry){
	console.log("ave a Way col",col2,"ball",ball2);
	
	if(nbCycle > 5){
		throw Error("to many cycles")
	}
	
	columns0:
	for(let col=0; col<columns.length; col++){
		if(col == col2){continue}
		let theCol = columns[col];
		console.log("col",col);
		
		if(theCol.isEmpty()){continue}
		
		let level = theCol.content.lastIndexOf(ball2);
		console.log("level",level);
		if(level ==-1){continue}
		if(level ==3){continue}//no place for the ball
		
		//temporary
		if(previousTry.includes(col)){
			console.log(col,"is already in",previousTry);
			continue
		}
	
		if(theCol.top() == ball2){
			return [[col2,col]]
		}
		
		//arbitrary
		if(level ==0){continue}
		previousTry.push(col);
		
		if(theCol.secondBall() == ball2){
			
			let secondMove = aveAWay(col,theCol.top(),++nbCycle,previousTry);
			if(secondMove == null){continue}
			
			let theMv = [col2,col]
			secondMove.push(theMv);
			return secondMove
		}
		if(level ==1){
			let outputLst =[]
			for(let bll=theCol.content.length-1;bll >1;bll--){
				let secondMove = aveAWay(col,theCol.content[bll],++nbCycle,previousTry);
				if(secondMove == null){continue columns0}
				
				outputLst = outputLst.concat(secondMove);
				
			}
			let theMv = [col2,col]
			outputLst.push(theMv);
			return outputLst
		}
		
		
		
	}
	
	return null	//no way
}
abstract(columns);
let firstCol = 0;

let theBall = columns[firstCol].top();
let theSolution = aveAWay(firstCol,theBall,0,[]);

console.log("the solution",theSolution);









