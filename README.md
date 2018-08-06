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

##### 二、深入webpack功能

* 搭建web服务器 webpack-dev-server

webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。  
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
--open表示npm run start以后自动在浏览器打开，所以每次会有弹出的浏览框，以后不需要可以去掉。

* source map

当webpack打包源文件时，可能很难追踪到错误和警告在源代码中的位置。如果将多个文件都打包到一个bundle(bundle.js)中，
而其中一个源文件包含错误，那么堆栈跟踪会简单的指向bundle.js。但是这对我们调试来说并没有太多帮助，因为不知道错误来
自哪个源文件。

为了更容易的追踪错误和警告，Javascript提供了了source map功能，将编译后的代码映射回原始源代码，source map会明确的
告诉你错误在哪个文件。

* HMR

模块热替换(HMR)是webpack提供的最有用的功能之一，它允许在运行时更新各种模块，而无需进行完全刷新。
```
devServer: {
    contentBase: './dist',
    hot: true
    },

new webpack.NamedModulesPlugin(),
new webpack.HotModuleReplacementPlugin()
```

使用NamedModulesPlugin，可以更方便的查看要修补的依赖；

* tree sharking

在webpack中，tree sharking指的就是按需加载，即没有被引用的模块不会被打包进来，减少包的大小，缩小应用的加载时间，呈现
给用户更佳的体验。

它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。

* 生产环境构建

由于开发环境和生产环境的构建目标差异很大，所以我们需要分开配置：
1、开发环境：我们需要强大的、具有实时重新加载或模块热替换能力的source map 和localhost server；
2、生产环境：目标是更小的bundle，更轻量的source map，以及更优化的资源，以改善加载时间。

我们保留一个通用配置，开发环境和生产环境分开配置，使用webpack-merge工具，将这些配置合在一起。

```
//定义start为开发环境脚本
"start": "webpack-dev-server --open --host 0.0.0.0 --config webpack.dev.js",
//定义build为生产环境脚本
"build": "webpack --config webpack.prod.js"
```

* 代码分离
代码分离能够把代码分离到不同的bundle，然后按需加载或并行加载这些文件。代码分离可以用于获取更小的bundle，以及控制资源优先
加载，如果使用合理，会极大的影响加载时间。

有三种常用的代码分离方法：
1、入口起点：使用 entry 配置手动地分离代码。
2、防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
3、动态导入：通过模块的内联函数调用来分离代码。