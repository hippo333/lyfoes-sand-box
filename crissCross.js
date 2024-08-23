var Column = require('./column');
var [bigBall,lstBigBall] = require('./bigBall');


//get the ball above the column
function topBall(columns2,col){
	let theCll = columns2[col]
	let theBll = theCll[theCll.length -1]
	return theBll
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

function secondBall(state,col,lstTwin,level){
	//console.log("\n    //secondeBall col",col);
	//console.log("      lst Twin",lstTwin);
	let [columns2,lstBigBall2,lstOfMove2] = state;
	//console.log("      columns",columns2);
	
	let thisBigBall = lstBigBall2[col][0];	//the big bal of the column
	let thisCol = columns2[col];			//curent column
	let secondBallLevel;
	
	if(thisBigBall == thisCol.length || level ==0){
		return null
	}	//if it contain only one big ball
	
	if(level == undefined){
		secondBallLevel = thisCol.length -1 -thisBigBall;
	}else{
		secondBallLevel = level-1;
	}
	
	let secondBall = thisCol[secondBallLevel];
	let secondBigBall = 1;
	
	for(let i = secondBallLevel-1;i>=0;i--){
	//	console.log("\n    :level",i,"ball",thisCol[i]);
		
		if(thisCol[i]== secondBall){
			secondBigBall++;
			continue;
		}
		
		i= -1;
	}
	if(secondBall == null){return null}
		
	//console.log("      second ball",secondBall,"second big ball",secondBigBall);
	return [secondBall,secondBigBall]
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
function AllBlue(state,blue,colB,blackList){
	//console.log("    //highestBlue",blue,colB);//keep it
	//colB is the source and we search a target
	let [columns2,lstBigBall2,xxx] = state;
	
	
	let allBlue = [];
	let above;		//ball above the blue
	if(blackList == undefined){blackList = []}
	
	for(col in columns2){
		if(col == colB){continue}
		if(blackList.indexOf(col) !=-1){continue}
		
		if(lstBigBall2[col][1] == 0){
			above = aboveIt(columns2,col,blue);
			
			if(above == null){continue}// no blue in the col
			
			allBlue.push(parseInt(col));
		}
	}
	return allBlue
}

function newVirtualColumn(VColumn,columns2,lstBigBall2){
	console.log("\n      virtualcolumn");
	
	for(i in columns2){
		let color = topBall(columns2,i);
		let bigBall = lstBigBall2[i][0];
		let sizeCol = columns2[i].length ;
		if (sizeCol ==0){
			color = 0;
			bigBall = 0;
		}
		
		VColumn.push([color,bigBall,sizeCol]);	
		console.log("      the column",i,"color",color,"bigball",bigBall,"sizecol",sizeCol);
		
	}
}

function virtualUpdate(columns2,VColumn,from,to){
	console.log("\n      virtual update");
	let bllFrom = VColumn[from][0];
	let bBFrom = VColumn[from][1];
	let sizeFrom = VColumn[from][2];
	
	let bllTo = VColumn[to][0];
	let bBTo = VColumn[to][1];
	let sizeTo = VColumn[to][2];
	
	bBTo += bBFrom;
	sizeTo +=bBFrom;
	bllTo = bllFrom
	
	sizeFrom -= bBFrom;
	bllFrom = columns2[from][sizeFrom];
	bBFrom =1;
	
	for(let i=sizeFrom-1;i>=0;i--){
		if(columns2[from][i] == bllFrom){
			bBFrom++
		}else{
			i= -1
		}
	}
	VColumn[from] = [bllFrom,bBFrom,sizeFrom];
	VColumn[to] = [bllTo,bBTo,sizeTo];
	
	console.log("      from",from,"to",to);
	console.log("      Vcolumn",VColumn);
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

function ifNewColor(col,columns2,lstTwin,lstBigBall){
	//console.log("\n      if new color");
	let firstCol = lstTwin[1];
	let firstBall = topBall(columns2,col);
	let firstBigBall = lstBigBall[firstCol][0];
	//console.log("      firs:col",firstCol,"ball",firstBall,"bigball",firstBigBall);
	//console.log("      lst Twin",lstTwin);
	
	let thisBigBall = lstBigBall[col][0];
	//console.log("      thisBigBall",thisBigBall);
}

function getTwin(state,lstTwin,alreadyTry,mode,VColumn){
	//console.log("\n  //get twin",lstTwin);
	let [columns2,lstBigBall2,xxx] = state;
	
	if(lstTwin.length > columns2.length){return}//loop killer
	
	let output =[];
	let lstOfCol =[];	//all col include in calcul (anti double)
	let lastCol = lstTwin[lstTwin.length -1];//last col of the list
	
	//console.log("  the col",columns2[lastCol]);
	let bllBelow = secondBall(state,lastCol,lstTwin);//second ball of the botle
	//console.log("  bllBelow",bllBelow);
	
	if(bllBelow == null){return [lstTwin,[]]}//it end with a new empty botle
	let [sdBall,sdBigBall] = bllBelow;
	
	
	let goToColor = ifColor(state,lstTwin, lastCol, sdBall);
	if(goToColor != undefined){
		//console.log("  go to color",goToColor);
		[lstTwin, sdBall] = goToColor;
		
		//console.log("  sdBall",sdBall);
		if(sdBall == "finish"){
			let firstBall = lstTwin[1];
			let goToEmpty = [firstBall,lstTwin[0]];	//clean the first move
			
			lstTwin = lstTwin.slice(2);		//remove old begin
			lstTwin = [goToEmpty].concat(lstTwin);	//insert new at begin
			
			return [lstTwin,[]]
		}
	}
	ifNewColor(lastCol,columns2,lstTwin,lstBigBall);
	
	let allBlue = AllBlue(state,sdBall,lastCol);
		
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
		
		if(alreadyThere != -1 && (mode == "standard" || alreadyThere !=1)){
		//if we loop on the list of move short cut
			let firstMove = [,thisCoppy[0]];
			firstMove[0] = thisTry;
			thisCoppy = thisCoppy.slice(alreadyThere+1);//cut the col befor the loop
			
			thisCoppy = [firstMove].concat(thisCoppy);
			output.push(thisCoppy);
			
		}else{//do it recursively
			thisCoppy.push(thisTry);
			virtualUpdate(columns2,VColumn,lastCol,thisTry);
			
			let nextStep = getTwin(state,thisCoppy,alreadyTry,mode,VColumn);//do it 
			
			if(nextStep[0].length != 0){		//if the next recursive loop work
				output = output.concat(nextStep[0]);	//return it for the previous
			} 
			lstOfCol = lstOfCol.concat(nextStep[1]);//add the col from the recursive
		}
	}return [output,lstOfCol]
}//get twin

var CrissCross = function(state){
	
	let [columns2,lstBigBall2,lstOfMove2] = state;
	let VColumn = [];
	newVirtualColumn(VColumn,columns2,lstBigBall2);
	
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
	
		a = getTwin(state,[target,way],alreadyTry,"standard",VColumn);
		if(a[0].length == 0){continue}
		[thisWay,newTry] = a;
		//console.log(" i want it that way",thisWay);
		//console.log("all column include in calcul",newTry);
	
		lstOfCrissCross = lstOfCrissCross.concat(thisWay);
		//console.log("\n  i ave crisscross",lstOfCrissCross);
		
		alreadyTry = alreadyTry.concat(newTry);
		//console.log("lst global",alreadyTry);
	}
	return lstOfCrissCross
}

module.exports = CrissCross;
