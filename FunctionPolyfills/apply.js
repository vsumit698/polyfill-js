/* Problem Statement -

  1. Implemented apply polyfill using call method 
*/

//Code
Function.prototype.myApply = function(thisObj,...restParams){
  this.call(thisObj,...restParams);
}

/* Problem Statement -

  1. Implemented apply polyfill without using call method 
*/

//Code
Function.prototype.myApply = function(thisArg, argsArr) {
  thisArg = thisArg===null || thisArg===undefined ? window : thisArg;
  thisArg = Object(thisArg);
  let symKey = Symbol();
  thisArg[symKey] = this;
  let result = thisArg[symKey](...argsArr);
  delete thisArg[symKey];
  return result;
}

// testing functionality
let obj = {name:"sumit"};

function fun(a,b,c){
  console.log(this===obj,a,b,c);
}

fun.myApply(obj,[1,2,3]);