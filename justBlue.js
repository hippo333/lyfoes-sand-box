var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');

console.log(columns);
console.log(lstBigBall);


//show all col who contain a
function locateBlue(a){
	let lst =[];
	let colorTgt = lstBigBall.findIndex(
		tgt => tgt[1] == a
	);
	//get index of all column who contain a	
	columns.filter(function (cll, index) {
		//condition for go to the list
   		if (cll.indexOf(a) != -1 
   		//exept one who as color to
   		&& cll != columns[colorTgt]){
   		    lst.push(index);
   		    return true;
  		}
	});
	if(lst != -1){
		//console.log("lst",a,lst)
		return lst
	}
}

//get the ball above the column
function topBall(col){
	let theCll = columns[col]
	let theBll = theCll[theCll.length -1]
	return theBll
}

//get what column can recive the ball
function Target(a){
	//get the column whith this color at final
	let target = lstBigBall.findIndex(
			tgt=> tgt[1] == a
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
			tgt=> topBall(columns.indexOf(tgt)) ==a
			&& tgt.length == lstBigBall[columns.indexOf(tgt)][0]
		);
	}
	if(target== -1){
		return null
	}
	//console.log("target",target);
	//console.log("the color",lstBigBall[target][1])
	lstBigBall[target][1] = a;
	return target
}



//raining
function raining(a){
	let lstColBlue= locateBlue(a);
	let target = Target(a);
	
	if (target == null){
		console.log("i didn't get the target for ",a);
		return
	}
	
	let theCol;
	let itWork = false;
	for(way in lstColBlue){
		theCol = lstColBlue[way];
		if (topBall(theCol) == a){
			console.log("it work",theCol,target);
			move(theCol,target);
			itWork = true;
		}
	}
	if (!itWork){
		//do it for only the first column who contain the ball
		let thePbCol = lstColBlue[0]
		let b = topBall(thePbCol);
		let target2 = Target(b);
		
		//if it go to the same place
		if (target == target2){return}
		
		//if a is the second ball
		if(columns[thePbCol][columns[thePbCol].length -1 -lstBigBall[thePbCol][0]] == a){
			move(thePbCol,target2);
		}
	}
	
	
	
	
	console.log("// raining :",a);
}
raining(5);
console.log(columns);/*
raining(2);
console.log(columns);*/
raining(5);
console.log(columns);
raining(5);
console.log(columns);
raining(2);
console.log(columns);
raining(2);
console.log(columns);
raining(2);
console.log(columns);
raining(7);
console.log(columns);


