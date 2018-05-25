const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config.global.js');
const webpack = require('webpack');

webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: './src/app/index.html',
        inject: 'body',
        alwaysWriteToDisk: true
    })
);

webpackConfig.plugins.push(
    new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, '../../../dist/dev')
    })
);

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        appSettings: {
            REST_API_URL: JSON.stringify(
                process.env.FORELDREPENGESOKNAD_API_URL
            ),
            LOGIN_URL: JSON.stringify(process.env.LOGINSERVICE_URL)
        }
    })
);

module.exports = Object.assign(webpackConfig, {
    devtool: 'inline-source-map'
});
