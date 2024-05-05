var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');


//get the ball above the column
function topBall(col){
	let theCll = columns[col]
	let theBll = theCll[theCll.length -1]
	return theBll
}

//get what column can recive the ball
function Target(blue,mode,cll){
	let target =[];	// the mixed column who can recive the ball
	let theColor =-1;
	let emptyBotle =-1;
	
	let bgBll;
	if(cll!= null){
		bgBll = lstBigBall[cll][0];
	}
	
	for(col in columns){
		if(col ==cll){continue}
		
		else if(lstBigBall[col][1]==blue){
			theColor= col;
		}else if(columns[col].length <4){
		
			if(topBall(col) ==blue && 4-columns[col].length >=bgBll){
				target.push(col);
			}else if(columns[col].length ==0){
				emptyBotle = col;
			}
		}
	}	
	let priority = [target[0],theColor,emptyBotle];	//default for free mode
	if(mode == "rain"){
		priority = [theColor,emptyBotle,target[0]];
	}
	for(element in priority){
		if(priority[element] ==-1 ){continue}
		if(priority[element]==undefined){continue}	//for the target
		return priority[element]
	}
	console.log("i can't get taret in",mode);	//if it fail
}

//all column who contain a blue ball and the one with the lowest ball above
function highestBlue(blue,colB){
	//colB is the source and we search a target
	let higestBl = [0,5]; //column , above
	let allBlue = [];
	let hiestBlue;	//the highest ball on the column
	let above;		//ball above the blue
	
	for(col in columns){
		if(col == colB){continue}
		
		if(lstBigBall[col][1] == 0){
			hiestBlue = columns[col].lastIndexOf(blue);
			if(hiestBlue == -1){continue}	
			
			above = (columns[col].length-1)-hiestBlue;
			if (colB != null && above < lstBigBall[colB][0]){continue}
			
			//console.log(columns[col]);
			if(above <= higestBl[1]){
				higestBl = [col,above];
			}
			allBlue.push(col);
		}
	}
	return [allBlue,higestBl[0]]
}
//move the ball above the blue one
function freeBlue(colBlue){
	//the ball above the blue
	let secondBall = topBall(colBlue);
	let target = Target(secondBall,"free",colBlue);
	
	//if the ball above can't get a target search to make it
	if (target == null){
		//for the ball above get a target
		let secondCol = highestBlue(secondBall,colBlue)[1];
		//get the other column
		let thirdCol = Target(topBall(secondCol),"free",secondCol);
		
		move(secondCol,thirdCol);
		return
	}	
		
	//first try with color
	if (target != -1){
		//console.log("free blue");
		move(colBlue,target);
	}else{
		console.log("je le mait ou le ",b,"enfet?");
		return		
	}
}


//raining
function raining(blue,target){
	console.log("\n// raining :",blue);
	let lstColBlue= highestBlue(blue)[0];
	
	if (target == null || target == undefined){
		console.log("i didn't get the target for ",blue);
		return "fail target"
	}
	
	let theCol;
	let itWork = false;
					//move all ball who can go to the color
	for(way in lstColBlue){
		theCol = lstColBlue[way];
		
		if (topBall(theCol) == blue){
			console.log("rain",theCol,target);
			move(theCol,target);
			itWork = true;
		}
	}
	if (!itWork){
		return "it !work"
	}
}//over raining


function cycle(blue){
	let colTarget = Target(blue,"rain");
	if(colTarget==undefined){return}
	
	if(lstBigBall[colTarget][0] == 4){
		let randomOtherColumn = lstBigBall.findIndex(
			otherCol => otherCol[0] >1
			&& otherCol[0] <4			
		);
		
		let otherBall = topBall(randomOtherColumn);
		console.log("the column is in game",randomOtherColumn);
		console.log("the top ball of it ",otherBall);
		blue = otherBall;
		colTarget = Target(blue,"rain");
	}
	
	let rain =raining(blue,colTarget);
	
	if (rain == "fail target"){
		console.log("we can't rain",blue);
		
	}if(rain =="it !work"){
		freeBlue(highestBlue(blue)[1]);		
	}
}

console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);

