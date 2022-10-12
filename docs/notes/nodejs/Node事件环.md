# Node事件环

## NodeJS

### 基本认知

- 基于Chrome V8引擎的JS运行环境

- Node运行环境只包含JS中的ES部分、Node模块和NodeAPI
- 事件驱动（事件完成通知，异步）

- 非阻塞式 I/O （异步的输入输出）
- 外部依赖包与模块管理器 npm

- 主线程交替处理任务
  - 常见服务端：多线程同步模型的高并发能力（高性能处理线程池）
  - NodeJS 可以开辟子进程。child_process，cluster

### 事件驱动

事件驱动，通过**回调函数的方式通知**。事件驱动一般都是异步的。委派别人做一件事情，完成之后通过一种方式通知你，你可以做下一件事情。

```js
function test (a, b, cb) {
  const res = a + b;
  cb && cb(res);
}

test(1, 2, function (res) {
  console.log(res);
});
```

```js
// 文件读取就是一个事件
readFile('./demo.json', function (res) {
  console.log(res);
});
```

### 非阻塞式IO

纯函数是标准 IO，一个特定的输入存在相同的输出。

### NodeJS擅长做什么

擅长：I/O 操作，文件、网络、数据库操作

不擅长：CPU 密集型操作，高性能逻辑运算、解压缩、数据分析等操作

具体可以做什么：

- 前后端分离解决跨域
  - 作为中间层代理转发
- 服务端渲染
  - 组装 HTML，直接返回 HTML
- 前端工程化服务与工具
  - webpack 基于 node 实现打包功能
  - 文件读取、分析源码、编译源码、编译压缩、打包文件

### JS单线程与多线程对比

JS主线程是单线程。单线程可以防止多个线程造成DOM操作与渲染的任务冲突。Node中沿用主线程为单线程的方式。

NodeJS中宏任务是有分类的，存在不同阶段。NodeJS不存在微任务队列，存在空闲时间，直接把微任务清空。

多线程要频繁切换任务上下文处理多个问题，单线程不需要存在任务上下文切换问题。

多线程在处理多个问题时可能需要**管锁机制**，单线程不需要管锁机制。

### 同步与异步、阻塞与非阻塞

同步：按照顺序往下执行

异步：和顺序无关，和是否执行完、是否得到结果相关

```js
console.log(1);

new Promise(resolve => {
  console.log(2);
  resolve();
}).then(() => {
  console.log(3);
});

console.log(4);
// 1 2 4 3
```

阻塞是一种现象，同步异步是一种方式。NodeJS是异步非阻塞，文件读取过程中可以做其他任务。NodeJS进行IO 操作建议都使用异步非阻塞的 API。

## NodeJS事件环

NodeJS 主线程还是单线程，事件交于其他线程处理。

- Node通过事件环机制运行JS代码。
- Node提供线程池处理I/O操作任务

- Node存在两种线程：
  - 事件循环线程：负责任务调度require，同步执行回调、注册新任务
  - 线程池（libuv实现）：负责处理任务I/O操作、CPU密集型任务（不擅长）

![NodeJS-Event-Loop](https://canday.site:3000/public/upload/20220906/26b3afe0-2dc9-11ed-94e1-9bc4dd737241.png)

Node内核Libuv实现了线程池和事件环。NodeJS实际上并不存在事件队列，只是将事件交于线程池处理，处理完成通知主线程进行下一步操作。

事件环阶段（phase）：

1. **Timers：setTimeout/setInterval**
2. Pending callbacks：执行延迟到下一个事件环迭代的I/O回调（内部机制使用）
3. IdIe, prepare：系统内部机制使用
4. **Poll：检查新的I/O事件与执行I/O事件回调**
5. **Check：setImmediate**
6. Close callbacks：关闭的回调函数（内部机制使用）

NodeJS主执行栈执行完代码之后，清空微任务，然后进入事件环阶段。

当setTimeout和setImmediate同时存在。

- 如果执行到 Poll 阶段
  - Timers中任务已经执行完毕，就会先执行 Timers阶段中的事件回调，再执行setImmediate。
  - Timers中任务并没有执行完毕，就会先执行setImmediate，再执行Timers阶段中的事件回调。

## 案例分析

### 例1

```js
const fs = require("fs");
const { readFile } = fs;

// 微任务
Promise.resolve().then(() => {
  console.log(1);
});

// 微任务
process.nextTick(() => {
  console.log(2);
});

console.log("start");

// Poll
readFile("1.txt", "utf-8", () => {
  setTimeout(() => {
    console.log(3);
  }, 0);

  process.nextTick(() => {
    console.log(4);
  });

  setImmediate(() => {
    console.log(5);
  });
  
  console.log(6);
});

console.log(7);

// Timers
setTimeout(() => {
  console.log(8);
}, 0);

// Check
setImmediate(() => {
  console.log(9);
});

console.log("end");
// 主执行栈：start、7、end
// 清空微任务：2、1 （nextTick优先于promise执行）
// 事件环：8、9 or 9、8 （Timers如果先执行完，就会先输出8，反之先输出9）
// 主执行栈：6
// 清空微任务：4
// 事件环：5、3（IO中，setImmediate优先于setTimeout）
```

### 例2

Node10及以下版本和Node11主要区别：

- Node10及以下版本会在切换阶段的时候清空微任务。
- Node11及以上版本会在宏任务执行完毕或者切换阶段时，清空微任务。

```js
const fs = require("fs");
const { readFile } = fs;

process.nextTick(() => {
  console.log(1);
});

console.log("start");

setTimeout(() => {
  console.log(2);
}, 0);

setTimeout(() => {
  console.log(3);
}, 0);

setImmediate(() => {
  console.log(4);

  process.nextTick(() => {
    console.log(5);

    Promise.resolve().then(() => {
      console.log(6);
    });
  })
});

readFile("1.txt", "utf-8", () => {
  process.nextTick(() => {
    console.log(7);
  });

  setTimeout(() => {
    console.log(8);
  }, 0);

  setImmediate(() => {
    console.log(9);
  });
});

readFile("2.txt", "utf-8", () => {
  process.nextTick(() => {
    console.log(10);
  });

  setTimeout(() => {
    console.log(11);
  }, 0);

  setImmediate(() => {
    console.log(12);
  });
});

console.log("end");

// 主执行栈：start、end
// 微任务：1
// 事件环：2、3、4 or 4、2、3
// 微任务：5、6
// 事件环
// 微任务：7、10（读取速度一致时）
// 事件环：9、12、8、11（读取速度一致时）
```

