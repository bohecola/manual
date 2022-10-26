# promise实现

## 代码实现

`promise`伪代码的实现，要点有三。

1. 处理`executor`中异步调用`resolve`，`reject`和多次调用`then`函数问题。
2. `p2`定义的过程中根据语法逻辑，不能直接同步访问`p2`，通过`setTimeout`异步的方式传递`p2` (`p2`是`then`方法返回的新`promise实例`，用来实现`promise`的链式调用)。
3. 考虑`x`为一个`promise实例`以及递归处理`promise`嵌套。

> 参考规范：[Promises/A+](https://promisesaplus.com/)

```js
// index.js
const pending = 'pending';
const fulfilled = 'fulfilled';
const rejected = 'rejected';

const isFunction = (value) => typeof value === 'function';
class MyPromise {
  constructor(executor) {
    this.status = pending;
    this.value = undefined;
    this.reason = undefined;

    this.onFulFilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
        return;
      }
 
      if (this.status === pending) {
        this.status = fulfilled;
        this.value = value;
        this.onFulFilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === pending) {
        this.status = rejected;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch(e) {
      reject(e);
    }
  }

  then(onFulFilled, onRejected) {
    onFulFilled = isFunction(onFulFilled) ? onFulFilled : data => data;
    onRejected = isFunction(onRejected) ? onRejected : err => { throw err; };

    const p2 = new MyPromise((resolve, reject) => {
      let x;
      if (this.status === fulfilled) {
        setTimeout(() => {
          try { 
            x = onFulFilled(this.value);
            resolvePromise(p2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        }, 0);
      }
  
      if (this.status === rejected) {
        setTimeout(() => {
          try {
            x = onRejected(this.reason);
            resolvePromise(p2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        }, 0);
      }

      if (this.status === pending) {
        this.onFulFilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              x = onFulFilled(this.value);
              resolvePromise(p2, x, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              x = onRejected(this.reason);
              resolvePromise(p2, x, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
      }
    });

    return p2;
  }

  catch(errorCallback) {
    return this.then(null, errorCallback);
  }
  
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(error) {
    return new MyPromise((resolve, reject) => {
      reject(error);
    });
  }
}

function resolvePromise(p2, x, resolve, reject) {
  let called = false;
  if (p2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'))
  }

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          resolvePromise(p2, y, resolve, reject);
        }, (r) => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch(err) {
      if (called) return;
      called = true;
      reject(err);
    } 
  } else {
    resolve(x);
  }
};
```

## A+规范测试

### 工具安装

```sh
yarn add promises-aplus-tests -g
```

### 配置代码

```js
// index.js
MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = MyPromise;
```

### 测试命令

```sh
promises-aplus-tests index
```

![promises-aplus-tests](https://canday.site:3000/public/upload/20220830/8bb8c370-27bc-11ed-8103-3b878d09f25a.gif)

## Promise周边

### all

```js
class MyPromise {
	// ...
  static all (promiseArr) {
    let resArr = [];
    let idx = 0;

    return new MyPromise((resolve, reject) => {
      promiseArr.map((promise, index) => {
        if (isPromise(promise)) {
          promise.then((res) => {
            formatResArr(res, index, resolve);
          }, reject);
        } else {
          formatResArr(promise, index, resolve);
        }
      });
    });

    function formatResArr (value, index, resolve) {
      resArr[index] = value;

      if (++ idx === promiseArr.length) {
        resolve(resArr);
      }
    }
  }
}

function isPromise(x) {
  if ((typeof x === 'object' && x !== null ) || typeof x === 'function') {
    let then = x.then;

    return typeof then === 'function';
  }

  return false;
}
```

### allSettled

```js
class MyPromise {
	// ...
  static allSettled(promiseArr) {
    let resArr = [];
    let idx = 0;

    if (!isIterable(promiseArr)) {
      throw new TypeError(promiseArr + ' is not iterable (cannot read property Symbol(Symbol.iterator))');
    }

    return new MyPromise((resolve, reject) => {
      if (promiseArr.length === 0) {
        resolve([]);
      }

      promiseArr.map((promise, index) => {
        if (isPromise(promise)) {
          promise.then((value) => {
            formatResArr('fulfilled', value, index, resolve);
          }, (reason) => {
            formatResArr('rejected', reason, index, resolve);
          });
        } else {
          formatResArr('fulfilled', promise, index, resolve);
        }
      });
    });

    function formatResArr (status, value, index, resolve) {
      switch (status) {
        case "fulfilled":
          resArr[index] = {
            status,
            value
          };
          break;
        case "rejected":
          resArr[index] = {
            status,
            reason: value
          };
          break;
        default:
          break;
      }

      if (++idx === promiseArr.length) {
        resolve(resArr);
      }
    }
  }
}

function isIterable (value) {
  return value !== null && value !== undefined && typeof value[Symbol.iterator] === 'function';
}
```

### race

```js
class MyPromise {
	// ...
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.map((promise) => {
        if (isPromise(promise)) {
          promise.then(resolve, reject);
        } else {
          resolve(promise);
        }
      });
    });
  }
}
```

### finally

1. `finally`无论外面的`promise`成功还是失败，都要走。并且回调不带参数
2. 正常走`finally`之后`then`或者`catch`
3. 如果`finally`内部有`promise`，并且有延时处理，整个`finally`会等待
4. 如果内外都是成功，取外面的结果
5. 如果外面是成功，里面是失败，取里面的结果（失败）
6. 如果外面是失败，里面是成功，取外面的结果（失败）
7. 如果外面是失败，里面是失败，取里面的结果（失败）
8. 如果外面是成功，里面是成功，取外面的结果（成功）

```js
class MyPromise {
	// ...
  finally(finallyCallback) {
    return this.then((value) => {
      return MyPromise.resolve(finallyCallback()).then(() => value);
    }, (reason) => {
      return MyPromise.resolve(finallyCallback()).then(() => {
        throw reason;
      });
    });
  }
}
```

## promisify

```js
module.exports = {
  promisify (fn) {
    return function (...args) {
      return new MyPromise((resolve, reject) => {
        fn(...args, (error, data) => {
          if (error) {
            return reject(error);
          }
          resolve(data);
        });
      });
    }
  },
  promisifyAll (fns) {
    Object.keys(fns).forEach((fnName) => {
      if (typeof fns[fnName] === 'function') {
        fns[fnName + 'Async'] = this.promisify(fns[fnName]);
      }
    });
    return fns;
  }
}
```
