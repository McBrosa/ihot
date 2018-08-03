const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: "./src/client/js/index.js",
    // app: './src/index.js',
    'production-dependencies': ['phaser', 'socket.io'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'dist',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'production-dependencies',
      filename: 'production-dependencies.js',
    },
  },

  resolve: {
    modules: ['node_modules'],
  },

  externals: ["fs", "uws"],

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          }
        }
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(path.join(__dirname, 'src/client/html/index.html')),
        to: path.resolve(__dirname, 'dist')
      },
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),
  ]
}