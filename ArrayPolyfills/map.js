
// problem link - https://bigfrontend.dev/problem/implement-Array-prototype-map

/* Thought Process - 
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
  let boundedFun = callback, arrLen = this.length, resultArr = new Array(arrLen);
  boundedFun = callback.bind(thisArg);
  for(let id=0;arrLen>id;id++){
    if(id in this) resultArr[id] = boundedFun(this[id],id,this);
  }
  return resultArr;
}

// Testing Functionality
const arr = [1,2,3];
const arr2 = [1,2,3];

const callback = (item, i, array) => {
  array.push(55);
  return item;
}

console.log(arr.map(callback));
console.log(arr2.myMap(callback));

console.log(arr, arr2);