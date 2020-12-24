const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const path = require('path');
const webpack = require('webpack');

const IS_DEV = process.env.NODE_ENV !== 'prod';

module.exports = {
  entry: {
    polyfills: '/src/polyfills.ts',
    vendor: '/src/vendor.ts',
    app: path.join('/src', IS_DEV ? 'main.ts' : 'main.prod.ts'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript'],
            },
          },
          'angular2-template-loader',
          'angular-router-loader',
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.ts'] },
  output: {
    path: path.resolve(__dirname, '..', 'dist/'),
    publicPath: '/',
  },
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({}),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: 'Medicar',
      filename: 'index.html',
      favicon: path.resolve(__dirname, '..', 'public', 'favicon.ico'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '..', 'public', 'normalize.css'),
        },
      ],
    }),
    new HtmlWebpackTagsPlugin({ tags: ['normalize.css'], append: true }),
  ],
};
