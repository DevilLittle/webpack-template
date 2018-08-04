const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        //Tree-Sharking:能够删除未引用代码的压缩工具UglifyJSPlugin
        new UglifyJSPlugin({
            sourceMap: true
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

});