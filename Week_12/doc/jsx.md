# 为组件添加JSX

## set up

> webpack用来打包文件，babel用来转译不同版本的JS

1. `npm init`

2. `npm install -g webpack webpack-cli`

3. `npm install --save-dev webpack babel-loader`

4. `npm install --save-dev @babel/core @babel/preset-env`

5. `npm install --save-dev @babel/plugin-transform-react-jsx`

6. `npm install --save-dev webpack webpack-cli webpack-dev-server`

创建 [webpack.config.js](../jsx/webpack.config.js)

最后，运行: `webpack serve`

## 理解JSX

### Version 1：只用HTML元素

[main basic](../jsx/main-basic.js)

使用DOM API，创建`createElement`函数

利用递归（调用appendChild），搭建DOM树

### Version 2: 自定义元素

[main](../jsx/main-v2.js)

基于Version 1，创建`Wrapper`, 代理 DOM API。

优点|缺点
---|---
可以自定义元素|每次递归（调用appendChild）都要从叶子节点开始，重建DOM树，性能一般
