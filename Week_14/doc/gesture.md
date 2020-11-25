# 手势

## 基本状态

![gesture](../img/gesture.png)

## 鼠标和触控

* **鼠标拖拽**

    在 `mousedown` (拖拽开始) 的监听事件中，监听 `mousemove` (拖拽执行), `mouseup` (拖拽终止)

    ```javascript
    el_1.addEventListener('mousedown', event => {
        const move = event => {
            // main action
            console.log(event.clientX, event.clientY);
        }

        const up = event => {
            // remove listeners
            el_2.removeEventListener('mousemove', move);
            el_2.removeEventListener('mouseup', up);
        }

        el_2.addEventListener('mousemove', move);
        el_2.addEventListener('mouseup', up);
    })
    ```

    通常，`el_1` 是拖拽对象所对应的 HTML 元素， `el_2`是全局: `document`. 这是为了保证拖拽不被意外中断

* **触摸拖拽**

    分别监听四类事件：

    * touchstart
    * touchmove
    * touchend
    * touchcancel: 异常终止

    事件有 `changedTouches` 属性，返回`TouchList` (支持多点触控)。

    `TouchList`中的每个 touch 有 identifier，用来跟踪一个点的拖动

这两种操作监听所得的事件，都能获得坐标（clientX, clientY)，因此，这**两种拖动事件**能用**一种逻辑**进行编写。

```
const down = point => {
    console.log('down', point.clientX, point.clientY);
}

const move = point => {
    console.log('move', point.clientX, point.clientY);
}

const up = point => {
    console.log('up', point.clientX, point.clientY);
}

const cancel = point => {
    console.log('cancel', point.clientX, point.clientY);
}
```
