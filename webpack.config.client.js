//CommonJS module require
const path = require('path')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack'); 
const HTMLWebpackPlugin = require('html-webpack-plugin');
//only expose environment variables that are explicitly referenced in your code to your final bundle
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "browser",
    devtool: 'eval-source-map',
    entry: path.join(CURRENT_WORKING_DIR, 'client', 'main.tsx'),
    output: {
        path: path.join(CURRENT_WORKING_DIR ,'dist','js'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: { 
        static: path.join(CURRENT_WORKING_DIR ,'dist'),
        hot: true,
    },
    module: {
        rules: [
            // `.ts` or `.tsx` are parsed using `ts-loader`
            {
                test: /\.(ts|tsx)?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            },
            // `js` and `jsx` files are parsed using `babel`
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: require.resolve('babel-loader'),
                    options: {
                      plugins: [require.resolve('react-refresh/babel')],
                    },
                  },
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png|ico)(\?[\s\S]+)?$/,
                use: [{
                    loader:'file-loader',
                        options: {
                            name:'[name].[ext]'
                        }
                    }],
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader'] //css-loader parse @import in CSS files. style-loader inject CSS into bundle DOM
            },
            {
                test: /\.(js|jsx)?$/,
                include: path.join(CURRENT_WORKING_DIR, 'node_modules', 'react-typed'),
                use: [{
                    loader:'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }]
            },
        ],
    },  
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(CURRENT_WORKING_DIR, 'client', 'index.html')
        }),
        // new webpack.HotModuleReplacementPlugin(), //Enables HMR for on the fly CSS/JS exchange
        new webpack.NoEmitOnErrorsPlugin(),
        new ReactRefreshWebpackPlugin(),
        new Dotenv()
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],       
    }
}

module.exports = config
