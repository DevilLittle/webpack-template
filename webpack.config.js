const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devServer:{
        //配置可供webpack-dev-server访问的文件路径
        contentBase:'./dist'
    },
    plugins: [
        // new htmlWebpackPlugin(),
        new htmlWebpackPlugin({
            filename:"index.html",
            template:"index.html"
        })
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};