
var column = require('../tools/column');
var getTheLevel = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var [newVcolumn, Vupdate, Vcoppy] = require('../tools/Vcolumn');


function emptyBotle(){
	return columns0.findIndex(x => x.isEmpty())
}

function otherColumn(col2){
	let theBigBll = columns0[col2].bigBall;
	let theBll = columns0[col2].top();
	
	let otherCol = columns0.findIndex(
		cll => cll.top() == theBll
		&& columns0.indexOf(cll) != col2
		&& cll.content.length + theBigBll <= nbMaxBall
	);
	
	if(otherCol == -1){
		otherCol = emptyBotle()
	}
	return otherCol
}


let lstOfMove = [];
let columns0 = [];
let state = [columns0,lstOfMove];
let nbMaxBall = 4; //default
let history = [];


//set up
columns0 = getTheLevel("blowUp0");
state = [columns0,lstOfMove];
abstract(columns0);


function getEmpty(){
	console.log("getEmpty");
	
	let lstEmpty = columns0.filter(
		mpt => mpt.isEmpty()
	).map(x => columns0.indexOf(x));
	return lstEmpty
}


function fragile(lstCol2){
	console.log("fragile",lstCol2);	
		
	let lstColors = lstCol2.map(x => columns0[x].content[0])
	console.log("lstColors",lstColors);
	
	let lstFragileCol = [];
	inColumn: for(cll in columns0){
		if(lstCol2.includes(parseInt(cll))){continue}
		let thisCol = columns0[cll];
		
		for(clr of lstColors){
			if(thisCol.content.includes(clr)){
				lstFragileCol.push(parseInt(cll))
				continue inColumn;
			}
		}
	}
	console.log("lstFragileCol",lstFragileCol);	
	return lstFragileCol
}

let lstEmptyCol = [];
function getTarget(cll2,lvl2,bigBll){
	console.log("  getTarget, cll2",cll2,"lvl2",lvl2);
	
	let theCol = columns0[cll2];
	let theBall = theCol.content[lvl2];
	console.log("theBall",theBall,"bigBll",bigBll);
	
	let lstTarget = [columns0.findIndex(
		tgt => tgt.content[0] == theBall
		&& tgt.isMonochrome()
	)];
	if(lstTarget[0] != -1){return lstTarget}
	
	
	lstTarget = columns0.filter(
		tgt => tgt.content.includes(theBall)
		&& tgt.content.lastIndexOf(theBall) + bigBll < nbMaxBall
		&& columns0.indexOf(tgt) != cll2
	).map(x => columns0.indexOf(x)); 
	if(lstTarget.length !=0){return lstTarget}
	
	if(lstEmptyCol.length ==0){ return []}
	
	lstTarget = [lstEmptyCol[0]];
	lstEmptyCol.shift();
	return lstTarget
}

function removeImpossible(lst){
	 return lst.filter(x => [...new Set(x)].length == x.length);
}
var makeLstColor = () => Array(columns0.length).fill([]);
let lstColor = [];	//witch color go to each column

function compose(lstSolution2){
	console.log("\ncompose",lstSolution2);
	
	
	let lstComposed = []
	for(id in lstSolution2){
		let level = lstSolution2[id];
		if(id ==0){lstComposed = level.map(x => [x]);continue}
		
		let lstComposed2 = [];
		for(cll3 of level){
			let thisLst = lstComposed.map(x => x.concat(cll3));
			lstComposed2.push(...thisLst);
		}
		lstComposed = lstComposed2;
	}
	lstComposed = removeImpossible(lstComposed);
	return lstComposed
}

function archiveCol(col2,solution2,lstColor2){
	console.log("__archiveCol, col2",col2,"solution2",solution2);
	console.log("lstColor2",lstColor2);
	
	//abstract(columns0);
	
	let theCol = columns0[col2];
	let theColBigBall = [...new Set(theCol.content)]
	let theLength = theColBigBall.length -1;
	
	for(lvl in solution2){
		let secondCol = solution2[lvl];
		let theBall = theColBigBall[theLength -lvl];
		console.log("secondCol",secondCol,"theBall",theBall);
		let sdCol = columns0[secondCol];
		let freePlace =nbMaxBall -sdCol.content.lastIndexOf(theBall)-1;
		console.log("sdCol",sdCol.content,"freePlace",freePlace);
		let bigBll = theCol.lstBigBall[lvl];
		
		let thisColor = lstColor2[secondCol];
		if(thisColor.length == 0){
			lstColor2[secondCol] = [theBall,freePlace,bigBll];	
			continue;		
		}
		
		if(thisColor[0] != theBall){
			throw Error("theBall is different")
		}
		if(thisColor[2] + bigBll > thisColor[1]){
			console.log("theBall",theBall,"bigBll",bigBll);
			console.log("thisColor",thisColor);
			throw Error("to many ball in the col");
		}
		
		thisColor[1] += bigBll;
	}
	console.log("lstColor2",lstColor2);
}


function tryToEmpty(lstCol2){
	console.log("tryToEmpty",lstCol2);
	
	it: for(cll of lstCol2){
		lstEmptyCol = getEmpty();
		let lstColor = makeLstColor();
		let thisCol = columns0[cll];
		thisCol.lstBigBall = [];
		let lstSolution = [];
		let bigBll =1;
		for(let bll =thisCol.content.length -1; bll >=0; bll--){
			let thisBall = thisCol.content[bll];
			let previousBall = thisCol.content[bll -1];
			if(thisBall == previousBall){bigBll++; continue;}
			
			let lstTarget =getTarget(cll,bll,bigBll);
			console.log("lstTarget",lstTarget);
			if(lstTarget.length ==0){continue it}//it's imposible
			
			lstSolution.push(lstTarget);
			thisCol.lstBigBall.push(bigBll);
			bigBll =1;
		}
		console.log("lstSolution",lstSolution);
		
		//lstSolution = [[1,2,3],[3,4,5]];//test
		
		let composedSolution = compose(lstSolution);
		
		for(solus of composedSolution){
			let lstColor2 = [...lstColor];
			archiveCol(cll,solus,lstColor2);
		
		}
	}
	
}

function reset(nbMaxBall2){
	nbMaxBall = nbMaxBall2;
	history = [];
}

let colUsed = [];
let colUsedFor = []; //[col, color];
let ballToHide = [];
let [col, level] = [4, -1]; //test

function main(state2){
	console.log("\nblowUp");
	[columns0,lstOfMove] = state2;
	state = state2;
	abstract(columns0);
	
	let coloredCols = columns0.filter(
		cll => cll.isMonochrome()
	
	).map(x => columns0.indexOf(x));
	console.log("coloredCols",coloredCols);
	
	let lstFragileCol = fragile(coloredCols);
	tryToEmpty(lstFragileCol);
	
}

main(state);


module.exports = [main,reset]
