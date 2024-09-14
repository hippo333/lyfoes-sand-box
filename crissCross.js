var Column = require('./column');
var [bigBall,lstBigBall] = require('./bigBall');
let VColumn = [];


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

function secondBall2(col){
	return [VColumn[col][0],VColumn[col][1]]
}

function aboveIt(columns2,col,blue){
	
	let theCol = columns2[col].content;
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
	let theBall = theCol.top();
	
	if(theBall == undefined){
		console.log("      can't find the ball above",col,theCol);
	}
	let theColor = getColor(lstBigBall2,theBall);
	if(theColor != null){
		//console.log("      i get a color for",theBall,theColor,columns2[theColor].content);
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

function AllBlue2(colB,blue){
	let allBlue = [];
	for(let i in VColumn){
		if(VColumn[i][0]==blue && i!=colB){
			allBlue.push(i);
			//console.log("    blue",i);
		}
	}
	
	return allBlue;
}

function newVirtualColumn(VColumn,columns2,lstBigBall2){
	//console.log("\n______virtualcolumn");
	VColumn = [];
	
	for(i in columns2){
		let color = columns2[i].top();
		let bigBall = lstBigBall2[i][0];
		let sizeCol = columns2[i].content.length ;
		if (sizeCol ==0){
			color = 0;
			bigBall = 0;
		}
		
		VColumn.push([color,bigBall,sizeCol]);
		
	}
	//console.log("      color, bigBall, sizeCol");
	//console.log("      Vcolumns",VColumn);
	return VColumn
}

function virtualUpdate(columns2,VColumn,from,to){
	//console.log(`\n      virtual update from:${from} to:${to}`);
	let bllFrom = VColumn[from][0];
	let bBFrom = VColumn[from][1];
	let sizeFrom = VColumn[from][2];
	
	let bllTo = VColumn[to][0];
	let bBTo = VColumn[to][1];
	let sizeTo = VColumn[to][2];
	
	if(bllFrom != bllTo && bBTo != 0){
		console.log("      the ball are different");
	}
	
	bBTo += bBFrom;
	sizeTo +=bBFrom;
	bllTo = bllFrom
	
	sizeFrom -= bBFrom;
	if(sizeFrom > 0){
		bllFrom = columns2[from].content[sizeFrom-1];
		bBFrom =1;
	}else{
		bllFrom =0;
		bBFrom = 0;
	}
	
	for(let i=sizeFrom-2;i>=0;i--){
		if(columns2[from].content[i] == bllFrom){
			bBFrom++
		}else{
			break;
		}
	}
	VColumn[from] = [bllFrom,bBFrom,sizeFrom];
	VColumn[to] = [bllTo,bBTo,sizeTo];
	
	//console.log("      from",from,"to",to);
	//console.log("      Vcolumn",VColumn);
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

	let theCol = columns2[col].content;
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
	let firstBall = columns2[col].top();
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
	
	//console.log("  the col",columns2[lastCol].content);
	//let bllBelow = secondBall(state,lastCol,lstTwin);//second ball of the botle
	let bllBelow = secondBall2(lastCol,VColumn);//second ball of the botle
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
			
			return [[lstTwin],[]]
		}
	}
	ifNewColor(lastCol,columns2,lstTwin,lstBigBall);
	
	let allBlue = AllBlue2(lastCol,sdBall);
		
	let thisTry;		//curent element of the loop
	let alreadyThere;	//short cut of intern loop
	let thisCoppy = []	//coppy of lstTwin 
	
	for(way in allBlue){
		thisTry = allBlue[way];
		thisCoppy = [...lstTwin];//clone
		//console.log("  all blue element",way,thisTry);
		
		//if(columns2[thisTry].top() != sdBall){continue}//the ball is'nt on top
		if(alreadyTry.indexOf(thisTry) != -1){continue}	//already try this column
		
		if(VColumn[thisTry][1] + VColumn[lastCol][2] > 4){continue}//big ball
		
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
			virtualUpdate(columns2,VColumn,thisTry,lastCol);
			
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
	
	
	let thisWay = [];			//local try
	let lstOfCrissCross = [];	//global try
	let a = [];					//intermediar buffer
	let emptyBtl = emptyBotle(lstBigBall2);	//nececary for the first move
	let target ;					//same with color


	let alreadyTry =[];	//global anti double
	let newTry =[];		//local  anti double
	for( way in columns2){
		if(columns2[way].content.length == 0){continue}		//empty botle
		if(alreadyTry.indexOf(way) != -1){continue}	//already try this column
		if(lstBigBall2[way][1] != 0){continue}		//its a color
		target = Target(state,way);
	
	
		VColumn = newVirtualColumn(VColumn,columns2,lstBigBall2);
		virtualUpdate(columns2,VColumn,way,target);
	
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
