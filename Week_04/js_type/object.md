# JS对象（object）

## 对象（object）三要素

* 标识（identifier）：对象是**唯一的**
* 状态（state）：用来**描述对象**
* 行为（behavior）：用来**改变状态**

[狗咬人](dog.js)，通过这个例子，解释状态和行为:

不能直接在Dog class中写`bite(person)`。因为`bite(person)`没改变dog的状态。


## 面向对象（object-oriented）

* 基于类（class)
    * 归类： 多继承（C++）
    * 分类： 单继承（JAVA）

* 基于原型（prototype）
    
    其他对象是在原型（prototype），进行修改而生成的

## js对象

两个要素：
* 属性（property）: 对象是属性的集合
* 原型（prototype）

js每创建一个对象，都给这个对象一个特定的内存地址。所以js对象满足唯一性。

js的属性，即是属性，又是行为。

如果我们调用的属性，对象没有，我们会在对象的原型上去找（**原型链**）。

## js的对象属性

key—value：

* key: String 或 Symbol
    
    每个Symbol都是唯一的，且只能使用引用来访问。这样限制设置对象属性的访问权限。
    
    而，String不行。如果用户知道的String的值，他能在任何地方访问这个对象属性。

* value: 
    * 数据属性（data property）:
        
        `[[value]], writable(default true), enumerable(default true), configurable(default true)`
    
    * 访问器属性（accessor property）:

        `get/set, enumerable(default true), configurable(default true)`
    
    一般，数据属性描述状态，访问器属性描述行为。但数据属性也能存储函数，这时数据属性也能描述行为。

## Function对象

含有内置属性`[[call]]`的对象。

>注意：type of Function对象 === “Function”

> `[[]]`表示在js中不能被调用的属性。只能被调用js引擎的语言（C, C++）使用