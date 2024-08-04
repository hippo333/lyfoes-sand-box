var Column = require('./column');
var columns = require('./level');
var [move,lstOfMove] = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');
var doTheMove = require('./doTheMove');
var startTime = new Date().getTime();

console.log(columns);

//get the ball above the column
function topBall(col){
	let theCll = columns[col]
	let theBll = theCll[theCll.length -1]
	return theBll
}

function secondBall(col){
	//console.log("\n      //secondeBall col",col);
	
	let theCll = columns[col];
	let bgBll = lstBigBall[col][0];
	
	
	if(bgBll == theCll.length){return null}
	
	let theBll = theCll[theCll.length - bgBll-1];
	let highSdBll =theCll.length - bgBll;
	
	for(bll = 1 ;bll<highSdBll;bll++){
		
		if(theCll[theCll.length - bgBll-1- bll] ==theBll){continue;}
		
		else{
		return [theBll,bll]}//the ball , the bigball
	}
	return [theBll,highSdBll,0]//if the second ball touch the bottom
}

function getColor(blue){
	let out = lstBigBall.findIndex(
		out => out[1] == blue	
	);
	if(out != -1){
		return out
	}else{
		return null
	}
}

function emptyBotle(){
	btl = lstBigBall.findIndex(
		btl => btl[0] ==0
		&& btl[1] == 0
	);
	if(btl != -1){
		return btl
	}else{
		return null
	}
}

function aboveIt(col,blue){
	let theCol = columns[col];
	let highestBl = theCol.lastIndexOf(blue);
	let above = (theCol.length-1)-highestBl;
	
	if(highestBl !=-1){
		return above
	}else {
		return null
	}
}

function Target(col){	//place for move the ball above col
	//console.log("      //target for col",col);
	let theCol = columns[col];
	let theBall = theCol[theCol.length -1];
	
	if(theBall == undefined){
		console.log("      can't find the ball above",col,theCol);
	}
	let theColor = getColor(theBall);
	if(theColor != null){
		//console.log("      i get a color for",theBall,theColor,columns[theColor]);
		return theColor
	}else{
		//console.log("      i can't get a color for",col,theBall);	
		let emptyBtl = emptyBotle();
		if (emptyBtl != null){
			return emptyBtl
		}else{
			console.log("      no target for",col);
			return null
		}
	}
}

//all column who contain a blue ball and the one with the lowest ball above
function highestBlue(blue,colB,blackList){
	//console.log("    //highestBlue",blue,colB);//keep it
	//colB is the source and we search a target
	let higestBl = [0,5]; //column , above
	let allBlue = [];
	let hiestBlue;	//the highest ball on the column
	let above;		//ball above the blue
	if(blackList == undefined){blackList = []}
	
	for(col in columns){
		if(col == colB){continue}
		if(blackList.indexOf(col) !=-1){continue}
		
		if(lstBigBall[col][1] == 0){
			above = aboveIt(col,blue);
			
			if(above == null){continue}// no blue in the col
			
			//console.log(		  columns[col]);
			if(above <= higestBl[1]){
				higestBl = [col,above];
			}
			allBlue.push(col);
		}
	}
	return [allBlue,higestBl[0]]
}

function ifColor(lstTwin, col, color){	//if we can move the ball to a color
	//console.log("	//ifColor lstTwin Col Color",lstTwin, col, color)

	let theCol = columns[col];
	let firstColor = theCol.lastIndexOf(color);
	let theColor;	
	let theBall;
	
	for(ball= firstColor;ball >=0;ball--){
		theBall = theCol[ball];
		theColor = getColor(theBall);
		
		if (theColor != null){
			lstTwin.push([col, theColor]);//take out the second ball
		}else{
			return [lstTwin, theCol[ball]]
		}
	}
	return [lstTwin, "finish"]

}

function doAllMove(lstCrissCross){
	for(way in lstCrissCross){
		doTheMove(lstCrissCross[way]);
	}
}

function isFinish(){
	console.log("is finish ?");
	for(col in lstBigBall){
		if(lstBigBall[col][0] != 0 && lstBigBall[col][0] != 4){
			console.log("no the col",col,"is not finish");
			console.log(lstBigBall[col]);
			return false
		}
	}
	console.log("all is finish");
	return true
}

function getTwin(lstTwin,alreadyTry){
	//console.log("\n  //get twin",lstTwin);
	
	if(lstTwin.length > columns.length){return}//loop killer
	
	let output =[];
	let lstOfCol =[];	//all col include in calcul (anti double)
	let lastCol = lstTwin[lstTwin.length -1];//last col of the list
	
	
	let bllBelow = secondBall(lastCol);		//second ball of the botle
	if(bllBelow == null){return [lstTwin,[]]}//it end with a new empty botle
	let [sdBall,sdBigBall] = bllBelow;
	
	
	let afterClr = ifColor(lstTwin, lastCol, sdBall);
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
	let allBlue = highestBlue(sdBall,lastCol)[0];
		
	let thisTry;		//curent element of the loop
	let alreadyThere;	//short cut of intern loop
	let thisCoppy = []	//coppy of lstTwin 
	
	for(way in allBlue){
		thisTry = allBlue[way];
		thisCoppy = [...lstTwin];//clone
		//console.log("  all blue element",way,thisTry);
		
		if(topBall(thisTry) != sdBall){continue}//the ball is'nt on top
		if(alreadyTry.indexOf(thisTry) != -1){continue}	//already try this column
		
		if(lstBigBall[thisTry][0] > aboveIt(lastCol,sdBall)){continue}//big ball
		
		lstOfCol.push(thisTry);		
		alreadyThere =lstTwin.indexOf(thisTry);//if we loop on the list
		
		if(alreadyThere != -1){//if we loop on the list of move short cut
			let firstMove = [,thisCoppy[0]];
			firstMove[0] = thisTry;
			//console.log("  firstMove",firstMove);
			thisCoppy = thisCoppy.slice(alreadyThere+1);//cut the col befor the loop
			
			thisCoppy = [firstMove].concat(thisCoppy);
			output.push(thisCoppy);
			
		}else{//do it recursively
			thisCoppy.push(thisTry);
			let nextStep = getTwin(thisCoppy,alreadyTry);//do it 
			
			if(nextStep[0].length != 0){		//if the next recursive loop work
				output = output.concat(nextStep[0]);	//return it for the previous
			} 
			lstOfCol = lstOfCol.concat(nextStep[1]);//add the col from the recursive
		}
	}return [output,lstOfCol]
}//get twin

function crissCross(){
	let thisWay = [];			//local try
	let lstOfCrissCross = [];	//global try
	let a = [];					//intermediar buffer
	let emptyBtl = emptyBotle();	//nececary for the first move
	let target ;					//same with color


	let alreadyTry =[];	//global anti double
	let newTry =[];		//local  anti double

	for( way in columns){
		if(columns[way].length == 0){continue}		//empty botle
		if(alreadyTry.indexOf(way) != -1){continue}	//already try this column
		if(lstBigBall[way][1] != 0){continue}		//its a color
		target = Target(way);
	
		a = getTwin([target,way],alreadyTry);
		if(a[0].length == 0){continue}
		[thisWay,newTry] = a;
		console.log("\n i want it that way",thisWay);
		//console.log("all column include in calcul",newTry);
	
		lstOfCrissCross = lstOfCrissCross.concat(thisWay);
	
		alreadyTry = alreadyTry.concat(newTry);
		//console.log("lst global",alreadyTry);
	}
	return lstOfCrissCross
}





	//first Cycle
let thisCc ;
for(let i=0;i<3;i++){
	thisCc = crissCross();
	if(thisCc.length ==0){
		console.log("no move posible");
		if(isFinish()){
			console.log("it works");
		}else{
			console.log("what can i do ?\n",columns);
		}
		return
	}
	console.log("\n",thisCc);
	doAllMove(thisCc);
}

var end = new Date().getTime();
var time = end - startTime;
console.log("calcul in",time/1000,"s");
