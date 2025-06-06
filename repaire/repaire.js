var columns = require('../level');
var [newVcolumn,Vupdate] = require('../tools/Vcolumn');
var abstract = require('../tools/abstract');

var brockenBranch = [
  [
    [ 8, 2, 4 ],  [ 13, 1, 4 ],
    [ 4, 3, 3 ],  [ 6, 2, 3 ],
    [ 3, 3, 4 ],  [ 5, 1, 3 ],
    [ 11, 3, 3 ], [ 1, 3, 4 ],
    [ 7, 1, 2 ],  [ 2, 2, 4 ],
    [ 13, 2, 4 ], [ 6, 2, 4 ],
    [ 9, 2, 4 ],  [ 10, 3, 3 ],
    [ 12, 3, 3 ]
  ],
  [
    [ 9, 13 ], [ 2, 9 ],
    [ 7, 13 ], [ 11, 7 ],
    [ 4, 13 ], [ 12, 11 ],
    [ 2, 12 ], [ 8, 2 ],
    [ 2, 14 ], [ 5, 2 ],
    [ 10, 2 ], [ 6, 10 ],
    [ 6, 4 ],  [ 0, 6 ],
    [ 3, 0 ]
  ]
]

let [Vcolumn,lstOfMove] = brockenBranch;

function lstColor(Vcolumn2){
	let output =[];
	
	for(col of Vcolumn2){
		
		if(col[2]==0){continue}
		if(col[1]==col[2]){
			output.push(Vcolumn2.indexOf(col));
		}	
			
	}
	return output
}


console.log(Vcolumn);
let listColor = lstColor(Vcolumn);
console.log("the col",listColor,"are monochrome\n");


function theTopBall(thisCol){
		
	if(thisCol.length ==0){
		console.log("the column is empty");
		throw Error
	}	
	let ball = thisCol[0];
	//console.log("the top ball of",thisCol,"is",ball);
	return ball;	
}

function oversizeColor(listColor2){
	let output = [];
	
	for(color of listColor2){
		let theBall = theTopBall(Vcolumn[color]);
			
		for(col of columns){
			if(col.content.length ==0){continue}	//empty column
			if(columns.indexOf(col) == color){continue}
			
			
			let target = col.content.indexOf(theBall);
			
			if(target == -1){continue}//the ball is not in this column
			if(target ==3){continue}
			if(col.content[target+1] == theBall){	//bigball of target
				target ++;
			}
			//console.log("target",target,"in col",col.content,"\n");
			
			
			if(target+ Vcolumn[color][2] >= 4){	//we can't move color to col
				let idCol = columns.indexOf(col);
				output.push([color,idCol]);
			}
		}
		
		
		
		
		
		
	}
	abstract(columns)
	console.log("oversize color",output);
}

oversizeColor(listColor);







