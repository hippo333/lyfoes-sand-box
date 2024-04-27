var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');

console.log(columns);
//console.log("big ball",lstBigBall);


//get the ball above the column
function topBall(col){
	let theCll = columns[col]
	let theBll = theCll[theCll.length -1]
	return theBll
}

//get what column can recive the ball
function Target(red,mode,cll){//cll bug
	let target =[];
	let theColor =-1;
	let emptyBotle =-1;
	
	let bgBll;
	if(cll!= null){
		bgBll = lstBigBall[cll][0];
	}
	
	for(col in columns){
		if(lstBigBall[col][1]==red){
			theColor= col;
		}else if(col ==cll){continue}
		else if(columns[col].length <4){
		
			if(topBall(col) ==red && 4-columns[col].length >=bgBll){
				target.push(col);
			}else if(columns[col].length ==0){
				emptyBotle = col;
			}
		}
	}
	switch(mode){
		case "rain":
			if(theColor != -1){
				console.log("the color",red,"the column",theColor);
				return theColor
			}else if(emptyBotle != -1){
					lstBigBall[emptyBotle][1] = red;
				return emptyBotle
			}else {
				console.log("i can't get Target on rain");
				//get a way to move it
			}
		
		break;
		case "free":
			if(target.length != 0){
				return target[0]
			}else if(theColor != -1){
				return theColor
			}else if(emptyBotle != -1){
				return emptyBotle
			}else {
				console.log("i can't get Target on free");
			}
		break;
	}
}

//all column who contain a blue ball
//the highest blue
function highestBlue(blue,colB){
	// position , nb of ball over the blue
	//colB is the source and we search a target
	let higestBl = [0,5];
	let allBlue = [];
	let existBlue;
	let above;
	
	for(col in columns){
		if(col == colB){continue}
		if(lstBigBall[col][1] == 0){
			existBlue = columns[col].lastIndexOf(blue);
			if(existBlue == -1){continue}
				//console.log("the column",col,"contain Blue",existBlue);
			//how many ball above the ball		
			above = (columns[col].length-1)-existBlue;
			if (colB != null && above < lstBigBall[colB][0]){continue}
			
			//console.log(columns[col]);
			if(above <= higestBl[1]){
				higestBl = [col,above];
				//console.log("the column",col,"contain higest Blue");
			}
			allBlue.push(col);
		}
	}
	return [allBlue,higestBl[0]]
}
//move the ball above the blue one
function freeBlue(blue,colBlue,otherTarget,loopKiler){
	if(loopKiler > 10){return}
	//console.log("colblue the column with a ball above the blue is",colBlue);
	let nastyBall = topBall(colBlue);
	let target = Target(nastyBall,"free",colBlue);
	
	if (target == null){
		//for the ball above get a target
		let highestWay = highestBlue(nastyBall,colBlue)[1];
		console.log(colBlue,"is blocked,",highestWay,"can help");
		//get the other column
		let nastyTarget = Target(topBall(highestWay),"free",highestWay);
		console.log("nasty target",nastyTarget);
		move(highestWay,nastyTarget);
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
function raining(green,target){
	console.log("\n// raining :",green);
	let lstColBlue= highestBlue(green)[0];
	//console.log("lst blue",lstColBlue);
	
	if (target == null){
		console.log("i didn't get the target for ",green);
		return null
	}
	
	let theCol;
	let itWork = false;
	for(way in lstColBlue){
		theCol = lstColBlue[way];
		if (topBall(theCol) == green){
			console.log("it work",theCol,target);
			move(theCol,target);
			itWork = true;
		}
	}
	if (!itWork){
		console.log("the col ",highestBlue(green)[1],"as the blue ball");
		freeBlue(green,highestBlue(green)[1],target,1);
	}
	return 0
}//over raining

function cycle(yellow){
	let colTarget = Target(yellow,"rain");
	let rain =raining(5,colTarget);
	
	if (rain == null){
		console.log("we can't rain",yellow);
		
	}


}

cycle(5);
console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);
cycle(5);
console.log(columns);/*
raining(5);
console.log(columns);*/


