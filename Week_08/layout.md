# Layout

Toy browser 使用Flex。

```css
.container {
  display: flex; /* or inline-flex */
}
```

[Flex Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 步骤

[code](./src/layout.js)

1. 读取属性
    
    将css属性转化成`mainSize,
        mainStart,
        mainEnd,
        mainSign,
        mainBase,
        crossSize,
        crossStart,
        crossEnd,
        crossSign,
        crossBase`，
    为接下来的操作做准备。

2. 元素入行（包括换行处理）
    
    创建`flexLine`, 用来存储每行的**元素**，**主轴方向的空间**，**交叉轴方向的空间**。

    分两类处理：含`flex`的元素，不含`flex`的元素

3. 计算主轴

    计算main axis的布局（layout）

    对于含`flex`的元素，根据`flex`分配空间。

    对于不含`flex`的元素，根据`justifyContent`分配空间。

4. 计算交叉轴

    根据`align-items` (parent element), `align-self`分配空间。思路和计算主轴的一致。