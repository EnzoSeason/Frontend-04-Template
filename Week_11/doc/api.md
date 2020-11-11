# API

* [Event](#event)
* [DOM API](#dom-api)
* [Range API](#range-api)
* [CSSOM](#cssom)

## Event

冒泡与捕获： 任何的事件，都**先捕获，后冒泡**。

1. 捕获（capture）: **从外到内**，计算事件所发生的元素
2. 冒泡：计算出元素后， **从内到外**，元素响应事件

addEventListener 默认使用冒泡

## DOM API

* 导航类

  * 节点

    * parentNode, childNodes
    * firstChild, lastChild
    * nextSibling, previousSibling

  * 元素（忽略文本节点）
    * parentElement, chidren
    * firstElementChild, lastElementChild
    * nextElementSibling, previousElementSibling

* 修改

  * appendChild
  * insertBefore
  * removeChild
  * replaceChild

* 高级操作

  * compareDocumentPosition: 比较节点的前后关系
  * **contains**: 是否包含节点
  * isEqualNode: 节点是否在DOM树中完全相同
  * isSameNode: whether they reference the same object, 等价于js的 `===`
  * cloneNode: 复制节点，如果传入true，连同子节点一起复制

## Range API

对DOM进行精细操作，提升性能

获得一个range:

```javascript
var range = new Range();
```

* 对于元素节点（element node），偏移值为 children
* 对于文本节点（text node），偏移值为文字的个数

```javascript
// 选取 element[4] -> element[9]
range.setStart(element, 4); // element，偏移值
range.setEnd (element, 9);
```

offset相对比较难取准，更有用的API为：

```javascript
range.setStartBefore
range.setStartAfter
range.setEndBefore
range.setEndAfter
range.selectNode
range.selectNodeContents
```

获得一个区域 selection:

```javascript
var range = document.getSelection().getRangeAt(0);
```

range操作：

* [删] 获取range中的内容, 从DOM树上摘下来：

  ```javascript
  var fragment = range.extractContents();
  ```

  `fragment` 是node的子类。
  
  `element.appendChild(fragment)` 会把`fragment`的子元素加到DOM树上，但`fragment`不会被加进去。

* [增] 在range的位置插入新的节点：

  ```javascript
  range.insertNode(document.createTextNode('some text'));
  ```

### 实例

将element内的元素，逆序重排

1. 仅使用 DOM API

    ```javascript
    var element = document.getElementById("a");

    function reverseChildren(element ) {
      var l = element.childNodes.length - 1;
      while(l > 0) {
        element.appendChild(element.chidNodes[l]);
        l --;
      }
    }

    reverseChildren(element);
    ```

2. 使用 Range API + DOM API

    ```javascript
    var element = document.getElementById("a");

    function reverseChildren(element) {
      var range = new Range();
      range.selectNodeContents(element);
      // 移除element内的子元素，创建fragment
      var fragment = range.extractContent();
      // 使用fragment，性能优化
      // 在fragment内操作，不会触发DOM树上的重排
      var l = fragment.childNodes.length - 1;
      while(l > 0) {
        fragment.appendChild(fragment.childNodes[l]);
        l --;
      }
      //将fragment内的子元素加入DOM树
      element.appendChild(fragment);
    }

    reverseChildren(element);
    ```

## CSSOM

使用`document.styleSheets`获得 CSSOM

* `document.styleSheets[0].cssRules`

    获得  css rules

* `document.styleSheets[0].insertRule("p{color: red;}", 0)`

    插入 css rule

* `document.styleSheets[0].removeRule(0)`

    删除 rule

### CSSStyleRule

大部分的 CSS Rule 是 CSSStyleRule。其他还有很多 @Rules

* selectorText: string
* style: k-v结构

### getComputedStyle

使用 window API： `window.getComputedStyle(element, [, pseudoElement])`

* element: 元素
* pseudoElement： 可选, 伪元素

### CSSOM View

window api 可以获得设备的信息：

* `window.innerHeight`, `window.innerWidth`

    viewport, HTML实际渲染的区域大小

* `window.devicePixelRatio`

* ...

window api, 打开新窗口并控制:

* `window.open()`
* `window.moveBy(deltaX, deltaY)`
* `window.resizeBy(deltaX, deltaY)`

#### Scroll

* scrollTop, scrollLeft: 当前滚动到的位置
* scrollWidth, scrollHeight: 可滚动范围的最大值
* scroll(x, y) / scrollTo(x, y)
* scrollBy(deltaX, deltaY)
* scrollIntoView()

#### layout

* `getClientRects()`: 获取元素生成的**所有的盒**
* `getBoundingClientRects()`: 获取包含元素内容的**一个盒**

## API 组织

[get all api](../src/api.js)

* khronos

  * WebGL

* ECMA

  * ECMAScript

* WHATWG

  * HTML

* W3C

  * webaudio
  * CG (Community Group)/WG (Work Group)
