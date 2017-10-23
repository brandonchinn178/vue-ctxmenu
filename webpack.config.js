var path = require('path');

module.exports = {
    entry: path.resolve('lib/index.js'),
    output: {
        path: path.resolve('dist'),
        filename: 'context-menu.js',
    },
    resolve: {
        modules: [
            path.resolve('lib'),
            path.resolve('node_modules'),
        ],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
};
