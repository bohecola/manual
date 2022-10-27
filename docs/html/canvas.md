# Canvas
Canvas是HTML5中的新东西，本质是一个画布，通过接口提供使用js绘图的能力
## 使用
### 创建容器
<<< @/html/snippets/canvas/index.html#container
### 获取画布对象
<<< @/html/snippets/canvas/index.js#canvas

## 上下文方法
### 路径
路径就是一条线+一条线+一条线+...的组合  
它有两种绘制模式：
  - fill 把各条线所包围的区域进行填充 
  - stroke 把所有的线描出来
可以通过 `fillStyle` 和 `strokeStyle` 来分别设置样式

#### stroke
<<< @/html/snippets/canvas/index.js#stroke
如果不指定样式，默认是黑色

#### fill
再试试填充？  

<<< @/html/snippets/canvas/index.js#fill
尽管没有形成封闭的图形，但是在执行 `fill` 的时候自动将没有封闭的两个点进行连线了

#### beginPath
所以如果我想画两个图形怎么办？  
用 `beginPath` 来重置一条路径，来告诉canvas你要开始画一个新的图形了

<<< @/html/snippets/canvas/index.js#beginPath
如果去掉 `beginPath` 会发生什么？前面设置的 `strokeStyle` 会被后面的覆盖掉，都被设置成蓝色的

#### closePath
有begin自然有"end": `closePath`  
不过它的意思不是简单的关闭路径绘制的意思，而是创建从当前点到开始点的路径

#### arc
<<< @/html/snippets/canvas/index.js#arc
context.arc(x, y, r, sAngle, eAngle, counterclockwise)  
6个参数分别是横坐标，纵坐标，半径，起始角，结束角，是否为逆时针

#### 其他
  - clip 从原始画布剪切任意形状和尺寸的区域
  - quadraticCurveTo 创建二次贝塞尔曲线
  - bezierCurveTo 创建三次方贝塞尔曲线
  - arcTo 创建两切线之间的弧/曲线
  - isPointInPath 如果指定的点位于当前路径中，则返回 true，否则返回 false

### 矩形
其实矩形是线条的一种特殊情况，因为比较常用，所有单独的方法
  - rect 创建矩形
  - fillRect 填充矩形
  - storkeRect 描绘矩形
  - clearRect 在矩形内清空指定的区域
参数都是4个(x, y, width, height)
```js
ctx.fillRect(0,0,100,50);
```

### 文字
属性：  
  - font 设置或返回文本内容的当前字体属性
  - textAlign	设置或返回文本内容的当前对齐方式
  - textBaseline 设置或返回在绘制文本时使用的当前文本基线
方法：  
  - fillText() 在画布上绘制“被填充的”文本
  - strokeText() 在画布上绘制文本（无填充）
  - measureText()	返回包含指定文本宽度的对象

### 图像
drawImage(img, x, y, width, height)  
drawImage(img, sx, sy, swidth, sheight, x, y, width, height)  
除了img参数是图片image DOM实例对象必须需要之外，其他都是可选参数

### 转换
其实和transform那些属性挺像的  
  - scale 缩放当前绘图至更大或更小
  - rotate 旋转当前绘图
  - translate 重新映射画布上的 (0,0) 位置
  - transform 替换绘图的当前转换矩阵
  - setTransform 将当前转换重置为单位矩阵。然后运行 transform()

## 对比
### Canvas
  - 依赖分辨率
  - 不支持事件处理器
  - 弱的文本渲染能力
  - 能够以 .png 或 .jpg 格式保存结果图像
  - 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

### SVG
  - 不依赖分辨率
  - 支持事件处理器
  - 最适合带有大型渲染区域的应用程序（比如谷歌地图）
  - 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
  - 不适合游戏应用