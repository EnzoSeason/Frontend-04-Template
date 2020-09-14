# JS对象（object）

## 对象（object）三要素

* 标识（identifier）：对象是**唯一的**
* 状态（state）：用来**描述对象**
* 行为（behavior）：用来**改变状态**

js每创建一个对象，都给这个对象一个特定的内存地址。所以js对象满足唯一性。

[狗咬人](dog.js)，通过这个例子，解释状态和行为:

不能直接在Dog class中写`bite(person)`。因为`bite(person)`没改变dog的状态。


##　面向对象（object-oriented）

* 基于类（class)
    * 归类： 多继承（C++）
    * 分类： 单继承（JAVA）

* 基于原型（prototype）
    
    其他对象是在原型（prototype），进行修改而生成的

