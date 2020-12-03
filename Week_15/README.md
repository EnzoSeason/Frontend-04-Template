# Carousel Component

## Carousel

[code](./jsx/containers/Carousel.js)

### Attributes

* currentIdx：当前显示的图片索引

* timeline：控制动画的时间线

* autoplayHandler：轮播控制器 (setInterval / clearInterval)

* intervalDuration: 轮播间隔

* animationDuration： 动画时长

* animationDX, animationTime:

    当图片在滚动时，用户**按下（tap）**，此刻，动画造成的 `tranform` 已经作用在 CSS 上。因此，需要计算动画造成的位移来弥补这个误差。

    ```javascript
    if (Date.now() - this.animationTime < this.animationDuration) { // while the image is moving
        this.animationDX = ease(progress) * vw - vw ; 
    } else {
        this.animationDX = 0;
    }
    ```

### Methods

* render

    1. 挂载图片
    
    2. 启动手势：tap start, pan move, all end (tap, press, pan end)

    3. 启动时间线（timeline），设置轮播控制器（autoplayHandler）

* enableTapStart

    当用户按下（tap）时：

    1. 暂停： timeline
    2. 删除： autoplayHandler
    3. 计算： 轮播自动移动图片的距离（误差）

* enablePanMove

    当用户拖动图片：

    1. 计算： 拖动距离（x），当前显示的图片索引（currentIdx）
    2. 更新： 根据拖动距离（x）， 移动**当前**显示的图片，**及其两侧(2张 或 4张)** 图片的位置

* enableAllEnd

    1. 重置：新的 timeline (reset & start)
    2. 创建：新的 autoplayHandler
    3. 计算：下一张图片的相对位置，在当前图片的左边（-1），还是右边（+1）
    4. 更新：根据相对位置，给**当前**显示的图片，**及其两侧(2张 或 4张)** 图片设置移动的动画， 并添加到时间线
    5. 更新：当前显示的图片索引（currentIdx）

* autoPlay

    设置轮播控制器（autoplayHandler）

    1. 设置： 循环播放（setInterval 或 嵌套的 setTimeout）
    2. 设置： 给**当前（currentIdx）** 图片及其**右侧相邻（nextIdx）** 设置移动的动画，并添加到时间线
    3. 更新：当前显示的图片索引（currentIdx）

## state, props (attributes) 设置

* state， props

    在 Component 中设置

* private 设置

    利用 Symbol， 设置 private 的类属性