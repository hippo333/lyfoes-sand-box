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
function Target(red){
	//get the column whith this color 
	let target = lstBigBall.findIndex(
			tgt=> tgt[1] == red
		);
	//else take an empty botle	
	if(target== -1){
		target = columns.findIndex(
			tgt=> tgt.length ==0
		);
	}
	// get a column who contain alrady the color
	if(target== -1){	
		target = columns.findIndex(
			tgt=> topBall(columns.indexOf(tgt)) ==red
			&& tgt.length == lstBigBall[columns.indexOf(tgt)][0]
		);
	}
	if(target== -1){
		return null
	}
	lstBigBall[target][1] = red;
	return target
}

//all column who contain a blue ball
//the highest blue
function highestBlue(blue){
	// position , nb of ball over the blue
	let higestBl = [0,5];
	let allBlue = [];
	let existBlue;
	let above;
	for(col in columns){
		if(lstBigBall[col][1] == 0){
			existBlue = columns[col].lastIndexOf(blue);
			if(existBlue == undefined){continue}
			//how many ball above the ball		
			above = (columns[col].length-1)-existBlue;
			//console.log(columns[col]);
			if(above <= higestBl[1]){
				higestBl = [col,above];
			}
			allBlue.push(col);
		}
	}
	return [allBlue,higestBl[0]]
}

//raining
function raining(green){
	let lstColBlue= highestBlue(green)[0];
	console.log("lst blue",lstColBlue);
	let target = Target(green);
	
	if (target == null){
		console.log("i didn't get the target for ",green);
		return
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
		//do it for only the first column who contain the ball
		//let thePbCol = lstColBlue[0]
		let thePbCol = highestBlue(green)[1];
		let b = topBall(thePbCol);
		let target2 = Target(b);
		
		//if it go to the same place
		if (target == target2){return}
		
		//if a is the second ball
		if(columns[thePbCol][columns[thePbCol].length -1 -lstBigBall[thePbCol][0]] == green){
			move(thePbCol,target2);
		}
	}
	console.log("\n// raining :",green);
}//over raining

raining(5);
console.log(columns);
raining(5);
console.log(columns);
raining(5);
console.log(columns);
raining(5);
console.log(columns);
//raining(5);
//console.log(columns);


