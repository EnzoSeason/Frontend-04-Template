# API

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
  