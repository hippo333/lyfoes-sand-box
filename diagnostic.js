
var Column = require('./column');

let columns0 = [
	new Column([ 10, 12, 5, 1 ]),
	new Column([ 12, 5, 8, 2 ],),
	new Column([ 2, 6, 8, 7 ]),
	new Column([ 7, 5, 6, 8 ]),
	new Column([ 12, 7, 13, 6 ]),
	new Column([ 10, 1, 1, 13 ]),
	new Column([ 2, 10, 13, 3 ]),
	new Column([ 13, 3, 12, 6 ]),
	new Column([ 3, 8, 10, 3 ]),
	new Column([ 7, 2, 5, 1 ]),
	new Column([]),
	new Column([]),
]

let branch0 = [
	[[
		[ 12, 2, 3 ], [ 5, 1, 2 ],
		[ 7, 1, 4 ],  [ 5, 3, 4 ],
		[ 13, 2, 4 ], [ 10, 2, 2 ],
		[ 13, 1, 3 ], [ 3, 3, 4 ],
		[ 8, 3, 4 ],  [ 2, 2, 3 ],
		[ 1, 4, 4 ],  [ 6, 3, 3 ]
	  ],
	  [
		[ 0, 10 ], [ 9, 10 ],
		[ 9, 0 ],  [ 1, 9 ],
		[ 3, 1 ],  [ 4, 3 ],
		[ 5, 4 ],  [ 5, 10 ],
		[ 3, 11 ], [ 0, 3 ],
		[ 7, 11 ], [ 7, 0 ],
		[ 6, 7 ],  [ 8, 7 ],
		[ 8, 5 ],  [ 1, 8 ]
	  ]
	]
];

function isColor(col2){
	if(col2[2]==0){return false}	//empty botle
	
	if(col2[1] == 4 ){return false}	//finished color
	
	if(col2[1] == col2[2]){return true}	//color
	
	else{return false}
}


function smolestColor(branch,columns2){
	let [Vcolumn2,lstOfMove2] = branch[0];
	
	let smolestColor = [-1,4];	//[col,bigBall]
	
	for(let col=0;col <Vcolumn2.length;col++){
		let thisCol = Vcolumn2[col];
				
		if(!isColor(thisCol)){continue}
		
		if(thisCol[2] < smolestColor[1]){
			smolestColor = [col,thisCol[2]];
		}
	}
	console.log("smolestColor",smolestColor);
}

smolestColor(branch0,columns0);





