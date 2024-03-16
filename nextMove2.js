var Column = require('./column');
var columns = require('./level');
var [bigBall,lstBigBall] = require('./bigBall');
var move = require('./move');
var raining = require('./raining');
var emptyBotle = require('./emptyBotle');


function internMove(){
	var emptyBtl = emptyBotle;
	let out =[];

	//inevitable 0
	let targetColor = columns.filter(
		tgt => lstBigBall[columns.indexOf(tgt)][1] != 0
		&& lstBigBall[columns.indexOf(tgt)][0] != 4
	);
	for(tgt in targetColor){
		let target = targetColor[tgt];
		let to = columns.indexOf(target);
		let theBall = target[target.length -1];
		
		
		let from = columns.findIndex(
			fr => fr.length > 0
			&& fr[fr.length -1] ==theBall
			&& fr != target
		);
		//console.log("from",from);
		if (from != -1){
			return [[from,to]];
			
		//inevitable 1
		}else if(emptyBtl != null){
			from = columns.findIndex(
				fr => fr.length > 0
				&& fr.length == lstBigBall[columns.indexOf(fr)][0]+1
				&& fr[fr.length -lstBigBall[columns.indexOf(fr)][0]] ==theBall
				&& fr != target
			); 
			if(from != -1){
			console.log("inevitable1");
			return [[from,emptyBtl]];
			}
		}
	}
	
	console.log("intern Move");
	//intern Move
	let targets = columns.filter(
		tgt => lstBigBall[columns.indexOf(tgt)][1] == 0
		&& lstBigBall[columns.indexOf(tgt)][0] != 4
	);
	//console.log("targets",targets);
	for(tgt in targets){
		let target = targets[tgt];
		let to = columns.indexOf(target);
		let theBall = target[target.length -1];
		
		let fromLst = columns.filter(
			fr => fr.length > 0
			&& fr[fr.length -1] ==theBall
			&& fr != target
			&& lstBigBall[columns.indexOf(fr)][1] == 0
			&& target.length +lstBigBall[columns.indexOf(fr)][0] <=4
		);
		
		if (fromLst.length > 0){
			for(fr in fromLst){
				from0 = fromLst[fr];
				from = columns.indexOf(from0);
				
				//kill doublon
				if(from0.length == lstBigBall[from] && target.length == lstBigBall[to]){
				if(from0.length == target.length && from < to){
					continue;
				}else if(from0.length < target.length){
				
				}
				
				
				}	
				
				
				out.push([from,to])
			}
		}
	
	
	
	
	
	}

/*
	//list all place we can take ball
	let targets = columns.filter(
		tgt => tgt.length <4
	);
	
	let btls =[];
	
	for (tgt in targets){
		let theBtl = targets[tgt];
		let thebll = theBtl[theBtl.length-1];
		let to = columns.indexOf(theBtl);
		
		
		btls = columns.filter(
			bll=> bll.length > 0
			&& bll[bll.length -1]==thebll
			&& lstBigBall[columns.indexOf(bll)][1] == 0
			&& bll != theBtl
			&& theBtl.length +lstBigBall[columns.indexOf(bll)][0] <=4
		);
		
		// 1 grade
		//x000
		//xxx
		//
		if(emptyBtl != null && lstBigBall[to][1]!=0){
			btls2 = columns.filter(
				bll=> bll.length > 0
				&& bll[bll.length -1-lstBigBall[columns.indexOf(bll)][0]]==thebll
				&& bll.length == lstBigBall[columns.indexOf(bll)][0] +1
			);
			if(btls2.length >0){
				//console.log("first grade ,",btls2,to);
			}
		}
		//
		
		if (btls == undefined){
			continue;
		}
		
		//for all btl with the same above ball
		
		for(bll in btls){
			let btl2 = btls[bll];
			let from = columns.indexOf(btl2);
			
			//inevitable
			if(lstBigBall[to][1] != 0){
				return [[from,to]]
			}
			
			//first grad
			//x000
			//xxx
			//
			
			
			//asymetrie
			if(columns[from].length ==1 && columns[to].length == lstBigBall[to][0]){
				continue;
			}else if (columns[from].length == columns[to].length && from > to){
				continue;
			}
			
			
			
			
			
			//over flow
			if(theBtl.length +lstBigBall[from][0] <=4){
				out.push([from,to]);
				
			}
		}
	}
	*/
	
	
	
	//rain if fail
	if (out.length == 0){
		let theRain = raining();
		
		if(theRain == "finito"){
			//console.log("raining null");
			return "finito";
		}else {
			//console.log("the rain",theRain);
			return [["raining :",theRain]];
		}
	}
	//console.log("out",out);
	return out;
}
module.exports = internMove;
