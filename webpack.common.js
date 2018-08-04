const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app:'./src/index.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            // filename: "index.html",
            // template: "index.html"
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};