# JS变量提升

## 变量提升（Hoisting）

变量可以在声明之前进行初始化和使用。但是如果没有初始化，就不能使用它们。

> 函数和变量相比，会被优先提升。这意味着函数会被提升到更靠前的位置。

### case1

```js
function test(){
	return a;
  a = 1;
  function a(){}
  var a = 2;
}
console.log(test()); // function a(){}
```

```js
function test(){
	a = 1;
  function a(){}
  var a = 2;
  return a;
}
console.log(test()); // 2
```

函数提升优先级高于变量提升，且不会被同名变量声明时覆盖，但是会被同名变量赋值后覆盖。

### case2

闭包可以总结为在函数执行的过程中产生了新函数的定义。

```js
function test(){
	var arr = [];
  for(var i = 0; i < 10; i++){
  	arr[i] = function(){
    	document.write(i + ' ');
    }
  }
  return arr;
}

var myArr = test();
console.log(myArr);
for(var j = 0; j < 10; j++) {
	myArr[j](); // 页面中10个10 
}
// 此时function中取的i是test函数作用域中的i，在for循环完毕后i为10，所以函数执行时结果都是10
```

```js
// 使用let改进
function test(){
	var arr = [];
  // 将var改为let
  for(let i = 0; i < 10; i++){
  	arr[i] = function(){
    	document.write(i + ' ');
    }
  }
  return arr;
}

var myArr = test();
console.log(myArr);
for(var j = 0; j < 10; j++) {
	myArr[j](); // 页面中0~9
}
// let不会变量提升，let会产生TDZ（暂时性死区），即不能在声明之前进行访问
// 每次for循环let i都属于一个独立的for循环作用域
// 循环完毕后function取的是独立作用域中的i，而不是test函数作用域中的i
```

```js
// 立即执行函数
function test(){
  for(var i = 0; i < 10; i++){
  	(function(){
    	document.write(i + ' ');
    })()
  }
}

test(); // 0 ~ 9
```

## 参考

[mdn-变量提升](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)

[JS中的预编译如何进行？看完这篇就够了](https://www.isolves.com/it/cxkf/yy/js/2021-04-25/38898.html)

[知乎-JavaScript有预编译吗？](https://www.zhihu.com/question/29105940/answer/43277384)

[JavaScript秘密花园](https://bonsaiden.github.io/JavaScript-Garden/zh/#function.scopes)