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
