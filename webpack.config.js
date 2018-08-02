const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devServer:{
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