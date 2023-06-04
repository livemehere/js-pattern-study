const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    entry: {
        bundle: './src/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin(),
    ],
    /* 페이지 단위 번들파일 생성 */
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    },
    devServer: {
        hot:true
    }

}