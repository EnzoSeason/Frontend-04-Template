# Animation

1. `@keyframes` 定义动画

    ```css
    @keyframes kf {
        from{ background: red; },
        to{ background: yellow; }
    }

    @keyframes kf2 {
        0%{ top:0; transition: top ease; },
        50%{ top:30px; transition: top ease-in; },
        75%{ top:10px; transition: top ease-out; },
        100%{ top:0; transition: top linear; },
    }
    ```

2. `animation` 使用动画

    ```css
    div {
        animation: kf 5s infinite;
    }
    ```

    animation: [name] [duration] [timing-function] [delay] [iteration-count], [direction] 

## Transition

transition: [property] [duration] [timing-function] [delay]

## Timing function

cubic-bezier 

## Color

W3C uses HSL: Hue (色相), Saturation (纯度), Ligteness (亮度)

## Render (绘制)

* 几何图形

    * border
    * border-shadow
    * border-radius

* 文字

    * font
    * text-decoration


* 位图

    * backgroud-image