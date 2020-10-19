# HTML解析

[code](./src/parser.js)

## 词法分析（tokenization）
使用有限状态机解析标签。

有三种标签：
* 开始标签
* 结束标签
* 自封标签

## 语法分析

使用栈构建DOM树。栈内数据为**标签所对应的html元素**。

* startTag: 读取元素，元素入栈（除了自封闭标签所对应的元素）。文本节点为元素的一部分。
* endTag: 栈顶出栈。

## CSS计算

使用css包，读取sytle，生成ast，读取ast的rules。

rules中有两项：
* selector：`div img`
* declarations: `{ background-color: #ff5000; }`

在`endTag`状态时，读取`style属性，并调用css包来解析css。解析的结果存在一个数组`rule`中。

在`startTag`状态时，读取`rule`数组，将css加载到dom树中。


* css selector的读取规则是**从右到左的**：
    ```css
    body div img
    ```
    img -> div -> body
* css selector 有优先级： 
    
    `inline style > id > class > tag`
