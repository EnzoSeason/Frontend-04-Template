# Selectors

[MDN CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

## 简单选择器 (Basic selectors)

* Universal selector: `*`
* Type selector: `div svg | a`
* Class selector: `.cls`
* ID selector: `#id`
* Attribute selector: `[attr=value]`

## Pseudo

* 伪类：`:hover`
* 伪元素：`::before`

## 复合选择器 

* <简单选择器><简单选择器><简单选择器>
    * `*`或者`div`写在最前面
    * 伪类，伪元素写在最后面

## 复杂选择器 (Combinators)

* Descendant combinator: (not direct)
    
    The   (space) combinator selects nodes that are descendants of the first element.
    
    <复合选择器> `<sp>` <复合选择器>
* Child combinator: (direct)

    The `>` combinator selects nodes that are **direct children** of the first element.
    
    <复合选择器> `>` <复合选择器>

* General sibling combinator: (not direct)

    The `~` combinator selects siblings. This means that the second element follows the first (though not necessarily immediately), and both share the same parent.

    <复合选择器> `~` <复合选择器>

* Adjacent sibling combinator: (direct)

    The `+` combinator selects adjacent siblings. This means that the second element directly follows the first, and both share the same parent.

    <复合选择器> `+` <复合选择器>


