const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const webpack = require('webpack');

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        compress: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new webpack.DefinePlugin({'process.env': {}}),

    ],
    module: {
        rules: [
            {
                test: /\.hbs$/i,
                use: [
                    {
                        loader: 'handlebars-loader',
                        options: {
                            precompileOptions: {
                                knownHelpersOnly: false,
                            }
                        },
                    }
                ]
            },
            {
                test: /\.(ts|tsx)$/i,
                exclude: ['/node_modules/'],
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // configFile: path.resolve(__dirname, 'tsconfig.json'),
                            transpileOnly: true,
                          },
                    },
                ],
            },
            {
                test: /\.(le|c)ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            fs: false,
        }
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
