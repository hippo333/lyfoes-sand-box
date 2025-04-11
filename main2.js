var startTime = new Date().getTime();
var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var doTheMove = require('./doTheMove');
var coppy = require('./coppy');
var CrissCross = require('./crissCross');
var lstOfMove = [];
var abstract = require('./abstract');
var isFinish = require('./isFinish');


abstract(columns);

console.log(isFinish(columns))
