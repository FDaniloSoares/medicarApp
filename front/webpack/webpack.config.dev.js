const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: 'angular-hot-reload-loader',
            options: {
              rootModule: './src/app/app.module#AppModule',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'style-loader', 'css-loader'],
      },

    ],

  },
  output: {
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    port: 3000,
    publicPath: 'http://localhost:3000/',
    hotOnly: true,
    historyApiFallback: true,
    open: true,
  },
});
