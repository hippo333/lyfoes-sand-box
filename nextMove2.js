var Column = require('./column');
var columns = require('./level');
var [bigBall,lstBigBall] = require('./bigBall');
var move = require('./move');
var raining = require('./raining');
var emptyBotle = require('./emptyBotle');
let lstColor = [ "DEPTH" ,"WHITE" ,"blue" ,"lightblue" ,"lightgreen" ,"yellow" ,"brightpink" ,"red" ,"green","grey" ,"purple" ,"pink" ,"cyan" ,"orange" ];



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

	//rain if fail
	if (out.length == 0){
		let theRain = raining();
		
		if(theRain == "finito"){
			//console.log("raining null");
			return "finito";
		}else {
			//console.log("the rain",theRain);
			return [["raining :",lstColor[theRain]]];
		}
	}
	//console.log("out",out);
	return out;
}
module.exports = internMove;
