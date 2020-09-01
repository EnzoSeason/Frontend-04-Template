# 使用LL算法构建AST

## 正则表达式

来源[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

语法 `var re = /pattern/flags;`

1. pattern：老师用`()`来**抓取分组**， 每个分组内，用`[]`**抓取特定字符**

2. flag： 老师用`g`来做全局搜索, 找到所有满足条件的结果（`exec()`作用在这个标志下，生成一个迭代器，并且返回`next()`的结果）

个人备注：`/\[.*?\]/g` vs `/\[.*\]/g`
* ? 加在**贪婪**的`*`(0 or more), `+`(1 or more), `?` (0 or 1), `{}` (自定义区间)后， 取消贪婪

例子： `[He] ha[s] to go read this novel [Alice in Wonderland].``

* with `?`: Array ["[He]", "[s]", "[Alice in Wonderland]"]

* without `?`: Array ["[He] ha[s] to go read this novel [Alice in Wonderland]"

## 细节

### var vs let

* `var` 没有**块级作用域**，它们的最小作用域就是函数级作用域。`let`有
* `var` 变量声明在函数开头就会被处理（脚本启动对应全局变量）。`let`不行

最好使用`let`