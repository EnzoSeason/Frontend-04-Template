# 学习笔记

## CSS general

[css_general](./doc/css_general.md)

* at-rules: 大致9个
    * @charset : https://www.w3.org/TR/css-syntax-3/
    * @import :https://www.w3.org/TR/css-cascade-4/
    * @media :https://www.w3.org/TR/css3-conditional/
    * @page : https://www.w3.org/TR/css-page-3/
    * @counter-style :https://www.w3.org/TR/css-counter-styles-3 
    * @keyframes :https://www.w3.org/TR/css-animations-1/
    * @fontface :https://www.w3.org/TR/css-fonts-3/
    * @supports :https://www.w3.org/TR/css3-conditional/
    * @namespace :https://www.w3.org/TR/css-namespaces-3/

* rules: 
    * Selector
        * https://www.w3.org/TR/selectors-3/
    * Key
        * Properties
        * Variables: https://www.w3.org/TR/css-variables/
            ```CSS
            :root {
                --main-color: #06c;
            }
            /* The rest of the CSS file */
            #foo h1 {
                color: var(--main-color);
            }
            ```
    * Value
        * https://www.w3.org/TR/css-values-4/

* 实验：爬取CSS标准， https://www.w3.org/TR/?tag=css