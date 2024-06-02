var Column = require('./column');
var columns = require('./level');
var [move,lstOfMove] = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');


//get the ball above the column
function topBall(col){
	let theCll = columns[col]
	let theBll = theCll[theCll.length -1]
	return theBll
}

//get what column can recive the ball
function Target(blue,mode,cll,blackList){
	//console.log("	//target",blue,mode,cll);//keep it
	let target =[];	// the mixed column who can recive the ball
	let theColor =-1;
	let emptyBotle =-1;
	if(blackList == undefined){blackList =[]}
	//else{console.log("blacklist",blackList)};
	
	let bgBll;
	if(cll!= null){
		bgBll = lstBigBall[cll][0];
	}
	
	for(col in columns){
		if(col ==cll){continue}
		
		if(lstBigBall[col][1]==blue){
			if(lstBigBall[col][0]==4){
				return "already finished";
			}
			theColor= col;
		}else if(columns[col].length <4){
		
			if(topBall(col) ==blue && 4-columns[col].length >=bgBll){
			//	if(blackList.indexOf(col) == -1){continue}
				target.push(col);
			}else if(columns[col].length ==0){
				emptyBotle = col;
			}
		}
	}	
	let priority = [target[0],theColor,emptyBotle];	//default for free mode
	if(mode == "rain"){
		priority = [theColor,emptyBotle,target[0]];
	}else if( mode == "clean"){
		priority = [theColor,target[0]];	
	}
	for(element in priority){
		if(priority[element] ==-1 ){continue}
		if(priority[element]==undefined){continue}	//for the target
		return priority[element]
	}
	console.log("i can't get taret in",mode);	//if it fail
	console.log("cll",cll);
	return "its blocked"
}

//all column who contain a blue ball and the one with the lowest ball above
function highestBlue(blue,colB,blackList){
	//console.log("	//highestBlue",blue,colB);//keep it
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
function freeBlue(colBlue,history){
	//console.log("	//freeBlue",colBlue);// keep it
	if(history == undefined){history=[]}
	if(history.length > 5){return}	
	
	let secondBall = topBall(colBlue);
	let target = Target(secondBall,"free",colBlue,history);
	
	//if the ball above can't get a target search to make it
	if (target =="its blocked"){
		//for the ball above get a target
		let secondCol = highestBlue(secondBall,colBlue,history)[1];

		history.push(secondCol);
		freeBlue(secondCol,history);
		return
		
	}	
		
	//first try with color
	if (target != -1){
		move(colBlue,target);
	}else{
		console.log("je le mait ou le ",b,"enfet?");
		return		
	}
}


//raining
function raining(blue,target){
	console.log("  // raining: color target",blue, target);//keep it
	let lstColBlue= highestBlue(blue)[0];
	
	if (target == null || target == undefined){
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

function doRain(){
	console.log("  //do rain");
	let blue ;
	for(col in columns){
		//console.log("big ball",lstBigBall[col]);
		if(lstBigBall[col][1] == 0 && columns[col].length > 1){continue;}
		if(lstBigBall[col][0] == 4){continue;}
		if(lstBigBall[col][0] == 0){continue;}
		
		else{
			//console.log("do rain",col);
			blue = topBall(col);
			let rain = raining(blue,col);
			
			if(rain =="it !work"){
				//console.log("free blue",blue);
				freeBlue(highestBlue(blue)[1]);		
			}else{//if it work clean the set
				let colFrom =lstOfMove[lstOfMove.length -1][0];
				console.log("clean");
				clean(colFrom);
			}		
		}
	}
}

function internMove(){
	console.log("  //interne move");
	
	for(coll in columns){
		if(lstBigBall[coll][1] != 0){continue;}//if ist not a color
		if(columns[coll].length == 0){continue;}//if not empty
		if(columns[coll].length ==4){continue}//get column not full
		
		console.log("the column with place for ball",coll);
		console.log(columns[coll]);
		
		let blue = topBall(coll);
		
		let theColor = lstBigBall.find(
			tcl => tcl[1] == blue
		);
		//get if an other column already ave the color
		if (theColor != undefined){continue}
		
		let lstColBlue = highestBlue(blue)[0];
		
		for(choice in lstColBlue){//for each column who contain a blue ball
			if(columns[coll].length ==4){return}
			
			let theCol = lstColBlue[choice];
			if(theCol == coll){continue;}
			if(topBall(theCol) == blue){
				if((lstBigBall[theCol] + columns[coll].length) > 4){continue}
				console.log("from ",theCol,"to",coll,"color",blue);
				move(theCol,coll);
			}
			
		}
		
	}
	console.log(columns);
	console.log("end intern move");
}

function clean(col){
	console.log("  // clean the col: ",col);
	//keep only big ball or ball alone
	if(lstBigBall[col][1] ==0 && lstBigBall[col][0] !=1){return}
	
	let ball = columns[col][0];
	
	let theTarget = Target(ball,"clean",col);
	console.log("target",theTarget);
	
	if(theTarget =="its blocked"){
		console.log("we can't clean:",columns[col]);
	}else{
		console.log("move:",col,theTarget);
		move(col,theTarget)
	}
	
	
}


function cycle(blue,loopKiller){
	console.log("\n//cycle",blue);//keep it
	if(blue == undefined){return}
	if(loopKiller > 5){return}
	if(loopKiller == undefined){loopKiller =1;}
	
	let colTarget = Target(blue,"rain");
	
	if(colTarget=="already finished" || colTarget == "its blocked"){
		let randomOtherColumn = lstBigBall.findIndex(
			otherCol => otherCol[0] >1
			&& otherCol[0] <4	
			&&  topBall(lstBigBall.indexOf(otherCol)) != blue
		);
		if(randomOtherColumn ==-1){
			return "the game is over"
		}
		let otherBall = topBall(randomOtherColumn);
		cycle(otherBall,loopKiller+1);
		return
	}
	
	doRain();
	internMove();
	
	let rain =raining(blue,colTarget);
	
	if (rain == "fail target"){
		console.log("we can't rain",blue);
		
	}if(rain =="it !work"){
		//console.log("free blue",blue);
		freeBlue(highestBlue(blue)[1]);		
	}else{//if it work clean the set
		let colFrom =lstOfMove[lstOfMove.length -1][0];
		console.log("clean");
		clean(colFrom);
	}
}

console.log(columns);
let theCycle = cycle(5,0);
for(let bip=0;bip <10;bip++){
	theCycle = cycle(5,0);
	if(theCycle == "the game is over"){
		console.log("lst of move",lstOfMove);
		return
	}
	console.log(bip,columns);
}

