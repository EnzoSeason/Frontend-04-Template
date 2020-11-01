# 排版

## 标签 (tag)，元素 (element)，盒 (box)

HTML代码中可以书写开始_tag___，结束__tag__ ，和自封闭__tag__ 。

一对起止___tag_ ，表示一个__element__ 。

DOM树中存储的是__element__和其它类型的节点（Node）。

CSS选择器选中的是__element__ 。

CSS选择器选中的__element__ ，在排版时可能产生多个___box_ 。

排版和渲染的基本单位是_box___ 。

## 正常流

1. 收集盒进行
2. 行内排布
3. 行间排布

### 文字与盒在行内混排

1. 盒的尺寸，先后顺序会影响line-top, line-bottom， 不影响text-top, text-bottom

2. inline-box内的文字影响baseline. 
    
    解决方法：使用 `vertical-align: top/middle/bottom` (top 既是line-top)