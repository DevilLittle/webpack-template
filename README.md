#### webpack实践:创建最完整的webpack模板

##### 一、基础框架搭建
```
mkdir folder && cd folder
npm init -y
npm install webpack --save-dev
```
创建项目框架：
|- package.json
|- index.html
|- /src
   |-index.css

##### 二、深入webpack

* 使用webpack-dev-server
1、基本配置
安装：
```
npm install --save-dev webpack-dev-server
```
webpack.config.js
```
const path = require('path');

module.exports = {
    entry:'./src/index.js',
    devServer: {
        //配置可供webpack-dev-server访问的文件路径
        contentBase:'./dist'
     },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname,'dist')
    }
};
```
package.json添加脚本命令:
```
"start": "webpack-dev-server --open"
```
2、生成html模板
```
npm install --save-dev html-webpack-plugin
```
webpack.config.js
```
const htmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
        new htmlWebpackPlugin(),
        new htmlWebpackPlugin({
            filename:"index.html",
            template:"index.html"
        })
    ],
```
Tips:使用了htmlWebpackPlugin后，在入口html文件中不用再手动引入dist下的main.js

3、webpack-dev-server扩展
现在只能在localhost访问，为了能用IP访问，对webpack-dev-server做以下配置：
```
"start": "webpack-dev-server --open --host 0.0.0.0"
```
--open表示npm run start以后自动在浏览器打开，所以每次会有弹出的浏览框，以后不需要可以去掉