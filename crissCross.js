var Column = require('./column');
var columns = require('./level');
var [move,lstOfMove] = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');

console.log(columns);

//get the ball above the column
function topBall(col){
	let theCll = columns[col]
	let theBll = theCll[theCll.length -1]
	return theBll
}

function secondBall(col){
	//console.log("	  //secondeBall col",col);
	if(typeof(col) == "object" ){
		col = columns.indexOf(col);
	}
	let theCll = columns[col];
	let bgBll = lstBigBall[col][0];
	
	if(bgBll == theCll.length){return null}
	
	let theBll = theCll[theCll.length - bgBll-1];
	
	return theBll
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
			hiestBlue = columns[col].lastIndexOf(blue);
			if(hiestBlue == -1){continue}
			
			above = (columns[col].length-1)-hiestBlue;//how many ball above blue
			//if (colB != null && above < lstBigBall[colB][0]){continue}
			
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
	//console.log("	//get twin",lstTwin);
	if(lstTwin.length > columns.length){//loop killer
		console.log("dafuck dude what can i do ");
		return
	}
	
	let outPut =[];
	let lastCol = lstTwin[lstTwin.length -1];//last col of the list
	let sdBall = secondBall(lastCol);
	
	if(sdBall == null){//if the column contain only one ball
		return [lstTwin]
	}
	
	let highestBl = highestBlue(sdBall,lastCol)[0];
		
	let thisTry;
	let alreadyThere;
	let thisCoppy = [] //coppy of lstTwin 
	
	for(way in highestBl){
		thisTry = highestBl[way];
		thisCoppy = lstTwin
		if(topBall(thisTry) != sdBall){continue}
		
		alreadyThere =lstTwin.indexOf(thisTry);//if we loop on the list
		
		if(alreadyThere != -1){//if we loop on the list of move
			thisCoppy.slice(alreadyThere);
			outPut.push(thisCoppy);
			
		}else{//do it recursively
			thisCoppy.push(thisTry);
			let nextStep =getTwin(thisCoppy);
			
			if(nextStep.length != 0){
				outPut.push(thisCoppy);
			} 
		}
	}
	return outPut
}//get twin

let thisWay = [];
let sdBall;
let highestBl;
let lstOfCrissCross = [];

for( way in columns){
	if(columns[way].length == 0){continue}
	thisWay = getTwin([way]);
	console.log("i want it that way",thisWay);
	lstOfCrissCross = lstOfCrissCross.concat(thisWay);
}
console.log(lstOfCrissCross);
