# Carousel Component

## Carousel

### Attributes

* currentIdx：当前显示的图片索引

* timeline：控制动画的时间线

* animationHandler：轮播控制器 (setInterval / clearInterval)

* intervalDuration: 轮播间隔

* animationDuration： 动画时长

* animationTime：动画发生的时间点

* animationDX：暂停动画期间，轮播自动移动图片的距离（误差）

### Methods

* render

    1. 挂载图片
    
    2. 启动手势：tap start, pan move, all end (tap, press, pan end)

    3. 启动时间线（timeline），设置轮播控制器（animationHandler）

* enableTapStart

    当用户按下（tap）时：

    1. 暂停： timeline
    2. 删除： animationHandler
    3. 计算： 轮播自动移动图片的距离（误差）

* enablePanMove

    当用户拖动图片：

    1. 计算： 拖动距离（x），当前显示的图片索引（currentIdx）
    2. 更新： 根据拖动距离（x）， 移动**当前**显示的图片，**及其两侧(2张 或 4张)** 图片的位置

* enableAllEnd

    1. 重置：新的 timeline (reset & start)
    2. 创建：新的 animationHandler
    3. 计算：下一张图片的相对位置，在当前图片的左边（-1），还是右边（+1）
    4. 更新：根据相对位置，给**当前**显示的图片，**及其两侧(2张 或 4张)** 图片设置移动的动画， 并添加到时间线
    5. 更新：当前显示的图片索引（currentIdx）

* autoPlay

    设置轮播控制器（animationHandler）

    1. 设置： 循环播放（setInterval 或 嵌套的 setTimeout）
    2. 设置： 给**当前（currentIdx）** 图片及其**右侧相邻（nextIdx）** 设置移动的动画，并添加到时间线
    3. 更新：当前显示的图片索引（currentIdx）