# Proxy 和 双向绑定

## Proxy

Proxy 可以代理一个对象，从而拦截和重新定义被代理对象的基本操作，比如get, set, constructor， 等等（见[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)）。

### 基本操作
```javascript
let obj = {
    a: 1,
    b: 2
};

function reactive(obj) {
    const handler = {
        get(obj, prop){ 
            return obj[prop];
        },
        set(obj, prop, val){
            obj[prop] = val;
            return obj[prop];
        }
    }

    return new Proxy(obj, handler);
}
let po = reactive(obj);
po.a = 3;
console.log(po.a);
```

需要注意的是，传入`reactive`函数是`obj`的引用， 不是`obj`的复制。在函数内对`obj`的操作会**直接影响**`obj`。
而，string, number, boolean,传入函数的它的值。函数**不会影响**其值。

### 双向绑定

有了Proxy，我们可以将不可Observable的js对象变成响应式对象，来实现双向监听。

例如： 
```javascript
let target = {
    a: 0,
};
let po = reactive(target);

// two-way bind
effect(() => {
    document.getElementById("a").value  = po.a;
});
document.getElementById("a").addEventListener("input", event => po.a = event.target.value);
```
`po`是target响应式对象， `effect`将js对象的值传给DOM，`addEventListener`将DOM的值传给js对象。

#### [实例分析](proxy.html)

这次视频学习实例中，老师创建了`reactive`和`effect`函数来实现双向绑定。

`effect`函数做了两件事：
* 初始化DOM元素：通过直接执行回调函数，初始化了所对应的DOM元素
* 储存回调函数：读取**已经执行过的Reactivity**（调用过reactive的get），以此（**Object.prop**）为key，回调函数为value，保存在Map里（全局变量）。这是为了避免reactive的set执行不必要的回调函数。

可见，所有的`effect`函数是为双向绑定做准备。

`reactive`函数使用返回了响应式对象。它创建的Proxy改写了`get`和`set`函数。
* `get`： 记录**执行过的Reactivity**（保存它的object和prop），返回`object[prop]`
* `set`:  1.设置Object.prop的值。2.执行**Object.prop**的回调函数，设置所对应的DOM元素的值 

可见，reactive的set实现了双向绑定。