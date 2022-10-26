
// problem link - https://bigfrontend.dev/problem/implement-Array-prototype-map

/* Approach & its Thought Process - 

  * Iterate each item of array. For each item invoke callback function with its required arguments and store its return value to resultArr. 

  array (on which map function invoked)
  resultArr (array which has to be returned)
  
  1. Callback argument has to be of "function" type
  2. Callback should be invoked only if the index is present in array.
  3. Handle the case if elements in array is pushed while invoking the callback function.
*/

// Code
Array.prototype.myMap = function(callback, thisArg) {
  // your code here
  if(typeof callback !== "function"){
    throw Error("callback is expected to function type");
  }
  var boundedFun = callback, arrLen = this.length, resultArr = new Array(arrLen);
  boundedFun = callback.bind(thisArg);
  for(var id=0;arrLen>id;id++){
    if(id in this) resultArr[id] = boundedFun(this[id],id,this);
  }
  return resultArr;
}

// Testing Functionality
var arr = [1,2,3];
var arr2 = [1,2,3];

var callback = function(item, i, array){
  array.push(55);
  return item;
}

console.log(arr.map(callback));
console.log(arr2.myMap(callback));

console.log(arr, arr2);