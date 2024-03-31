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
		
	columns.filter(function (cll, index) {
		//condition for go to the list
   		if (cll.indexOf(a) != -1 
   		//exept one who as color to
   		&& cll != colorTgt){
   		    lst.push(index);
   		    return true;
  		}
	});
	console.log("lst",a,lst)
	return lst
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
	for(way in lstColBlue){
		theCol = lstColBlue[way];
		if (topBall(theCol) == a){
			move(theCol,target);
		}
	}
	console.log("// raining :",a);
}
raining(5);
console.log(columns);
raining(2);
console.log(columns);
raining(5);
console.log(columns);
raining(7);
console.log(columns);
raining(2);
console.log(columns);


