# JS反射机制

## 一、什么是反射机制

反射机制是在编译阶段不知道是哪个类被加载，而是在运行的时候才加载、执行。

也就是说，反射机制指的是程序在运行时能够获取自身的信息。js 中的 apply 就是反射机制。

## 二、Reflect

### 1、Reflect 定义

Reflect 是一个内建的对象，用来提供方法去拦截 JavaScript 的操作。
Reflect 不是一个函数对象，所以它是不可构造的，也就是说它不是一个构造器，不能通过 new 操作符去新建或者将其作为一个函数去调用 Reflect 对象。

Reflect 的所有属性和方法都是静态的。

Reflect 内部封装了一系列对对象的底层操作。
Reflect 成员方法就是 Proxy 处理对象的默认实现。

```javascript
const proxy = new Proxy(obj, {
  get(target, property) {
    // 如果没有定义 get 方法，那么默认返回的就是 Reflect 的 get 方法
    return Reflect.get(target, property)
  }
})
```

### 2、Reflect API 汇总

Reflect 提供了一套用于操作对象的 API，之前操作对象可以用 `Object` 上面的一些方法，也可以用 `in`、`delete` 这种操作符，使用 `Reflect` 就统一了操作方式

![img](https://cdn.nlark.com/yuque/0/2021/webp/396745/1622908363582-1f619569-0c77-4930-8ed1-f1dac82ddfae.webp)

### 3、`.apply()`

### `Reflect.apply(target, thisArgument, argumentsList)`

- `target`：目标函数（必选）
- `thisArgument`：`target` 函数调用时绑定的 this 对象（可选）
- `argumentsList`：`target` 函数调用时传入的实参列表，该参数应该是一个类数组的对象（可选）

#### ① ES5 用法

先指定方法，再去调用 `apply`

```javascript
Math.floor.apply(null, [1.72])  // 1
```

#### ② ES6 用法

先传递 `apply`，再指定是哪个方法

```javascript
Reflect.apply(Math.floor, null, [1.72])  // 1
```

静态扫描时 `Math.floor` 是没有被执行，等到运行时再动态的将 `Math.floor` 作为参数传进来的

#### ③ 实际应用

```javascript
// ES5 用法
let price = 101.5
if (price > 100) {  
  price = Math.floor.apply(null, [price])
} else {  
  price = Math.ceil.apply(null, [price])
}
price  // 101
// ES6 用法
let price = 101.5
Reflect.apply(price > 100 ? Math.floor : Math.ceil, null, [price])  // 101
```

### 4、`.construct()`

使用反射的方式去实现创建类的实例，类似于 `new target(…args)`
`Reflect.construct(target, argumentsList[, newTarget])`

- `target`：被运行的目标函数（必选）
- `argumentsList`：调用构造函数的数组或者伪数组（可选）
- `newTarget`：该参数为构造函数， 参考 `new.target` 操作符，如果没有 `newTarget` 参数， 默认和 `target` 一样（可选）

#### ① ES5 用法

```javascript
let a = new Date()
a.getTime()  // 1632632744483
```

#### ② ES6 用法

```javascript
let b = Reflect.construct(Date, [])
b.getTime()  // 1632632744484
```

### 5、`.defineProperty()`

静态方法 `Reflect.defineProperty()` 基本等同于 `Object.defineProperty()` 方法
`Reflect.defineProperty(target, propertyKey, attributes)`

- `target`：目标对象（必选）
- `propertyKey`：要定义或修改的属性的名称（可选）
- `attributes`：要定义或修改的属性的描述（可选）

#### ① ES5 用法

```javascript
const student = {}const r = Object.defineProperty(student, 'name', { value: 'Mike' })
student  // {name: "Mike"}
r  // {name: "Mike"}
```

#### ② ES6 用法

```javascript
const student = {}const r = Reflect.defineProperty(student, 'name', { value: 'Mike' })
student  // {name: "Mike"}
r  // true
```

这两个方法效果上来看是一摸一样的，都可以改变一个对象的值
区别在于返回值不同：Object是返回这个值，Reflect是返回true

PS: 在 W3C 中，以后所有的 Object 上面的方法，都会慢慢迁移到 Reflect 对象，可能以后会在 Object 上面移除这些方法

### 6、`.deleteProperty()`

```
Reflect.deleteProperty` 允许删除一个对象上的属性，返回一个 Boolean 值表示该属性是否被成功删除，它几乎与非严格的 delete operator 相同
`Reflect.deleteProperty(target, propertyKey)
```

- `target`：删除属性的目标对象
- `propertyKey`：将被删除的属性的名称

#### ① ES5 用法

```javascript
const obj = { x: 1, y: 2 }
const a = delete obj.x
obj  // {y:2}
a  //true
```

#### ② ES6 用法

```javascript
const obj = { x: 1, y: 2 }
const a = Reflect.deleteProperty(obj, 'x')
obj  // {y:2}
a  //true
```

### 7、`.get()`

```
Reflect.get()` 方法的工作方式，就像从 object (target[propertyKey]) 中获取属性，但它是作为一个函数执行的
`Reflect.get(target, propertyKey[, receiver])
```

#### ① ES5 用法

```javascript
const obj = { x: 1, y: 2 }
obj.x  //1obj['x']  //1
```

#### ② ES6 用法

```javascript
const obj = { x: 1, y: 2 }
Reflect.get(obj, 'x')  // 1
Reflect.get(['a', 'b', 'c'], 1)  // b
```

### 8、`.getOwnPropertyDescriptor()`

静态方法 `Reflect.getOwnPropertyDescriptor()` 与 `Object.getOwnPropertyDescriptor()` 方法相似
如果在对象中存在，则返回给定的属性的属性描述符，否则返回 undefined
`Reflect.getOwnPropertyDescriptor(target, propertyKey)`

#### ① ES5 用法

```javascript
const obj = { x: 1, y: 2 }
Object.getOwnPropertyDescriptor(obj, 'x')
// {value:1, writable:true, enumerable:true, configurable:true}
```

#### ② ES6 用法

```javascript
const obj = { x: 1, y: 2 }
Reflect.getOwnPropertyDescriptor(obj, 'x')
// {value:1, writable:true, enumerable:true, configurable:true}
Reflect.getOwnPropertyDescriptor({ x: 'hello' }, 'y')
//undefined
Reflect.getOwnPropertyDescriptor([], 'length')
// {value:0, writable:true, enumerable:false, configurable:false}
```

#### ③ 对比

如果 `Reflect.getOwnPropertyDescriptor` 的第一个参数不是一个对象（一个原始值），那么将造成 TypeError 错误
而对于 `Object.getOwnPropertyDescriptor`，非对象的第一个参数将被强制转换为一个对象处理

```javascript
Reflect.getOwnPropertyDescriptor("foo", 0);
//TypeError:"foo"isnotnon-nullobject
Object.getOwnPropertyDescriptor("foo", 0);
// { value:"f", writable:false, enumerable:true, configurable:false }
```

### 9、`.getPrototypeOf()`

静态方法 `Reflect.getPrototypeOf()` 与 `Object.getPrototypeOf()` 方法是一样的，都是返回指定对象的原型（即，内部的 [[Prototype]] 属性的值）
`Reflect.getPrototypeOf(target)`

#### ① ES5 用法

```javascript
const d = New Date()
Object.getPrototypeOf(d)
// {constructor:ƒ, toString:ƒ, toDateString:ƒ, toTimeString:ƒ, toISOString:ƒ, …}
```

#### ② ES6 用法

```javascript
const d = New Date()
Reflect.getPrototypeOf(d)
// {constructor:ƒ, toString:ƒ, toDateString:ƒ, toTimeString:ƒ, toISOString:ƒ, …}
```

### 10、`.has()`

判断一个对象是否存在某个属性，和 `in` 运算符 的功能完全相同
`Reflect.has(target, propertyKey)`

```javascript
const obj = { x: 1, y: 2 }
Reflect.has(obj, 'x')  //true
Reflect.has(obj, 'z')  //false
```

### 11、`.isExtensible()`

判断一个对象是否可扩展
`Reflect.isExtensible` 与 `Object.isExtensible` 方法一样，都是判断一个对象是否可扩展 （即是否能够添加新的属性）
`Reflect.isExtensible(target)`

```javascript
const obj = { x: 1, y: 2 }
Reflect.isExtensible(obj)  //true
Object.freeze(obj)  //阻止新属性添加到对象
obj.z = 3
Reflect.isExtensible(obj)  //falseobj  // {x:1, y:2}
```

### 12、`.ownKeys()`

判断对象自身属性
`Reflect.ownKeys` 方法返回一个由目标对象自身的属性键组成的数组，它的返回值等同于``Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`
`Reflect.ownKeys(target)`

```javascript
const obj = { x: 1, y: 2 }

Reflect.ownKeys(obj)  // ["x", "y"]
Reflect.ownKeys([])  // ["length"]
Reflect.ownKeys([1, 2])  // ["0", "1", "length"]
```

### 13、`.preventExtensions()`

阻止新属性添加到对象，等同于`Object.freeze()`
`Reflect.preventExtensions` 方法阻止新属性添加到对象，例如：防止将来对对象的扩展被添加到对象中，与 `Object.preventExtensions()` 方法一致

```
Reflect.preventExtensions(target)
const obj = { x: 1, y: 2 }
Reflect.isExtensible(obj)  //true
Reflect.preventExtensions(obj)  //阻止新属性添加到对象obj.z = 3
Reflect.isExtensible(obj)  //falseobj  // {x:1, y:2}
```

### 14、`.set()`

写数据
`Reflect.set` 方法允许在对象上设置属性，用来给属性赋值，类似 property accessor 的语法，但它是以函数的方式
`Reflect.set(target, propertyKey, value[, receiver])`

```javascript
const obj = { x: 1, y: 2 }
Reflect.set(obj, 'z', 4)

obj  // {x:1, y:2, z:4}

const arr = ['apple', 'pear']
Reflect.set(arr, 1, 'banana')

arr  // ["apple", "banana"]
```

### 15、`.setPrototypeOf()`

`Reflect.setPrototypeOf` 方法改变指定对象的原型 （即内部的 [[Prototype]] 属性值）
`Reflect.setPrototypeOf(target, prototype)`

```js
const arr = ['apple', 'pear']
Reflect.getPrototypeOf(arr)
// [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ,…]

Reflect.setPrototypeOf(arr, String.prototype)
Reflect.getPrototypeOf(arr)
// String {"", constructor: ƒ, anchor: ƒ, big
```

