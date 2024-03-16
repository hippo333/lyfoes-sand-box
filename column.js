'use strict';

const MAXSIZE = 4;

var Column = function(contents) {
  var obj = [];

  for (var i in contents) {
    obj.push(contents[i]);
  }
  
  return obj;
}

module.exports = Column;
