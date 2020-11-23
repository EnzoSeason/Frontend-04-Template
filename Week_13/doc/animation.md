# Animation
## 帧

一般软件，60帧

## 实现动画

* `setInterval`

    ```javascript
    setInterval(() => {}, 16);
    ```
    16ms * 60 = 960ms < 1000ms, 所以间隔设置为16ms

* `setTimeout`

    每16ms，调用一次本身
    ```javascript
    let tick = () => {
        setTimeout(tick, 16);
    }
    ```
    更现代的浏览器支持
    ```javascript
    let tick = () => {
        requestAnimationFrame(tick)
    }
    ```
    会根据浏览器的帧率`setTimeout`, 推荐使用

## Timeline

使用Timeline控制动画, Timeline有以下几个方法：

* `start`

* `pause`

* `resume`

* `reset`

* `get rate(), set rate()`

### 私有化`tick`

为了使`tick`无法被外界访问（private），使用`Symbol`来作为key

```javascript
const TICK = Symbol('tick');

export class Timeline {
    constructor() {
        this[TICK] = () => {
            requestAnimationFrame(this[TICK]);
        }
    }
}
```

这样，外界就无法访问`TICK`。因为每个Symbol都是唯一的，即使都叫tick

最基础的Timeline：

```javascript
const TICK = Symbol('tick');

export class Timeline {
    constructor() {
        this[TICK] = () => {
            requestAnimationFrame(this[TICK]);
        }
    }

    start() {
        this[TICK]();
    }
}
```

## Animation

我们通过**属性**来实现动画，所以Animation类需要 `object`, `property`.

属性由以下参数控制：

* start value
* end value
* duration: 动画时长
* timing function

Animation类由以下几个方法：

* `receive(time)`:

    根据接受到的**时间**，改变属性`this.object[this.property]`

## 在Timeline中注册Animation

Timeline类中有个私有属性，`this[ANIMATION]`.

通过使用`add(animation)`, 注册animation

```javascript
const ANIMATION = Symbol('animation');

export class Timeline {
    constructor() {
        this[ANIMATION] = new Set();
    }
    add(animation) {
        this[ANIMATION].add(animation);
    }
}
```

在`start()`中，运行所有注册的animations

```javascript

export class Timeline {
    start() {
        // set start time
        const startTime = Date.now();
        
        this[TICK] = () => {
            // calculate the passed time of animation
            const t = Date.now() - startTime;
            for (let animation of this[ANIMATION]) {
                if (animation.duration > t) {
                    // animation receives time, update property
                    animation.receive(t); 
                } else {
                    // delete expired animation
                    this[ANIMATION].delete(animation);
                }
            }
            // ask for next frame
            requestAnimationFrame(this[TICK]);
        }
        // run
        this[TICK]();
    }
}
```
