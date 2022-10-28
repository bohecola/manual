# Class类与对象
## 前置

```javascript
function Person(name = 'zhangsan', age = 18){
	this.name = name;
  this.age = age;
}

Person.prototype.say = function (){
	console.log(`my name is ${this.name}, my age is ${this.age}`);
}

Object.assign(Person.prototype, {
	eat: function () {
  	console.log(`I can eat`);
  },
  drink: function () {
		console.log(`I can drink`)
	}
}) //可枚举

console.log(Object.keys(Person.prototype)); // ['say', 'eat', 'drink']

var person = new Person('lisi', 19);

console.log(new Person());
```



```javascript
// 获取原型的方法
// 1. 通过实例化对象
console.log(Object.getPrototypeOf(person));
console.log(Object.getPrototypeOf(person).constructor === Person); // true

// 2. 通过构造函数
console.log(Person.prototype === Object.getPrototypeOf(person)); // true
```



## Class

```javascript
// class是保留字在ES5，故意写错，声名一个为class的变量
var ckass = 123;
```

### class基础

```javascript
// class (类) 本质是语法糖
class Person{
	constructor(name = 'zhangsan', age = 18){
  	// 实例化的属性配置：私有属性
    this.name = name;
    this.age = age;
  }
  // 相当于Person.prototype.say, 这是ES6对应的写法
  // 共有属性
  say(){
  	console.log(`my name is ${this.name}, my age is ${this.age}`);
  }
  
  eat() {
  	console.log(`I can eat`);
  }

  drink() {
		console.log(`I can drink`)
	}
}

// 类内部的方法是不可枚举的
console.log(Object.keys(Person.prototype)); // []

console.log(new Person());

console.log(typeof Person); // function
```



### class默认声名constructor

```javascript
class Person {
	// 没有指定constructor, 这里默认会生成一个constructor() {}
}

console.log(new Person()); // 没有指定constructor不会报错，因为会默认添加一个
```

### class表达式写法

```javascript
// 表达式方式
let person = new class {
  constructor(name = 'zhangsan', age = 18) {
  	this.name = name;
    this.age = age;
  }
	say(){
  	console.log(1);
  }
}('lisi', 19)

console.log(person);	// {name: 'lisi', age: 19}
// person.say();			// 1
```

### classTDZ

```javascript
// 函数声名提升
console.log(new Person());
// 不存在暂时性死区 TDZ
function Person() {
	
}

//
console.log(new Person()); // Uncaught ReferenceError: Person is not defined

class Person {
  
}
```

### class私有属性和公有方法

```javascript
// class 可以定义公有的方法，但不可以定义共有的属性
class Person {
	// a = 1;  // ES7中新出来的一种写法，私有属性写法
  constructor() {
  	this.a = 1;
  }
  
  say(){
  
  }
}

console.log(new Person());
```

### class通过Symbol实现公有方法私有化

```javascript
const eat = Symbol();

class Person{
	constructor(name, age) {
  	this.age = age;
    this.name = name;
  }
 	say(){
  	console.log(1);
  }
  [eat](){
  	console.log(2);
  }
}

console.log(new Person().say());
console.log(new Person().eat());  // Uncaught TypeError: (intermediate value).eat is not a function
console.log(new Person()[eat]()); // 2 
```

### class通过在外定义方法实现公有方法私有化

```javascript
class Person {
	constructor(name, age) {
  	this.age = age;
    this.name = name;
  }
 	say(baz){
  	children.call(this, baz);
  }
}

function children(baz) {
	return this.bar = baz;
}

console.log(new Person().say());
console.log(new Person().eat());
```

### static

```javascript
class Person {
  // static 只能在类当中生效
  // 静态方法，通过类来调用
	// static a () {
  //   console.log(1);
  // }
  
  // 静态属性
  static a = 10;
}

console.log(Person.a);
```

### get set 取值函数和存值函数

```javascript
class Person {
  // 'use strict';   // 类中默认严格模式
  // 涉及到this指向, 在constructor中指定, this指向严格模式是undefined
	get a() {
  	console.log(1);
  }
  
  set b(value) {
  	console.log(2);
  }
}

let person = new Person();
person.a;
person.b = 4; 
```

### 小结

- 私有属性
- 公有方法
- static 静态属性

------

1. class 与 let TDZ
2. class共有属性的方法不可枚举，以前的方法可枚举
3. 默认严格模式
4. 类中会一个默认的constructor，没有设置，不会报错
5. 必须通过new方式来执行

## extends

### extends基础

```javascript
class Parent{
	constructor(name = 'zhangsan'){
  	this.name = name;
  }
}

// 派生类
class Child extends Parent{

}

console.log(new Child());
```



### super()

```javascript
class Parent{
	constructor(name = 'zhangsan'){
  	this.name = name;
  }
  
  say(){
  	console.log(1);
  }
  
  // 静态属性不能继承
  static a() {
  	console.log(2);
  }
}

// 派生类
class Child extends Parent{
	constructor(name = 'lisi', age = 19) {
  	super(name); // 在constructor里的，以函数的方式来执行
    this.type = 'child'; // super()在前面, 才能使用this
    this.age = age;
  }
}

console.log(new Child());
```



### super()非正常用法

```javascript
let proto = {
	y: 20,
  z: 20
}

let obj = {
	x: 10,
  foo(){
  	console.log(super.y); // super可以指向原型对象
  }
}

Object.setPrototypeOf(obj, proto);
obj.foo(); // 20
// super 恶龙
// super 作为对象的时候：
// 1. 在对象当中，指代对象的原型
// 2. 在静态方法中，指向自己的父类
```