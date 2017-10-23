var path = require('path');

module.exports = {
    entry: 'index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'app.js',
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
        },
        modules: [
            path.resolve('src'),
            path.resolve('node_modules'),
        ],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            'context-menu': require.resolve('vue-ctxmenu/loader'),
                        },
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
};
