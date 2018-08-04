const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',

    //source map跟踪错误和警告
    devtool: 'inline-source-map',

    devServer: {
        //配置可供webpack-dev-server访问的文件路径
        contentBase: './dist',

        //启动HMR
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // new htmlWebpackPlugin(),
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "index.html"
        }),

        //配置HMR
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },


    mode: "production"
};