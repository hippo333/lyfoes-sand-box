var startTime = new Date().getTime();
var main = require('./main');


let lstError = [];
let levelToTest2 = [2.01, 2.02, 2.03, 2.04, 2.05, 2.06, 2.07, 2.08, 2.09, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15, 2.16, 2.17, 2.18, 2.19, 2.20, 2.21, 2.22, 2.23, 2.24, 2.25, 2.26, 2.27, 2.28, 2.29, 2.30, 2.31, 2.32, 2.33, 2.34, 2.35, 2.36, 2.37, 2.38, 2.39, 2.40, 2.41, 2.42, 2.43, 2.44, 2.45, 2.46, 2.47, 2.48, 2.49, 2.50];
let levelToTest3 = [3.01, 3.02, 3.03, 3.04, 3.05, 3.06, 3.07, 3.08, 3.09, 3.10, 3.11, 3.12, 3.13, 3.14, 3.15, 3.16, 3.17, 3.18, 3.19, 3.20];

//2.1 -2.12, 2.14 -2.17,; 

for(level of levelToTest3){
	try{
		main(level);
	}
	catch(output){
		console.log("level",level);
		//throw Error(output); //debug
		lstError.push(`${level}, ${output.message}`);
	}
}

console.log(lstError);

var end = new Date().getTime();	//timer
var time = end - startTime;
console.log("test Over",time/1000,"s");

