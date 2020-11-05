# 正常流

1. 收集盒进行
2. 行内排布
3. 行间排布

## 文字与盒在行内混排

1. 盒的尺寸，先后顺序会影响line-top, line-bottom， 不影响text-top, text-bottom

2. inline-box内的文字影响baseline. 
    
    解决方法：使用 `vertical-align: top/middle/bottom` (top 既是line-top)

## float / clear

float 和 clear 组合可以实现换行（过时）

```html
<div style="float:left">1</div>
<div style="clear:left;  float:left">1</div>
```

## margin collapse

只有BFC中，会有这现象。上面的盒的margin与下面的，重合。

## BFC (Block Formatting Context)

* block container: 里面有BFC
    
    > block, inline-block, table-cell, flex-item, grid cell, table-caption

* block-level box: 外面有BFC
* **block box**: **里外都有BFC**

### 建立BFC

两个分类，四种情况：

* 默认可以容纳正常流的盒：

    * float
    * absolutely positioned elements
    * block container

* block box with `overflow: visible`

    * bfc + float: 两者合并 [demo](../src/bfc1.html)
    * bfc + margin collapse: 两者的margin合并 [demo](../src/bfc2.html)

