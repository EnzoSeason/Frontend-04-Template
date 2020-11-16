# 为组件添加JSX

## set up

1. `npm init`

2. `npm install -g webpack webpack-cli`

3. `npm install --save-dev webpack babel-loader`

4. `npm install --save-dev @babel/core @babel/preset-env`

5. `npm install --save-dev @babel/plugin-transform-react-jsx`

创建[webpack.config.js](../jsx/webpack.config.js)

webpack用来打包文件，babel用来转译不同版本的JS

## 理解JSX

* work space: [main.js](../jsx/main.js)
* result: [main.html](../jsx/dist/main.html)

### Version 1：只用HTML元素

[main basic](../jsx/main-basic.js)

使用DOM API，创建`createElement`函数

利用递归（调用appendChild），搭建DOM树

### Version 2: 自定义元素

[main](../jsx/main.js)

基于Version 1，创建`Wrapper`, 代理DOM API。

优点|缺点
---|---
可以自定义元素|每次递归（调用appendChild）都要从叶子节点开始，重建DOM树，性能一般
