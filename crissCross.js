var startTime = new Date().getTime();
var Column = require('./column');
var columns = require('./level');
var [move,lstOfMove] = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');
var doTheMove = require('./doTheMove');
var coppy = require('./coppy');

let firstState = [columns,lstBigBall,lstOfMove];
let lstOfStates = [firstState];

console.log(columns);

//get the ball above the column
function topBall(columns2,col){
	let theCll = columns2[col]
	let theBll = theCll[theCll.length -1]
	return theBll
}

function secondBall(state,col){
	//console.log("\n      //secondeBall col",col);
	let [columns2,lstBigBall2,xxx] = state;
	//console.log("      thecll",columns2[col]);
	
	let theCll = columns2[col];
	let bgBll = lstBigBall2[col][0];
	
	//console.log("      bgBll",bgBll);
	//console.log("      thecll",theCll);
	if(bgBll == theCll.length){return null}
	
	let theBll = theCll[theCll.length - bgBll-1];
	let highSdBll =theCll.length - bgBll;
	//console.log("      highSdBll",highSdBll);
	
	for(bll = 1 ;bll<highSdBll;bll++){
		
		if(theCll[theCll.length - bgBll-1- bll] ==theBll){continue;}
		
		else{
		return [theBll,bll]}//the ball , the bigball
	}
	return [theBll,highSdBll,0]//if the second ball touch the bottom
}

function getColor(lstBigBall2,blue){
	let out = lstBigBall2.findIndex(
		out => out[1] == blue	
	);
	if(out != -1){
		return out
	}else{
		return null
	}
}

function emptyBotle(lstBigBall2){
	btl = lstBigBall2.findIndex(
		btl => btl[0] ==0
		&& btl[1] == 0
	);
	if(btl != -1){
		return btl
	}else{
		return null
	}
}

function aboveIt(columns2,col,blue){
	
	let theCol = columns2[col];
	let highestBl = theCol.lastIndexOf(blue);
	let above = (theCol.length-1)-highestBl;
	
	if(highestBl !=-1){
		return above
	}else {
		return null
	}
}

function Target(state,col){	//place for move the ball above col
	//console.log("      //target for col",col);
	
	let [columns2,lstBigBall2,xxx] = state;
	let theCol = columns2[col];
	let theBall = theCol[theCol.length -1];
	
	if(theBall == undefined){
		console.log("      can't find the ball above",col,theCol);
	}
	let theColor = getColor(lstBigBall2,theBall);
	if(theColor != null){
		//console.log("      i get a color for",theBall,theColor,columns2[theColor]);
		return theColor
	}else{
		//console.log("      i can't get a color for",col,theBall);	
		let emptyBtl = emptyBotle(lstBigBall2);
		if (emptyBtl != null){
			return emptyBtl
		}else{
			console.log("      no target for",col);
			return null
		}
	}
}

//all column who contain a blue ball and the one with the lowest ball above
function highestBlue(state,blue,colB,blackList){
	//console.log("    //highestBlue",blue,colB);//keep it
	//colB is the source and we search a target
	let [columns2,lstBigBall2,xxx] = state;
	
	let higestBl = [0,5]; //column , above
	let allBlue = [];
	let hiestBlue;	//the highest ball on the column
	let above;		//ball above the blue
	if(blackList == undefined){blackList = []}
	
	for(col in columns2){
		if(col == colB){continue}
		if(blackList.indexOf(col) !=-1){continue}
		
		if(lstBigBall2[col][1] == 0){
			above = aboveIt(columns2,col,blue);
			
			if(above == null){continue}// no blue in the col
			
			//console.log(		  columns2[col]);
			if(above <= higestBl[1]){
				higestBl = [col,above];
			}
			allBlue.push(col);
		}
	}
	return [allBlue,higestBl[0]]
}

function ifColor(state,lstTwin, col, color){	//if we can move the ball to a color
	//console.log("	//ifColor lstTwin Col Color",lstTwin, col, color)
	let [columns2,lstBigBall2,xxx] = state;

	let theCol = columns2[col];
	let firstColor = theCol.lastIndexOf(color);
	let theColor;	
	let theBall;
	
	for(ball= firstColor;ball >=0;ball--){
		theBall = theCol[ball];
		theColor = getColor(lstBigBall2,theBall);
		
		if (theColor != null){
			lstTwin.push([col, theColor]);//take out the second ball
		}else{
			return [lstTwin, theCol[ball]]
		}
	}
	return [lstTwin, "finish"]

}

function doAllMove(state,lstCrissCross){
	let newState = [];
	
	
	for(way in lstCrissCross){
		if(way != lstCrissCross.length-1){
			newState = coppy(state);
			lstOfStates.push(newState)
		}else{
			newState = state;
		}
		doTheMove(newState,lstCrissCross[way]);
	}
}

function isFinish(lstBigBall2){
	//console.log("is finish ?");
	
	for(col in lstBigBall2){
		if(lstBigBall2[col][0] != 0 && lstBigBall2[col][0] != 4){
			console.log("no the col",col,"is not finish");
			console.log(lstBigBall2[col]);
			return false
		}
	}
	//console.log("all is finish");
	return true
}

function getTwin(state,lstTwin,alreadyTry){
	//console.log("\n  //get twin",lstTwin);
	let [columns2,lstBigBall2,xxx] = state;
	
	if(lstTwin.length > columns2.length){return}//loop killer
	
	let output =[];
	let lstOfCol =[];	//all col include in calcul (anti double)
	let lastCol = lstTwin[lstTwin.length -1];//last col of the list
	
	//console.log("  the col",columns2[lastCol]);
	let bllBelow = secondBall(state,lastCol);		//second ball of the botle
	//console.log("  bllBelow",bllBelow);
	if(bllBelow == null){return [lstTwin,[]]}//it end with a new empty botle
	let [sdBall,sdBigBall] = bllBelow;
	
	
	let afterClr = ifColor(state,lstTwin, lastCol, sdBall);
	if(afterClr != undefined){
		//console.log("  afterClr",afterClr);
		[lstTwin, sdBall] = afterClr;
		
		//console.log("  sdBall",sdBall);
		if(sdBall == "finish"){
			let firstBall = lstTwin[1];
			let goToEmpty = [firstBall,lstTwin[0]];	//clean the first move
			
			lstTwin = lstTwin.slice(2);		//remove old begin
			lstTwin = [goToEmpty].concat(lstTwin);	//insert new at begin
			
			return [lstTwin,[]]
		}
	}
	let allBlue = highestBlue(state,sdBall,lastCol)[0];
		
	let thisTry;		//curent element of the loop
	let alreadyThere;	//short cut of intern loop
	let thisCoppy = []	//coppy of lstTwin 
	
	for(way in allBlue){
		thisTry = allBlue[way];
		thisCoppy = [...lstTwin];//clone
		//console.log("  all blue element",way,thisTry);
		
		if(topBall(columns2,thisTry) != sdBall){continue}//the ball is'nt on top
		if(alreadyTry.indexOf(thisTry) != -1){continue}	//already try this column
		
		if(lstBigBall2[thisTry][0] > aboveIt(columns2,lastCol,sdBall)){continue}//big ball
		
		lstOfCol.push(thisTry);		
		alreadyThere =lstTwin.indexOf(thisTry);//if we loop on the list
		
		if(alreadyThere != -1){//if we loop on the list of move short cut
			let firstMove = [,thisCoppy[0]];
			firstMove[0] = thisTry;
			thisCoppy = thisCoppy.slice(alreadyThere+1);//cut the col befor the loop
			
			thisCoppy = [firstMove].concat(thisCoppy);
			output.push(thisCoppy);
			
		}else{//do it recursively
			thisCoppy.push(thisTry);
			let nextStep = getTwin(state,thisCoppy,alreadyTry);//do it 
			
			if(nextStep[0].length != 0){		//if the next recursive loop work
				output = output.concat(nextStep[0]);	//return it for the previous
			} 
			lstOfCol = lstOfCol.concat(nextStep[1]);//add the col from the recursive
		}
	}return [output,lstOfCol]
}//get twin

function crissCross(state){
	
	let [columns2,lstBigBall2,xxx] = state;
	
	let thisWay = [];			//local try
	let lstOfCrissCross = [];	//global try
	let a = [];					//intermediar buffer
	let emptyBtl = emptyBotle(lstBigBall2);	//nececary for the first move
	let target ;					//same with color


	let alreadyTry =[];	//global anti double
	let newTry =[];		//local  anti double

	for( way in columns2){
		if(columns2[way].length == 0){continue}		//empty botle
		if(alreadyTry.indexOf(way) != -1){continue}	//already try this column
		if(lstBigBall2[way][1] != 0){continue}		//its a color
		target = Target(state,way);
	
		a = getTwin(state,[target,way],alreadyTry);
		if(a[0].length == 0){continue}
		[thisWay,newTry] = a;
		console.log(" i want it that way",thisWay);
		//console.log("all column include in calcul",newTry);
	
		lstOfCrissCross = lstOfCrissCross.concat(thisWay);
	
		alreadyTry = alreadyTry.concat(newTry);
		//console.log("lst global",alreadyTry);
	}
	return lstOfCrissCross
}




	//first Cycle
let thisCc ;
let thisState =[];
for(let i=0;i<5;i++){

	console.log("\n",i,"step");
	console.log(lstOfStates.length,"way");
	
	for(j in lstOfStates){
		thisState = lstOfStates[j];
		thisCc = crissCross(thisState);
	
		if(thisCc.length ==0){
			console.log("\nno move posible");
			if(isFinish(thisState[1])){
			
				console.log("it works");
				var end = new Date().getTime();
				var time = end - startTime;
				console.log("calcul in",time/1000,"s");
				console.log(thisState[2]);
				return
				
			}else{
				console.log("what can i do ?\n",thisState[0]);
				lstOfStates.splice(j,1);
				//continue;
			}
		}else{
		console.log("\n",thisCc);
		doAllMove(thisState,thisCc);
		}
	}
}

