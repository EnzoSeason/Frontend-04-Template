# 字符串

## 字典树

将所有单词都存到一棵树里，并尽最大可能使单词**共享前缀**， 来节省空间。

在js中， 使用Object或Map实现。利用`key-value`的特性，将节点值放在`key`中，将下一个节点放在`value`中。单词结尾插入终止符`$`。同样, `$`放在`key`中， 而`value`是该单词在字典中出现的次数。

### 细节

1. `in` 判断

判断js对象是否含有该属性

```javascript
const car = { make: 'Honda', model: 'Accord', year: 1998 };
console.log('make' in car); // true
```

2. Object vs Map

在js中，Object和Map很相似，都是`key-value`结构的。但有不同

| \ | Map | Object |
|--|--|--|
|**初始键**|无|有，可以用Object.create(null)设置为无|
|**键的类型**|任意|必须是String或Symbol|
|**键的排序**|按插入的顺序|无|
|**迭代**|可直接迭代|不可直接迭代|
|{} 初始化|不能创建Map|可以创建Object|
|获取大小|使用`size`属性|手动获取|
|性能|更适合频繁的插入/删除|没有优化|

可见，两者之间仍有较大的差异。

[来源](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)