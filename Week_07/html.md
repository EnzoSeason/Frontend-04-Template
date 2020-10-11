# HTML解析

[code](./src/parser.js)

## 词法分析（tokenization）
使用有限状态机解析标签。

有三种标签：
* 开始标签
* 结束标签
* 自封标签

## 语法分析

使用栈构建DOM树。
