'use strict';

const MAXSIZE = 4;

var Column = function(contents) {
  var obj = {
  		content : [],
  		bigBall : 0,
  		color : 0,
  		nbMaxBall : 4,
  		top0 : -1,
  		length0 : 0,
  		isFull0 : false,
  		isEmpty0 : false,
  		isFinish0 : false,
  		isMonochrome0 : false,
  	}

  
  obj.top = function (){
  	return this.content[this.content.length -1];
  }
  
  obj.secondBall = function (){
  	if(this.length0 == this.bigBall){return -1}
  	return this.content[this.length0-this.bigBall -1];
  }
  
  obj.secondBigBall = function(){
  	let secondBll = this.secondBall();
  	if(secondBll == -1){return 0}
  	let sdBigBall =0;
  	
  	let startLevel = this.content.length-1 -this.bigBall;
  	for(let bll= startLevel; bll>=0;bll--){
  		if(this.content[bll] != secondBll){return sdBigBall}
  		sdBigBall++
  	}
  	return sdBigBall
  }
  
  obj.isFull = function(){
  	if(this.content.length == 0){
  		return false
  	}else{
  		return this.content.length == this.nbMaxBall;
  }	}
  
  obj.isEmpty = function(){
  	if(this.content.length ==0){
 		this.color =0; 
  		return true
  	}return false
  }
  
  obj.isFinish = function(){
  	if(!this.isFull()){
  		return false
  	}if(this.isMonochrome()){
  		return true
  	}
  	return false  	
  }
  
  obj.isMonochrome = function(){
  	if(this.isEmpty()){return false}
  	
  	let withoutDuplicate = [...new Set(this.content)];
  	if(	withoutDuplicate.length == 1){
  		return true
  	}return false
  }
  
  obj.newBigBall = function(){
  	if(this.isEmpty()){this.bigBall =0; return};
  	
  	this.bigBall =1;
  	let lastball = this.content[this.content.length-1];
  	
  	
  	for(let i=this.content.length-2;i>=0;i--){
  		if(this.content[i] == lastball){
  			this.bigBall++;
  			
  		}else{
  			this.color = 0;
  			return
  		}
  	}
  	if(this.bigBall >1){this.color = lastball}
  	//if column contain one ball
  }
  
  obj.update = function(){
	  this.top0 = this.top();
	  this.length0 = this.content.length;
	  this.newBigBall();
	  this.isFull0 = this.isFull();
	  this.isEmpty0 = this.isEmpty();
	  this.isFinish0 = this.isFinish();
	  this.isMonochrome0 = this.isMonochrome();
  
  }
  
  obj.updateFrom = function(){
  	this.top0 = this.top();
  	this.length0 -= this.bigBall;	
  	this.newBigBall();
  	if(this.length0 ==0){this.isEmpty0 = true}
  	if(this.bigBall == this.length0){this.isMonochrome0 = true}
  	this.isFull0 = false;
  	
  }
  
  obj.updateTo = function(bll2,bigBll2){
  	this.top0 = bll2;
  	this.length0 += bigBll2;	
  	this.bigBall += bigBll2;
  	if(this.length0 == this.bigBall ){this.isMonochrome0 =true}
  	this.isEmpty0 = false;
  	if(this.bigBall == 4){this.isFinis0 = true}
  	
  }
   
  for (var i in contents) {//constructor
    obj.content.push(contents[i]);
  }
  
  obj.update();
  
 // obj.newBigBall();	//make it for the begining
  return obj;
}

module.exports = Column;
