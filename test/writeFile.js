
var fs = require('fs').promises;


var startTime = new Date().getTime();

var end = new Date().getTime();	//timer
var time = end - startTime;
var data = {length : lstOfMove.length, time:time}
fs.appendFile("history of blowUp.txt",JSON.stringify(data, null, 2),'utf8');
