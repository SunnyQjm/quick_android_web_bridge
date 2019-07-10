const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: "quick_android_web_bridge.bundle.js",
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        globalObject: "this",
    }
};
