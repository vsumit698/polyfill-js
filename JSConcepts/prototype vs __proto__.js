// __proto__ vs prototype

var obj = {a: 1,b: 2};
var obj1 = {c: 10, d: 100};
Object.setPrototypeOf(obj, obj1)
console.log(obj, obj.__proto__);

// function prototype
function fun(){
  console.log("123");
}
fun.prototype.a = 5
console.log(fun.prototype, fun.__proto__.prototype);

// es6 fashion
class A {
  a(){}
  A1(){}
}

class B extends A{
  b(){}
  B1(){}
}
console.log(new B());
/*
  Learings
  1. class B.__proto__  ->  class A, class A.__proto__  ->  Function.prototype
  2. class B.prototype.__proto__  ->  class A.prototype, class A.prototype.__proto__  ->  Object.prototype

  Conclusion
  1. prototype is object in function which is referenced in newly created object at __proto__ key.
  2. Inside any object, __proto__ is key which points to another object prototype from which its created. Hence its purpose is to fulfill inheritance.
*/
