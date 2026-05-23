var startTime = new Date().getTime();
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
let lstSolution = [];



//make lst
function lstEmpty(){
	//console.log("lstEmpty");
	
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
	//console.log("  getTarget, cll2",cll2,"lvl2",lvl2);
	
	let theCol = columns0[cll2];
	let theBall = theCol.content[lvl2];
	//console.log("theBall",theBall,"bigBll",bigBll);
	
	let target = columns0.findIndex(
		tgt => tgt.content[0] == theBall
		&& tgt.isMonochrome()
	);
	if(target != -1){return [target]}
	
	target = lstColor2.find(
		tgt => tgt[0] == theBall	
	);
	if(target != undefined){
		//console.log("target",target);
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

function compose(lstPossible2){
	console.log("__compose",lstPossible2);
	
	
	let lstComposed = []
	for(id in lstPossible2){
		let level = lstPossible2[id];
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

//archiveCol
function makeColFrom(col2,lvl2){
	let colFrom = columns0[col2];
	let colFromBigBall = [...new Set(colFrom.content)];
	let theBall = colFrom.content[lvl2];
	let theBbLevel = colFromBigBall.lastIndexOf(theBall);
	let bigBll = colFrom.lstBigBall[theBbLevel];
	
	return [colFrom,colFromBigBall,theBall,bigBll]
}

function archiveCol(thisPossible,lstColor2,lstPosition2,lstEmptyCol2){
	console.log("__archiveCol ,thisPossible",thisPossible);
	console.log("lstPosition2",lstPosition2);
	//console.log("lstColor2",lstColor2);
	let needToRecalCul = [];
	
	//abstract(columns0);
	let remaining = [];
	
	for(mv in thisPossible){
		let [col,lvl] = lstPosition2[mv];
		
		let [colFrom,colFromBigBall,theBall,bigBll] = makeColFrom(col,lvl);
		console.log("col",col,"lvl",lvl);
		console.log("colFrom",colFrom.content);
		console.log("col",col,"theBall",theBall,"BibigBll",bigBll);
		//console.log("colFromBigBall",colFromBigBall);
		//console.log("lstBigBall",colFrom.lstBigBall);
				
		let to = thisPossible[mv];
		//console.log("to",to,"theBall",theBall);
		
		
		let colTo = columns0[to];
		
		//if(colTo.isEmpty()){lstEmptyCol2.shift()}
		
		let freePlace =nbMaxBall -colTo.content.lastIndexOf(theBall)-1;
		//console.log("colTo",colTo.content,"freePlace",freePlace);
		
		//let bigBll = colFrom.lstBigBall[lvl];
		let colorTo = lstColor2[to];
		if(colorTo[0] == theBall){
			needToRecalCul.push([to,lvl]);
			colorTo[2] += bigBll;
			continue;
		}
		remaining.push([to,theBall]);
		
		if(colorTo.length == 0){
			lstColor2[to] = [theBall,freePlace,bigBll];	
			continue;		
		}
		
		//throw Error//debug archiveCol
		
		if(colorTo[0] != theBall){
			console.log("\ncolorTo",colorTo,"theBall",theBall);
			console.log("from",col,"to",to);
			throw Error("theBall is different")
		}
		if(colorTo[2] + bigBll > colorTo[1]){
			console.log("\ntheBall",theBall,"bigBll",bigBll);
			console.log("colorTo",colorTo);
			throw Error("Error: to many ball in the col");
		}
		
		throw Error("debug");
		
		colorTo[2] += bigBll;
	}
	//console.log("lstColor2",lstColor2);
	return [remaining,lstColor2,needToRecalCul]
}

//merge
function nbBBAbove(col2,theBall2){
	//console.log("nbBBAbove, col2",col2,"theBall2",theBall2);
	
	let theCol = columns0[col2];
	//console.log("theCol",theCol);
	if(theCol.lstBigBall.length <2){return 0}
	
	let lstBall = [...new Set([...theCol.content].reverse())].reverse();
	let idBall = lstBall.indexOf(theBall2);
	console.log("lstBall",lstBall);
	
	let nbBigBallAbove = lstBall.length -1 - idBall;
	//console.log("nbBigBallAbove",nbBigBallAbove);
	
	return nbBigBallAbove
}

//nextStep
function merge(solus2,lstPosition2){
	let output = [];
	
	for(i in solus2){
		let [from,lvl] = lstPosition2[i];
		let colFrom = columns0[from];
		let theBall = colFrom.content[lvl];
		let to = solus2[i];
		let nbBBAboveFrom = nbBBAbove(from,theBall);
		let nbBBAboveTo = nbBBAbove(to,theBall);
		
		output.push([from,to,nbBBAboveFrom,nbBBAboveTo]);
	}
	return output
}

//addOtherMove
function miniCrissCross(lstMv2,suspectCol2,lstFree2){
	//console.log("miniCrissCross",lstMv2,"suspectCol2",suspectCol2);
	//console.log("lstFree2",lstFree2);
	
	let emptyCol = emptyBotle();
	if(emptyBotle ==-1){throw Error}//no EmptyBotle
	
	let suspectCol3 = [...suspectCol2];
	let lstId = [0];
	let lastMv = lstMv2[0];
	let branch = 0; //0from 1to
	for(let boop =0; boop< 2* lstMv2.length; boop++){//loopKille
		let previousMv =  lstMv2.find(
			prv => prv[0] == lastMv[branch]
			&& prv[2] < lastMv[branch +2]
		);
		if(previousMv == undefined){
			if(branch ==1){return false}//dont Loop miniCC
			branch =1;//to
			continue;
		}
		lastMv = previousMv;
		let id = lstMv2.indexOf(previousMv);
		if(lstId.includes(id)){
			let begening = lstId.indexOf(id);
			let theLoop = lstId.slice(id -1);
			if(theLoop.length ==0){return false}
			
			let ending = lstMv2[theLoop.pop()];
			console.log("ending",ending);
			let intermediate =[...ending];
			intermediate[0] = ending[1] = emptyCol;
			intermediate[2] = ending[3] = 0;
			lstMv2.push(intermediate);
			
			break;
		}
		lstId.push(id);
		branch = 0;//from
		continue;
		
	}
	
	return true
}


let lastLstMv = [];
//changeOrder
function addOtherMove(lstMv2,nextOrder2,lstFree2){
	//console.log("moveWhoCanPass");
	
	let lstMvPossible = lstMv2.filter(
		nxt => lstFree2[nxt[0]] >= nxt[2]
		&& lstFree2[nxt[1]] >= nxt[3]
	).reverse()//simplify the delete
	//console.log("lstMvPossible",lstMvPossible);
	
	if(lstMvPossible.length ==0){
		let miniCC = miniCrissCross(lstMv2,lastLstMv,lstFree2);
		
		if(miniCC){return true}
		return false
	}
	
	for(mv of lstMvPossible){
		nextOrder2.push(mv);
		let [from,to] = mv;
		lstFree2[from]++;
		let idMv = lstMv2.indexOf(mv);
		//console.log("isMv",idMv);
		lstMv2.splice(idMv,1);
	}
	lastLstMv = lstMvPossible.map(x=> x[0]);
	
	//throw Error//debug addOtherMove
	return true
}


function changeOrder(lstMv2){
	console.log("\nchangeOrder",[...lstMv2].reverse());
	
	let lstFree = Array(columns0.length).fill(0);
	let nextOrder = [];
	lastLstMv = [];
	//console.log("lstFree",lstFree);
	
	let nbMv = lstMv2.length;
	for(let bip =0; bip <=nbMv; bip++){//loopKiller
		let canAddMv = addOtherMove(lstMv2,nextOrder,lstFree);
		if(!canAddMv){nextOrder = [];break;}
		if(lstMv2.length ==0){break}
	}
	
	console.log("nextOrder",nextOrder);
	lstMv2 = nextOrder;
	
	
	return lstMv2
}

function dosItFit(lstMv2){
	console.log("itFit");
	
	let lstBall = columns0.map(x => [...x.content]);
	let lstBigBll = columns0.map(x => [...x.lstBigBall]);	
	abstract(columns0);
	
	for(mv of lstMv2){
		let [from,to] = mv;
		let ballFrom = lstBall[from][lstBall[from].length -1];
		let ballTo = lstBall[to][lstBall[to].length -1];
		if(ballFrom != ballTo && ballTo != undefined){return false}
		lstBall[from].pop()
		if(ballTo == undefined){lstBall.push(ballFrom)}
		
		let bigBll = lstBigBll[from].pop();
		if(lstBigBll[to].length ==0){lstBigBll[to].push(0)}
		lstBigBll[to][lstBigBll[to].length -1] += bigBll;
		
		let lengthTo = [...lstBigBll[to]].reduce((a,b) => a+b,0);
		if(lengthTo > nbMaxBall){return false}
	}
	console.log("yes");
	return true
	//throw Error//debug itFit
}


function nextStep(remaining2,lstColor2,lstEmptyCol2,lstMv2){
	console.log("\n  nextStep","lstMv2",lstMv2.length);
	//console.log("lstColor2",lstColor2);
	console.log("remaining2",remaining2);
	//abstract(columns0);
	let lstPossible = [];
	let lstPosition = [];
	let stopLater = false;
	

	it: for(element of remaining2){
		let [cll,theBall] = element;
		let thisCol = columns0[cll];
		
		if(thisCol.isEmpty()){continue}
		//console.log("cll",cll);
		
		let theLevel = thisCol.content.lastIndexOf(theBall);
		if(theLevel == thisCol.content.length -1){continue}
		
		//test
		let previousCall = lstMv2.filter(
			pv => pv[0] == cll			
		);
		if(previousCall.length >0){continue}
		
		
		
				
		let bigBll = 1;
		for(let bll7 =thisCol.content.length -1;bll7 >theLevel;bll7--){
			let thisBall = thisCol.content[bll7];
			console.log("cll",cll,"thisBall",thisBall);
			let previousBall = thisCol.content[bll7-1];
			if(thisBall == previousBall){bigBll++;continue;}
			
			let lstTarget = getTarget(cll,bll7,bigBll,lstColor2,lstEmptyCol2);
			if(lstTarget.length ==0){return}
			console.log("lstTarget",lstTarget)
			lstPossible.push(lstTarget);
			lstPosition.push([cll,bll7]);
			
			bigBll =1;
		}
		
	}
	//console.log("lstPossible",lstPossible);
	
	if(lstPossible.length ==0){
		lstMv2.reverse();
		console.log("\nwe blowUp");
		console.log("lstMv2",lstMv2,"\n\n");/*
		var end = new Date().getTime();	//timer
		var time = end - startTime;
		console.log(time/1000,"s");//*/
		let lstMv3 = changeOrder(lstMv2);
		if(lstMv3.length ==0){return}//nextStep
		let itFit = dosItFit(lstMv3);
		if(!itFit){return}//*/
		
		console.log("lstMv2",lstMv3);
		//throw Error//debug nextStep
		lstSolution.push(lstMv3);
		return
		//throw Error("we finish");
	}
	
	
	let composedPossible = compose(lstPossible);
	
	for(solus of composedPossible){
		let lstEmptyCol3 = [...lstEmptyCol2];
		let theMove = merge(solus,lstPosition).reverse();
		let lstMv3 = [...lstMv2].concat(theMove);
		let lstColor3 = [...lstColor2];
		let remaining3 = [];
		[remaining3,lstColor3,needToRecalcul3] = archiveCol(solus,lstColor3,lstPosition,lstEmptyCol3);
		
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

//test
function tryToFree(col2){
	console.log("tryToFree",col2);
	
	makeLstBigBall();
	let lstColor = makeLstColor();
	let lstEmptyCol = lstEmpty();
	let remaining = [[col2, -1]];
	nextStep(remaining,lstColor,lstEmptyCol,[]);

}


function doTheMove(thisSolution2){
	console.log("\ndoTheMove, thisSolution2",thisSolution2);
	
	for(mv of thisSolution2){
		let [from,to] = mv;
		move(state,from,to);
	}
	abstract(columns0);
	
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
	lstSolution = [];
}

var shortest = (a,b) => a.length - b.length;

function blowItUp(){
	console.log("blowUp");	
	
	let coloredCols = columns0.filter(
		cll => cll.isMonochrome()
	
	).map(x => columns0.indexOf(x));
	console.log("coloredCols",coloredCols);
	
	let lstFragileCol = fragile(coloredCols);
	tryToEmpty(lstFragileCol);
	
	if(lstSolution.length ==0){return false}
	lstSolution.sort(shortest);
	console.log("lstSolution",lstSolution);
}


function main(state2){
	console.log("\nblowUp");
	[columns0,lstOfMove] = state2;
	state = state2;
	abstract(columns0);
	makeLstBigBall();
	lstSolution = [];
	
	for(let bloc =history.length -1; bloc >=0; bloc--){
		let thisElement = history[bloc];
		
		if(thisElement[0] > lstOfMove.length){history.pop()}
		else if(thisElement[0] == lstOfMove.length){
			thisElement[1].shift();
			lstSolution = thisElement[1];
			
			if(lstSolution.length ==0){return false;}
			break;
			
		}else{
			blowItUp();
			if(lstSolution.length ==0){return false}
			history.push([lstOfMove.length, lstSolution]);
			console.log("a");
			break;
		}
	}
	
	if(history.length ==0){
		blowItUp();	
		if(lstSolution.length ==0){return false}
		history.push([lstOfMove.length, lstSolution]);
		console.log("b");
	}
		
	
	doTheMove(lstSolution[0]);
	//throw Error; //debug blowUp
	return "blowUp"
}

//set up
/*
columns0 = getTheLevel(4.582);
state = [columns0,lstOfMove];
abstract(columns0);
tryToFree(4);
//main(state);//*/


module.exports = [main,reset]
