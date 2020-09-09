# 拖拽

实现拖动div分为以下几个步骤：

1. 监听`div`的mousedown事件
2. 当`div`的mousedown触发，监听`document`的mousemove和mouseup。
    * 当mouseup触发，取消对`document`的mousemove和mouseup的监听
    * 当mousemove触发，移动div（用`translate()`来改变`div.style.transform`）   

## Range
用来获取包含节点的document的片段。

例如，获取textNode的childNodes中，第1个到第5个的节点。
```javascript
let range = document.createRange();
range.setStart(textNode, 0);
range.setEnd(textNode, 5);
```

## CSS Object Model （CSSOM）
类似于DOM（js操控HTML），CSSOM是用js操控CSS。

例如，这个例子中，获取range的长方形边框。

## 细节

1. 在document上监听`mouseup`, `mousemove`，这样即使鼠标移出了浏览器的页面，监听依旧没断。