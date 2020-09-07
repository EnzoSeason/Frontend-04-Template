# wildcard

模式匹配，查找字符串（S）中的给定字符串（W）。W中包含`*`和`?`。

* `*`：**0个**或**多个**任意字符
* `?`：**1个**任意字符

## 分析

将S以`*`拆分成数组， 头尾元素的处理就是简单的判读是否**和S的头尾部分一致**。

中间的元素，从左到右，一次处理。对于每一个元素，问题就能被转化不带星号的模式匹配，可用带问号的[KMP](KMP.md)，也可用js的`RegExp`处理。

### RegExp 模式匹配

1. 设置`lastIndex`: 设置为S中还**没被匹配**的子字符串的**头部**。
2. run `regExp.exec()`
3. 重新设置`lastIndex`： `lastIndex = regExp.lastIndex`

## 细节

### [String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

第二个参数，传`s`或`\s`，最后被替换的字符都是`s`。 

* "b?".replace(/\?/s, "s") *output: bs*
* "b?".replace(/\?/s, "\s") *output: bs*

如果要替换成`\s`， 要再加个`\`： * "b?".replace(/\?/s, "\\s") *output: b\s*

### [\s\S] 代表所有字符

* `\s`: Matches a single white space character
* `\S`: Matches a single character other than white space

