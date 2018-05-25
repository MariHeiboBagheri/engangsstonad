const webpackConfig = require('./webpack.config.global.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: './src/app/index.html',
        inject: 'body'
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

webpackConfig.plugins.push(
    new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
            mangle: {
                keep_classnames: true,
                keep_fnames: true
            },
            compress: {
                keep_fnames: true,
                keep_classnames: true
            }
        }
    })
);

module.exports = webpackConfig;
