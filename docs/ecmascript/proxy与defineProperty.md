# proxy与defineProperty

## proxy

### 链式操作实现

```js
function pipe (value) {
  const arr = [];
  const proxy = new Proxy(
    {},
    {
      get(target, property, recevier) { // recevier接受者，即proxy代理对象本身
        if (property === "get") {
          return arr.reduce((prev, fn) => {
            return fn(prev);
          }, value);
        }
        arr.push(window[property]);
        return recevier;
      },
      set(target, property, value, recevier) {
        
      },
      // 除了get/set，proxy的拦截器handler还有很多
    }
  );

  return proxy;
}

var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n
  .toString()
  .split("")
  .reverse()
  .join("");

console.log(pipe(3).double.pow.reverseInt.get); // 63
// 3 > 6 > 36 > 63
```

### 捕捉器(traps)

traps 是一系列提供属性访问的方法。类似于操作系统中捕获器的概念。

```js
// 代理陷阱
handler.apply()
handler.construct()
handler.defineProperty()
handler.deleteProperty()
handler.get()
handler.getOwnPropertyDescriptor()
handler.getPrototypeOf()
handler.has()
handler.isExtensible()
handler.ownKeys()
handler.preventExtensions()
handler.set() // 需返回一个布尔值，true表示设置成功
handler.setPrototypeOf()
```



## defineProperty

```js
var obj = {};
var _a;
Object.defineProperty(obj, "a", {
  // 元操作（JS中最基础的操作）
  configurable: true,  // delete
  enumerable: true,
  // value: 1,
  // writable: true,
  // 定义了get/set 就不需要定义value/writable
  get() {
    return _a;
  },
  set(val) {
    _a = val;
  }
});
```

## defineProperties

```js
// Object.defineProperties
Object.defineProperties(obj, {
  "key1": {
    configurable: true,
    enumerable: true,
    value: 1,
    writable: true
  },
  "key2": { 
    // ...
  }
});
```

## 参考

[mdn-proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)  
[mdn-Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)  
[mdn-Object.defineProperties](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

