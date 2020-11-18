# Carousel

## run

```command
webpack serve
```

## 准备

1. 基于 [main-v2.js](../jsx/main-v2.js), 将 Wrapper 和它的子类放到  [framework.js](../jsx/framework.js).

2. 图片排版：

    图片需要横向排版

    ```css
    .carousel { /* viewport of Carousel */
        width: 500px;
        height: 280px;
        overflow: hidden; /* hide rest of images*/
        white-space: nowrap; /* horizontal layout */
    }
    .carousel>div { /* image in Carousel */
        width: 500px;
        height: 280px;
        display: inline-block;
        background-size: contain; /* Scales the image as large as possible */
        transition: ease 0.5s; /* ease is the common transition in practice*/
    }
    ```

## 轮播

Carousel类主要做3件事：

* 创建`div`, 作为轮播的视图区域
* 记录attributes: 保存图片的路径
* 渲染：控制轮播的CSS

## 自动播放

```javascript
autoPlay() {
    let currentIdx = 0;
    setInterval(() => {
        let children = this.root.children;
        // get current img and next img
        let nextIdx = (currentIdx + 1) % children.length;
        let current = children[currentIdx];
        let next = children[nextIdx];
        // prepare for the position of next img
        next.style.transition = 'none';
        next.style.transform = `translateX(${100 - nextIdx * 100}%)`; // move to the right of current img
        // move to next img
        setTimeout(()=>{
            next.style.transition = '';
            current.style.transform = `translateX(${- 100 - currentIdx * 100}%)`;
            next.style.transform = `translateX(${- nextIdx * 100}%)`;
            currentIdx = nextIdx;
        }, 16); // 16ms is the time for a frame in browser
    }, 3000);
}
```

## 鼠标拖动

事件监听：

```javascript
mouseControl() {
    this.root.addEventListener('mousedown', event => {
        let move = event => {};
        let up = event => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener('mouseup', up);
        }

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    });
}
```

轮播事件监听：

```javascript
mouseControl() {
    this.root.addEventListener('mousedown', event => {
        let children = this.root.children;
        // start coordinate within the application's viewport 
        // at which the event occurred 
        let startX = event.clientX;

        let move = event => {
            let vw = this.root.getBoundingClientRect()['width'];
            let x = event.clientX - startX;
            let currentIdx = this.currentIdx - (x - (x % vw) )/ vw; // round down

            // move images, the tail is connected to the head
            // only move the images next to the current one
            for (let offset of [-1, 0, 1]) { 
                let nextIdx = currentIdx + offset;
                nextIdx = (nextIdx + children.length) % children.length;
                
                children[nextIdx].style.transition = 'none';
                children[nextIdx].style.transform = `translateX(${ - (nextIdx - offset) * vw + x % vw}px)`;
            }
        };

        let up = event => {
            let vw = this.root.getBoundingClientRect()['width'];
            let x = event.clientX - startX;
            let currentIdx = this.currentIdx - Math.round(x / vw); // to the nearest whole number
            
            const next = Math.sign(x - Math.round(x / vw) - vw / 2 * Math.sign(x));
            for (let offset of [0, next]) {
                let nextIdx = currentIdx + offset;
                nextIdx = (nextIdx + children.length) % children.length;
                
                children[nextIdx].style.transition = '';
                children[nextIdx].style.transform = `translateX(${ - (nextIdx - offset) * vw}px)`;
            }

            this.currentIdx = (currentIdx + children.length) % children.length;
            
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
        }

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    });
}
```
