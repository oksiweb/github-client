const path = require('path');

module.exports = {
    //input
    entry: './src',
    //output
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    //transformations
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'es2015', 'es2016', 'es2017', 'stage-0'],
                    plugins: [
                        ['transform-react-jsx', { pragma:'h' }]
                    ]
                }
            },
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    // source map
    devtool: 'source-map',

    //server
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        historyApiFallback: true
    }

}