# CSS 基础

## 概述
- cascding style sheet 层叠样式表
```css
选择器 {
	属性名: 属性值;
  属性名: 属性值;
}
```

## 内联样式

```html
<div style="width: 100px; height: 100px;"></div>
```

## 内部样式表

```html
...
<style type="text/css">
  选择器 {
		属性名: 属性值;
  	属性名: 属性值;
	}
</style>
...
```

## .css文件的引用(外部样式表)

- rel="stylesheet"的意思是现在要引用的链接与html文档的关系是样式表的关系
- href：hypertext reference

```html
<link rel="stylesheet" type="text/css" href="css/index.css" />
```

## 三种样式书写方式权重(优先级)问题

内联样式 > 内部样式表 > 外部样式表

## 选择器权重

!important > id > class | 属性 > 标签 > *

| *                 | 0      |
| ----------------- | ------ |
| 标签、伪元素      | 1      |
| class、属性、伪类 | 10     |
| id                | 100    |
| 内联样式          | 1000   |
| !important        | 正无穷 |

数学中：    正无穷 = 正无穷 + 1

计算机中： 正无穷 < 正无穷 + 1

## 宽高

- min-width、max-width
- min-hegiht、max-heigth

## 字体

- 浏览器设置字体大小的时候，设置的是高度，宽度自动缩放
- font-weight：
  1. 100-900
  2. lighter、normal、bold、bolder

- font-style：italic(字体自带的斜体属性)、oblique(使字体向右倾斜); <em></em>
- 并不是所有字体都具有斜体的样式，对于那些没有斜体样式的字体来说，使用italic是没有效果的，此时就可以利用oblique代替italic来实现字体倾斜的效果
- 通用字体：arial(苹果和微软都有的字体)

## 颜色

- 16进制颜色
- rgb()

## 边框

- 基本属性：border-width/style/color

- 使用边框实现三角形
  1. 盒子宽高设置为零、设置边框宽度
  2. 所有边框透明、再给其中一个边框设置颜色

## 文本

- 1em = 10px

```css
html {
	font-size: 62.5%; /* 16px * 62.5% = 10px */
}

p {
	font-size: 1.6em; /* 1em = 10px; 1.6em = 16px */
}
```

-  禁用手势

```css
button,
input[type="submit"] {
	cursor: not-allowed;
}

/* 补充：也可以设置按钮禁用状态下的样式 */
button:disabled {
	background-color: #333;
  color: #fff;
}
```

- 单行文本截断和显示省略号的三大件

```css
/* 单行文本截断和显示省略号 */
div {
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;
}

/* 多行文本截断 */
{
  ...
  width: ...;
  height: ...;
	overflow-y: hidden;
}
```

- input[type=checkbox]：实现自定义checkbox

## 伪类

- ...
- nth-child(odd奇数/even偶数)

## 场景

### 行内块遇到行内文本

- 当行内块遇到行内文本，默认向下对齐
- 若行内块内有文本，则行内文本跟行内块中的文本对齐

```html
...
<head>
...
<style>
  img {
  	width: 150px;
    border: 1px solid #000;
    vertical-align: middle; /* top|middle|bottom 也可以填写数值 10px */
  }
</style>
</head>
<body>
	<img src"https://www.baidu.com" />
  <span>123</span>
</body>
...
```

### 文本垂直居中

- 单行文本：行高等于容器高度
- 由于table单元格默认垂直居中，据此实现容器内多行文本垂直居中

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    div {
      display: table;
      width: 100px;
      height: 100px;
      font-size: 12px;
      border: 1px solid #000;
    }

    span {
      display: table-cell;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <div>
    <span>你好，蓝轨迹！你好，蓝轨迹！你好，蓝轨迹！</span>
  </div>
</body>
</html>
```

### 绝对定位中的两栏设计

- 左/右侧绝对定位
- 内容区域margin-left/right：左/右侧宽度;

### 浮动

- 内联、内联块、浮动、溢出隐藏、纯文本、都可以识别浮动元素的位置
- 除了块级元素
- float全部自动转换inline-block

### BFC

- `<body></body>`
- float：left | right;
- position: absolute | fixed;

- display：inline-block | table-cell;
- overflow：hidden | auto | scroll;

#### BFC解决4点问题：

- margin合并问题
- 浮动流造成父级元素高度坍塌问题
- margin塌陷问题
- 浮动元素覆盖问题

### CSS书写顺序

- 显示属性：display,positon,float,clear
- 自身属性：width,height,margin,padding,border,background
- 文本属性：color,font,text-align,vertical-align,whitespace
- 其他

### font简写

font-style font-weight font-size line-height font-family

font: italic bold 12px/20px "微软雅黑"

