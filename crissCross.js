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
	if(lstTwin.length > columns.length){
		console.log("dafuck dude what can i do ");
		return
	}//loop killer
	
	let outPut =[];
	let lstOfCol =[];	//all col include in calcul (anti double)
	let lastCol = lstTwin[lstTwin.length -1];//last col of the list
	let sdBall = secondBall(lastCol);		//second ball of the botle
	
	if(sdBall == null){//if the column contain only one ball
		return [lstTwin]
	}//it end with a new empty botle
	
	let allBlue = highestBlue(sdBall,lastCol)[0];
		
	let thisTry;		//curent element of the loop
	let alreadyThere;	//short cut of intern loop
	let thisCoppy = []	//coppy of lstTwin 
	
	for(way in allBlue){
		thisTry = allBlue[way];
		thisCoppy = lstTwin
		
		if(topBall(thisTry) != sdBall || lstBigBall[thisTry][0] != 1){continue}
		lstOfCol.push(thisTry);		
		
		alreadyThere =lstTwin.indexOf(thisTry);//if we loop on the list
		
		if(alreadyThere != -1){//if we loop on the list of move short cut
			thisCoppy.slice(alreadyThere);
			outPut.push(thisCoppy);
			
		}else{//do it recursively
			thisCoppy.push(thisTry);
			let nextStep =getTwin(thisCoppy);
			
			if(nextStep != null){		//if the next recursive loop work
				outPut.push(thisCoppy);	//return it for the previous
				lstOfCol = lstOfCol.concat(nextStep[1]);
				console.log("this line is strange",thisCoppy);
			} 
		}//dafuck
	}
	
	if(outPut != lstTwin){
		//console.log("lst of col",lstOfCol);
		return [outPut,lstOfCol]//succes end
	}else{
		return null	//fail end
	}
}//get twin

let thisWay = [];			//local try
let lstOfCrissCross = [];	//global try

let alreadyTry =[];	//global anti double
let newTry =[];		//local  anti double

for( way in columns){
	if(columns[way].length == 0){continue}		//empty botle
	if(alreadyTry.indexOf(way) != -1){continue}	//already try this column
	
	[thisWay,newTry] = getTwin([way]);
	console.log("\n i want it that way",thisWay);
	//console.log("all column include in calcul",newTry);
	lstOfCrissCross = lstOfCrissCross.concat(thisWay);
	
	alreadyTry = alreadyTry.concat(newTry);
	//console.log("lst global",alreadyTry);
}
console.log("\n",lstOfCrissCross);
