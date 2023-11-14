const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
    mode : 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname,'src'),
    entry: [ './style.css', './style2.css'],
    output:{
        path: path.resolve(__dirname,'public'),
    },
    module:{
        rules: [
    {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader', 'postcss-loader'
        ]
    },
    ]
    },
    plugins:[

        new htmlWebpackPlugin({
            filename: './../views/index.html',
            template: 'index.html',
            minify: true
        }),
        new htmlWebpackPlugin({
            filename: './../views/contacto.html',
            template: 'contacto.html',
            minify: true
        }),
        new htmlWebpackPlugin({
            filename: './../views/menu.html',
            template: 'menu.html',
            minify: true
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new MiniCssExtractPlugin({
            filename: 'style2.css'
        })
    ]
}