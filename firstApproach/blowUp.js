
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



//make lst
function lstEmpty(){
	console.log("lstEmpty");
	
	let lstEmpty = columns0.filter(
		mpt => mpt.isEmpty()
	).map(x => columns0.indexOf(x));
	return lstEmpty
}

//who can go to color?
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

function getTarget(cll2,lvl2,bigBll,lstColor2,lstEmptyCol3){
	console.log("  getTarget, cll2",cll2,"lvl2",lvl2);
	
	let theCol = columns0[cll2];
	let theBall = theCol.content[lvl2];
	console.log("theBall",theBall,"bigBll",bigBll);
	
	let target = columns0.findIndex(
		tgt => tgt.content[0] == theBall
		&& tgt.isMonochrome()
	);
	if(target != -1){return [target]}
	
	target = lstColor2.find(
		tgt => tgt[0] == theBall	
	);
	if(target != undefined){
		console.log("target",target);
		if(target[2] +bigBll <= target[1]){
			return[lstColor2.indexOf(target)]
		}
		//throw Error("overFeed");}
	}
	//sort  b-a
	let highest = (a,b) => b.content.lastIndexOf(theBall) - a.content.lastIndexOf(theBall);
	let lstTarget = columns0.filter(
		tgt => tgt.content.includes(theBall)
		&& tgt.content.lastIndexOf(theBall) + bigBll < nbMaxBall
		&& columns0.indexOf(tgt) != cll2
		&& lstColor2[columns0.indexOf(tgt)].length ==0
	).sort(highest).map(x => columns0.indexOf(x)); 
	if(lstTarget.length !=0){return lstTarget}
	
	if(lstEmptyCol3.length ==0){ return []}
	
	lstTarget = [lstEmptyCol3[0]];
	lstEmptyCol3.shift();
	return lstTarget
}

function removeImpossible(lst){
	 return lst.filter(x => [...new Set(x)].length == x.length);
}
var makeLstColor = () => Array(columns0.length).fill([]);
let lstColor = [];	//witch color go to each column

function compose(lstSolution2){
	console.log("__compose",lstSolution2);
	
	
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


function makeColFrom(col2,lvl2){
	let colFrom = columns0[col2];
	let colFromBigBall = [...new Set(colFrom.content)];
	let theBall = colFromBigBall[lvl2];
	let bigBll = colFrom.lstBigBall[lvl2];
	
	return [colFrom,colFromBigBall,theBall,bigBll]
}

function archiveCol(solution2,lstColor2,lstPosition2,lstEmptyCol2){
	console.log("__archiveCol ,solution2",solution2);
	//console.log("lstColor2",lstColor2);
	
	//abstract(columns0);
	let remaining = [];
	
	for(i in solution2){
		let [col,lvl] = lstPosition2[i];
		
		let [colFrom,colFromBigBall,theBall,bigBll] = makeColFrom(col,lvl);
		console.log("col",col,"lvl",lvl);
		
				
		let colTo = solution2[i];
		console.log("colTo",colTo,"theBall",theBall);
		
		
		let sdCol = columns0[colTo];
		
		//if(sdCol.isEmpty()){lstEmptyCol2.shift()}
		
		let freePlace =nbMaxBall -sdCol.content.lastIndexOf(theBall)-1;
		console.log("sdCol",sdCol.content,"freePlace",freePlace);
		
		//let bigBll = colFrom.lstBigBall[lvl];
		
		let colorTo = lstColor2[colTo];
		remaining.push([colTo,theBall]);
		
		if(colorTo.length == 0){
			lstColor2[colTo] = [theBall,freePlace,bigBll];	
			continue;		
		}
		
		if(colorTo[0] != theBall){
			console.log("\ncolorTo",colorTo,"theBall",theBall);
			throw Error("theBall is different")
		}
		if(colorTo[2] + bigBll > colorTo[1]){
			console.log("theBall",theBall,"bigBll",bigBll);
			console.log("colorTo",colorTo);
			throw Error("Error: to many ball in the col");
		}
		
		colorTo[2] += bigBll;
	}
	//console.log("lstColor2",lstColor2);
	return [remaining,lstColor2]
}

//nextStep
function merge(solus2,lstPosition2){
	let output = [];
	
	for(i in solus2){
		let from = lstPosition2[i][0];
		let to = solus2[i];
		output.push([from,to]);
	}
	return output
}


function nextStep(remaining2,lstColor2,lstEmptyCol2,lstMv2){
	console.log("\nnextStep","lstColor2",lstColor2);
	console.log("remaining2",remaining2);
	abstract(columns0);
	let lstSolution = [];
	let lstPosition = [];
	
	it: for(element of remaining2){
		let [cll,theBall] = element;
		let thisCol = columns0[cll];
		
		if(thisCol.isEmpty()){continue}
		console.log("cll",cll);
		
		let theLevel = thisCol.content.lastIndexOf(theBall);
		if(theLevel == thisCol.content.length -1){continue}
		
		let bigBll = 1;
		for(let bll =thisCol.content.length -1; bll >theLevel; bll--){
			let thisBall = thisCol.content[bll];
			let previousBall = thisCol.content[bll-1];
			if(thisBall == previousBall){bigBll++;continue;}
			
			let lstTarget = getTarget(cll,bll,bigBll,lstColor2,lstEmptyCol2);
			if(lstTarget.length ==0){return}
			console.log("lstTarget",lstTarget)
			lstSolution.push(lstTarget);
			lstPosition.push([cll,bll]);
			
			bigBll =1;
		}
	}
	console.log("lstSolution",lstSolution);
	
	if(lstSolution.length ==0){
		console.log("\n\nwe finish");
		console.log("lstMv2",lstMv2.reverse());
		throw Error("we finish");
	}
	
	let composedSolution = compose(lstSolution);
	
	for(solus of composedSolution){
		let lstEmptyCol3 = [...lstEmptyCol2];
		let theMove = merge(solus,lstPosition).reverse();
		let lstMv3 = [...lstMv2].concat(theMove);
		let lstColor3 = [...lstColor2];
		let remaining3 = [];
		[remaining3,lstColor3] = archiveCol(solus,lstColor3,lstPosition,lstEmptyCol3);
			
		nextStep(remaining3,lstColor3,lstEmptyCol3,lstMv3);
		//throw Error("debug");
	}
}

//main
function tryToEmpty(lstCol2){
	console.log("tryToEmpty",lstCol2);
	
	let lstColor = makeLstColor();
	
	for(posibility of lstCol2){
		let lstEmptyCol = lstEmpty();
		let remaining = [[posibility,-1]];
		nextStep(remaining,lstColor,lstEmptyCol,[]);
	}
}

//reset
function makeLstBigBall(){
	
	for(col of columns0){
		col.lstBigBall = [];
		let bigBall = 1
		for(bll in col.content){
			let theBall = col.content[bll];
			let nextBall = col.content[parseInt(bll) +1];
			if(theBall == nextBall){bigBall++;continue;}
			col.lstBigBall.push(bigBall);
			
			bigBall =1;
		}
	}
}

function reset(nbMaxBall2){
	nbMaxBall = nbMaxBall2;
	history = [];
	makeLstBigBall();
}


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

//set up
columns0 = getTheLevel("blowUp0.2");
state = [columns0,lstOfMove];
abstract(columns0);
makeLstBigBall();

main(state);


module.exports = [main,reset]
