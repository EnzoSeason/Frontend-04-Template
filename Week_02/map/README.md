# 学习笔记

## 广度优先搜索（BFS）vs 深度优先搜索（DFS）

### 原理
 * BFS优先搜索节点的**所有子节点**。
 * DFS优先搜索节点的**一个分支**。

### 实现
* BFS利用**队列**。搜索完一个节点，该节点出队，它的所有子节点入队。
* DFS利用**栈**（递归本质就是栈）。搜索完一个节点，该节点出栈，它的所有子节点入栈。

## 最小堆

### 原理
最小堆是个**满二叉树**（除了叶子节点和在倒数第二层的节点，所有节点都有2个子节点， 且尽最大可能使倒数第二层的**左侧**节点填满子节点）。由于这个性质， 最小堆的值可以使用数组来存储。例如，对于数组内第*i*个元素：
* 夫亲节点： （i - 1）/ 2
* 左孩子节点： 2 * i + 1
* 右孩子节点： 2 * i + 2

**最小堆**及其**子树**满足：父亲节点的值小于子节点的值。

### 应用：（堆排序，优先级队列）

常用方法
* 插入： 将新元素插入数组**最后一个**位置。然后与其**父亲节点**比较，如果比它的值小，**两者交换**。继续这样的比较直到满足最小堆的性质。

* 排序：将节点与其**左右**子节点分别比较， 如果比他们大， 交换，然后对交换过的子节点进行递归。

* 取出最小值：返回根节点的值，然后移除根节点再排序


## 细节

1.null vs undefinded

这是js的两种**不同**的数据类型. `null` is type of `Object`, `undefinded` is type of `undefinded` 