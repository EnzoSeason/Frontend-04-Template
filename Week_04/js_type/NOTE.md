# JS类型（class）

Undefinded, Null, Boolean, Number, String, Symbol, Object 

## Number

[Double Float](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)

一位符号（Sign）+ 11位指数（Exponent）+ 52位有效数字（Fraction）

* 符号位：0表示负，1表示正。
* 指数位的基准值是：1加10个0。
* 有效数位开头有个隐藏位，1。

所以，Double Float的表达式为：

(-1) ^ Sign * (1.bbbb...b) * 2 ^ (Exponent - 1023);
>有52个b

比如： 6 的Double Float就是`1 * 1.1 * 2 ^ 1`


### 语法

* 十进制：
    * `0`
    * `0.` 
    * `.2`
    * `1e3`
* 二进制：0b111
* 八进制：0o10
* 十六进制：0xFF

使用toString，数字后要加上空格， 比如`0. toString();`。

