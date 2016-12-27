module.exports = {
    entry: {
        reactSiema: './src/reactSiema',
    },
    output: {
        filename: '[name].js',
        path: './dist'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel'
            }
        ]
    }
};
