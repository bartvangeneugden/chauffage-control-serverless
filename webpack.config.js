var webpack = require('webpack');
var path = require('path');
var appconfig = require('./src/config/');

var BUILD_DIR = path.resolve(__dirname, 'src/frontend/build');
var APP_DIR = path.resolve(__dirname, 'src/frontend/app');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "CONFIG": JSON.stringify(appconfig)
        })
    ]
};

module.exports = config;
