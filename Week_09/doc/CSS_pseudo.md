# Pseudo

## Pseudo Class

[link](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

* 链接/行为 
    * :any-link
    * :link :visited 
    * :hover
    * :active
    * :focus
    * :target

* 树结构
    * :empty
    * :nth-child()
    * :nth-last-child()
    * :first-child :last-child :only-child

    这些伪类违反的CSS计算的原则，既计算CSS时，我们不知道节点元素的子节点的CSS。会影响性能

* 逻辑型
    * :not伪类
    * :where :has


## Pseudo elements

[link](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)

* ::before
* ::after
* ::first-line
* ::first-letter

first-line, first-letter 可以设置字体

first-letter可以设置layout，first-line不可以
