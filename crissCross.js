var Column = require('./column');
var columns = require('./level');
var [move,lstOfMove] = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');
var startTime = new Date().getTime();

console.log(columns);

//get the ball above the column
function topBall(col){
	let theCll = columns[col]
	let theBll = theCll[theCll.length -1]
	return theBll
}

function secondBall(col){
	//console.log("\n	    //secondeBall col",col);
	
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
	return [theBll,highSdBll]//if the second ball touch the bottom
}

function getColor(blue){
	let out = lstBigBall.findIndex(
		out => out[1] == blue	
	);
	return out
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

//all column who contain a blue ball and the one with the lowest ball above
function highestBlue(blue,colB,blackList){
	//console.log("		//highestBlue",blue,colB);//keep it
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

function getTwin(lstTwin){
	//console.log("\n	//get twin",lstTwin);
	
	if(lstTwin.length > columns.length){return}//loop killer
	
	let output =[];
	let lstOfCol =[];	//all col include in calcul (anti double)
	let lastCol = lstTwin[lstTwin.length -1];//last col of the list
	
	let secondBll = secondBall(lastCol);		//second ball of the botle
	if(secondBll == null){return [lstTwin,[]]}//it end with a new empty botle
	let [sdBall,sdBigBall] = secondBll;
	
	
	let theColor = getColor(sdBall);//if the second ball can go to color	
	if(theColor != -1){
		lstTwin.push([lastCol,theColor]);//take out the second ball
		
		let thirdLevel = columns[lastCol].length; //the level of third ball
		thirdLevel =- lstBigBall[lastCol][0] -sdBigBall-1;
		
		if(thirdLevel <0){return [lstTwin,[]]}//it end with a new empty botle
		else{
			sdBall = columns[lastCol][thirdLevel];//third ball
		}
	}
	
	let allBlue = highestBlue(sdBall,lastCol)[0];
		
	let thisTry;		//curent element of the loop
	let alreadyThere;	//short cut of intern loop
	let thisCoppy = []	//coppy of lstTwin 
	
	for(way in allBlue){
		thisTry = allBlue[way];
		thisCoppy = [...lstTwin];//clone
		
		if(topBall(thisTry) != sdBall){continue}//the ball is'nt on top
		
		if(lstBigBall[thisTry][0] > aboveIt(lastCol,sdBall)){continue}//big ball
		
		lstOfCol.push(thisTry);		
		alreadyThere =lstTwin.indexOf(thisTry);//if we loop on the list
		
		if(alreadyThere != -1){//if we loop on the list of move short cut
			thisCoppy = thisCoppy.slice(alreadyThere);//cut the col befor the loop
			output.push(thisCoppy);
			
		}else{//do it recursively
			thisCoppy.push(thisTry);
			let nextStep = getTwin(thisCoppy);//do it 
			
			if(nextStep[0].length != 0){		//if the next recursive loop work
				output = output.concat(nextStep[0]);	//return it for the previous
			} 
			lstOfCol = lstOfCol.concat(nextStep[1]);//add the col from the recursive
		}
	}return [output,lstOfCol]
}//get twin


let thisWay = [];			//local try
let lstOfCrissCross = [];	//global try
let a = [];

let alreadyTry =[];	//global anti double
let newTry =[];		//local  anti double

for( way in columns){
	if(columns[way].length == 0){continue}		//empty botle
	if(alreadyTry.indexOf(way) != -1){continue}	//already try this column
	if(lstBigBall[way][1] != 0){continue}		//its a color
	
	a = getTwin([way]);
	if(a[0].length == 0){continue}
	[thisWay,newTry] = a;
	console.log("\n i want it that way",thisWay);
	//console.log("all column include in calcul",newTry);
	lstOfCrissCross = lstOfCrissCross.concat(thisWay);
	
	alreadyTry = alreadyTry.concat(newTry);
	//console.log("lst global",alreadyTry);
}
console.log("\n",lstOfCrissCross);

var end = new Date().getTime();
var time = end - startTime;
console.log("calcul in",time/1000,"s");
