const path = require('path');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.resolve(__dirname + '/src/public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-react',
                            {
                                runtime: 'automatic' // crea automaticamente el import React from'react' cuando sea necesario
                            }
                        ]
                    ]
                }
            }
        ]
    }
};