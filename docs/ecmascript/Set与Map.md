# Set与Map

## set

###  介绍

```javascript
var set = new Set(); // 成员是唯一的数组
const map = new Map();
const set = new Set();
const p = new Promise();

const p1 = new Proxy();
// 这4个没有办法通过，babel编译，使语法降级

// 可以使用polyfill，@babel/polyfill 转译
```



###  set原型上的方法

```javascript
console.log(Set.prototype);
```



###  new Set()实例化对象

```javascript
var set = new Set();

set.add(5);
set.add(7);
console.log(set);
```



```javascript
var set = new Set([5, 7]);

set.add(8);
console.log(set);
```



###  new Set()的参数是具备iterator接口的数据结构

```javascript
// [], 类数组
var set = new Set([undefined, undefined, null, null, 5, "5", true, 1, NaN, NaN, {}, {}]);
console.log(set); // {undefined, null, 5, "5", true, 1, NaN, {}, {}}
// set 集合里 NaN === NaN，所以会去重，两个空{}是不相等的，所以不会去重，两个空数组同理，不会去重
console.log(null === null);
```

## set属性

###  Set.prototype.size

Size属性将会返回Set对象中元素的个数。

## set方法

###  Set.prototype.add()

Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

返回值是该set对象，所以可以链式调用

```javascript
var set = new Set();
var x = {id: 1},
    y = {id: 2};

		set.add(x)
			 .add(y)
			 .add(x);
```

###  Set.prototype.delete()

delete() 方法可以从一个 Set 对象中删除指定的元素。

**语法**：mySet.delete(value);

**参数**：value，将要删除的元素

**返回值**：成功删除返回 true，否则返回 false。

###  Set.prototype.clear()

clear() 方法用来清空一个 Set 对象中的所有元素。

**语法**：mySet.clear();

**返回值**：undefined

###  Set.prototype.has()

has() 方法返回一个布尔值来指示对应的值value是否存在Set对象中。

**语法**：mySet.has(value);

**参数**：value，必需。用以测试该值是否存在于 Set 对象中。

**返回值**：Boolean，如果指定的值（value）存在于Set对象当中，返回true；否则返回 false。

###  set操作注意

```javascript
var obj = {a: 1, b: 2};
console.log(obj);
delete obj.a;
console.log(obj);
```



```javascript
var set = new Set();
var x = {id: 1},
    y = {id: 2};

		set.add(x)
			 .add(y);

console.log(set);
// set.clear(); // set.clear() 的操作是实时性的

set.delete(x);  // set.delete() 同理，也是实时性的
```



###  Set.prototype.values()

由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

**values()** 方法按照元素插入顺序返回一个具有 Set 对象每个元素值的全新 Iterator 对象。

**keys()** 方法是这个方法的别名（与 Map 对象相似）；他们的行为一致，都是返回Set 对象中的元素值。

```javascript
let set = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

// set.keys() 返回一个键名的迭代器
for(let i of set.keys()){
	console.log(i);
}

// set.values() 返回一个键值的迭代器
for(let i of  set.values()){
	console.log(i);
}
```



###  Set.prototype.entries()

entries() 方法返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，value 是集合对象中的每个元素，迭代器对象元素的顺序即集合对象中元素插入的顺序。由于集合对象不像 Map 对象那样拥有 key，然而，为了与 Map 对象的 API 形式保持一致，故使得每一个 entry 的 key 和 value 都拥有相同的值，因而最终返回一个 [value, value] 形式的数组。

```javascript
let set = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

// set.entries() 返回一个键值对的迭代器
for(let i of  set.entries()){
	console.log(i);
}
```





```javascript
let set = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

for(let i of set){
	console.log(i);
}

console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true
```

###  Set.prototype.forEach()

forEach 方法会根据集合中元素的插入顺序，依次执行提供的回调函数。

```javascript
let set = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

set.forEach((value, key, set) => console.log(value, key, set));
```



###  使用拓展运算符

```javascript
let set = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

console.log([...set]);	// 数组去重
```



###  借助数组map/from完成映射关系

```javascript
let set = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

let set1 = new Set([...set].map(value => value * 2));

let set1 = new Set(Array.from(set, value => value * 2));
```

###  面试题

```javascript
var arr = [1, 2, 3, 4];

var arr1 = arr.map(parseInt); // arr.map(parseInt)，相当于arr.map(parseInt(value, idx))
															// parseInt(2, 1) parseInt(3, 2) parseInt(4, 3) 转换为非数
console.log(arr1);	// [1, NaN, NaN, NaN]
var arr = [1, 2, 3, 4];

var arr1 = arr.map((value, idx) => console.log(value, idx));
```



###  交集，并集，差集

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
console.log(union);				// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
console.log(intersect);		// Set {2, 3}

//（a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
console.log(difference);	// Set {1}
```

## map

###  前戏

```javascript
var m = {};
var x = {id: 1},
    y = {id: 2};

m[x] = "foo";
m[y] = "bar"; 			// 因为对象转字符串是[object Object]，所以m[x]被m[y]覆盖
										// 不能够实现（键 - 值）的一一对应

console.log(m[x]);	// bar
console.log(m[y]);	// bar
console.log(m);			// {[object Object]: "bar"}
```



###  map上手

```javascript
// 具备iterator接口的数据结构
let m = new Map();

var x = {id: 1},
    y = {id: 2};

m.set(x, "foo");
m.set(y, "bar");

console.log(m.get(x));	// foo
console.log(m.get(y));	// bar
// 方式1
let m = new Map([
	['name', 'zhangsan'],
  ['title', 'lisi']
]);

console.log(m);	// Map {"name" => "zhangsan", "title" => "lisi"}

// 方式2
let m = new Map();
m.set('name', 'zhangsan');
m.set('title', 'lisi');

console.log(m);	// Map {"name" => "zhangsan", "title" => "lisi"}
var items = [['name', 'wangwu'], ['title', 'zhaoliu']];

let m = new Map();
items.forEach(([key, value]) => m.set(key, value))

console.log(m);
```



###  Map.prototype.set()

set() 方法为 Map 对象添加或更新一个指定了键（key）和值（value）的（新）键值对。

**语法**：myMap.set(key, value);

**参数**：key，要添加至相应 Map 对象的元素的键。value，要添加至相应 Map 对象的元素的值。

**返回值**：Map 对象。

```javascript
const m = new Map();

var x = {id: 1},
    y = {id: 2};

// 返回了 Map 对象，所以可以链式调用
m.set(x, "foo").set(y, "bar"); 
```

###  Map.prototype.get()

get() 方法返回某个 Map 对象中的一个指定元素。

**语法**：myMap.set(key, value);

**参数**：key，必须参数，也是它唯一的参数，要从目标 Map 对象中获取的元素的键。

**返回值**：返回一个 Map 对象中与指定键相关联的值，如果找不到这个键则返回 undefined。

###  Map.prototype.get()和Map.prototype.set()以及特殊值问题

```javascript
const map = new Map();
map.set([5], 555);
console.log(map.get([5]));	// undefined  set的[5]，和get的[5]，是两个不同的引用值

const map = new Map();
map.set({}, 555);
console.log(map.get({}));		// undefined  set的{}，和get的{}，是两个不同的引用值
const map = new Map();
map.set(-0, 123);
console.log(map.get(+0));		// 123
console.log(+0 === -0);     // true
console.log(Object.is(+0, -0)); // false
const map = new Map();
map.set(true, 1);
map.set('true', 2);
console.log(map.get(true)); // 1
const map = new Map();

map.set(undefined, 1);
map.set(null, 2);

console.log(map.get(undefined));	// 1
console.log(map.get(null));				// 2
const map = new Map();

map.set(NaN, 123);
console.log(map.get(NaN)); // 123

console.log(NaN === NaN);  					// false
console.log(Object.is(NaN, NaN));		// true
```

###  map原型上的方法

```javascript
console.log(Map.prototype);
```



###  Map.prototype.delete()

delete() 方法用于移除 Map 对象中指定的元素。

**语法**：myMap.delete(key);

**参数**：key，必须。从 Map 对象中移除的元素的键。

**返回值**：Boolean，如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false。

###  Map.prototype.clear()

clear()方法会移除Map对象中的所有元素。

**语法**：myMap.clear();

**返回值**：undefined

###  Map.prototype.has()

方法has() 返回一个bool值，用来表明map 中是否存在指定元素。

**语法**：myMap.has(key);

**参数**：key，必填。用来检测是否存在指定元素的键值。

**返回值**：Boolean，如果指定元素存在于Map中，则返回true。其他情况返回false

###  Map.prototype.keys()

keys() 返回一个引用的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的key值。

**语法**：myMap.keys()

**返回值**：一个存在引用关系的 Map iterator 对象。

```javascript
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.keys();

console.log(mapIter.next().value); // "0"
console.log(mapIter.next().value); // 1
console.log(mapIter.next().value); // Object

// 使用 for...of 迭代循环
```

###  Map.prototype.values()

values() 方法返回一个新的Iterator对象。它包含按顺序插入Map对象中每个元素的value值。

**语法**：myMap.values()

**返回值**：一个新的 Map 可迭代对象。

```javascript
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.values();

console.log(mapIter.next().value); // "foo"
console.log(mapIter.next().value); // "bar"
console.log(mapIter.next().value); // "baz"

// 使用 for...of 迭代循环
```

###  Map.prototype.entries()

entries() 方法返回一个新的包含 [key, value] 对的 Iterator 对象，返回的迭代器的迭代顺序与 Map 对象的插入顺序相同。

**语法**：myMap.entries()

**返回值**：一个新的 Map 迭代器对象。

```javascript
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.entries();

console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]

console.log(myMap[Symbol.iterator] === myMap.entries); // true

// 使用模式匹配
for (let [key, value] of myMap) {
	console.log(key, value);
}

// 使用 for...of 迭代循环
```

## map结构与数组互转

###  map结构转数组

```javascript
const myMap = new Map();

myMap.set(true, 7)
		 .set({foo:3}, ['abc']);

console.log(myMap);
console.log([...myMap]);
```



###  数组转map结构

```javascript
const map = new Map([
	[true, 7],
  [{foo: 3}, ['abc']]
])

console.log(map);
```



## map结构与对象互转

###  map结构转对象

```javascript
const myMap = new Map();
myMap.set(true, 7)
		 .set('a', 'abc');

function strMapToObj(strMap){
	let obj = Object.create(null);
  
  for(let [key, val] of strMap){
  	obj[key] = val;
  }
  
  return obj;
}

console.log(strMapToObj(myMap))
```



###  对象转map结构

```javascript
function objToStrMap(obj){
  let map = new Map();
  
  for(let key of Object.keys(obj)) {
  	map.set(key, obj[key]);
  }
  
	return map;
}

console.log(objToStrMap({true: 7, no: false}));
```



## map、set与array对比

###  map PK array

```javascript
let map = new Map();
let arr = new Array();

// 增
map.set('t', 1);
arr.push({'t': 1});
console.log(map, arr);

// search
let map_exist = map.has('t');
let array_exist = arr.find(item => item.t);
console.log(map_exist, array_exist);

// modify
map.set('t', 2);
arr.forEach(item => item.t ? item.t = 2 : '');
console.log(map, arr);

// delete
map.delete('t');
let index = arr.findIndex(item => item.t);
arr.splice(index, 1);
```

###  set PK array

```javascript
let set = new Set();
let arr = new Array();
let obj = {t: 1};

// add
set.add(obj);
arr.push({t: 1});
console.log(set, arr);

// search
let set_exist = set.has(obj);
let array_exist = arr.find(item => item.t);
console.log(set_exist, array_exist);

// modify
set.forEach(item => item.t ? item.t = 2 : '');
arr.forEach(item => item.t ? item.t = 2 : '');
console.log(set, arr);

// delete
set.forEach(item => item.t ? set.delete(item) : '');
let index = arr.findIndex(item => item.t);
arr.splice(index, 1);
```

## map set object 对比

```javascript
let item = {t: 1};
let map = new Map();
let set = new Set();

let obj = {};

// add
map.set('t', 1);
set.add(item);
obj['t'] = 1;
console.log(obj, map, set);

// search
console.log({
	map_exist: map.has('t'),
  set_exist: set.has(item),
  // obj_exist: 't' in obj
  obj_exist: obj.hasOwnProperty('t')
})

// modify
map.set('t', 2);
item.t = 2;
obj['t'] = 2;
console.log(obj, map, set);

// delete
map.delete('t');
set.delete(item);
delete obj['t'];
```

###  建议

涉及到数据结构时，能用Map，就不用数组。对数据结构有唯一性要求就使用Set

## WeakMap与WeakSet
- 阉割版的Map和Set，由于弱引用，存储内容不可预测，所以不存在遍历方法
- WeakSet.prototype.add()成员只能是对象，WeakMap.prototype.set()的key只能是对象
- 垃圾回收不会考虑，WeakMap和WeakSet的引用