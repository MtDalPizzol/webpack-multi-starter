const path = require('path');
const webpack = require('webpack');

var config = {

  entry: {

    'desktop/index': './js/desktop/index.js',
    'desktop/post': './js/desktop/post.js',
    'desktop/vendor': [
      'jquery'
    ],

    'mobile/index': './js/mobile/index.js',
    'mobile/vendor': [
      'jquery'
    ]

  },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk.[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    alias: {
      'plugin-1': path.resolve(__dirname, 'js/plugins/plugin-1.js'),
      'plugin-2': path.resolve(__dirname, 'js/plugins/plugin-2.js'),
      'plugin-3': path.resolve(__dirname, 'js/plugins/plugin-3.js')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', { modules: false }]],
              plugins: ['syntax-dynamic-import']
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['desktop/common', 'desktop/vendor'],
      chunks: ['desktop/common', 'desktop/index', 'desktop/post'],
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['mobile/common', 'mobile/vendor'],
      chunks: ['mobile/common', 'mobile/index'],
      minChunks: 2
    })
  ]

};

module.exports = config;
