# JS类型（class）

Undefinded, Null, Boolean, Number, String, Symbol, Object 

## Number

### 运行时

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

## String

### 运行时

1. Unicode 
    一个字符集， 每个字符都有一个码点（code point）。

    比如“一”在Unicode中：
    ```
    U+4E00 = 好
    ```
    中文"一"在Unicode的码点，是**十六进制**的**4E00**。
    
    (`"一".charCodeAt(0).toString()`)。

2. UTF-8
    一种编码方式，**一个字节（8个btype）表示一个字符**。

    因为这个特性，ASCII编码的结果和UTF-8编码的结果是一致的。

    但，对于中文，需要多个字节表示一个字符。

    在UTF-8中，通过**控制符**来连接多个字符(最多4个)：
    * 第一个字符，用`1`表示需要连接多少个字符，以`0`结尾。
    * 之后的字符，以`10`开头
    * 范围：U+0000 -- U+10FFFF

    比如`一`：

    **1110**0100 **10**111000 **10**000000

3. UTF-16
    同UTF-8一样，也是一种编码方式，**2个字节表示一个字符**。
    比如， `a`：
    |Encode|Result|
    |---|----|
    | UTF-8 | 01100010
    | UTF-16| 00000000 01100010

我们可以: 
* 用`charCodeAt()`对**字符**进行UTF-16编码。
* 用`encodeUrl()`或者`encodeUrlComponent()`对**字符**进行UTF-8编码 (除了`A-Z a-z 0-9 - _ . ! ~ * ' ( )`)。

[例子](UTF8_string.js)
### 语法

* \b: Backspace
* \f: Form feed (advance downward to the next "page")
* \r: Carriage return (return to the beginning of the current line without advancing downward)
* \n: Linefeed (advance downward to the next line)
* \t: Horizontal Tab
* \v: Vertical Tab
* \x: hex code
* \u: unicode code
* \u2028, \u2029: 换行符

String Template: 反引号