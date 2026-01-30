
var main = require('./main');


let lstError = [];
let levelToTest = [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.101, 2.11, 2.12, 2.13, 2.14, 2.15, 2.16, 2.17, 2.18, 2.19, 2.201, 2.21, 2.22, 2.23, 2.24, 2.25, 2.26, 2.27, 2.28, 2.29, 2.301];

//2.1 -2.12, 2.14 -2.17,; 

for(level of levelToTest){
	try{
		main(level);
	}
	catch(output){
		lstError.push(`${level}, ${output.message}`);
	}
}

console.log(lstError);

