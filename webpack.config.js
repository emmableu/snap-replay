const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: __dirname + "/src/index.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "index_bundle.js"//打包后输出文件的文件名
    },
    devtool: process.env.NODE_ENV === 'production' ? 'eval-source-map' : 'eval',
    devServer: {
        static: {
            directory: __dirname + "/static",
            staticOptions: {},
            // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
            // Can be:
            // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
            publicPath: "/static/",
            // Can be:
            // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
            serveIndex: true,
            // Can be:
            // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
            watch: true,
        },
        port: 3000
    },
    module: {
        rules: [
            {
                test: /(\.tsx|\.ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: { presets: ['@babel/preset-env','@babel/preset-react'] },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static', to: 'static'}
            ]
        }),
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    resolve: {
        extensions: [ '.ts', '.js', '.tsx', '.jsx'],
        // fallback: {
            // "stream": require.resolve("stream-browserify"),
            // "buffer": require.resolve("buffer")
        // }
    },
};
