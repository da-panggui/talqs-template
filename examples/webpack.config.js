const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {

  devtool: 'inline-source-map',

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },
  resolve: {
    alias: {
      talqsTemplate: path.resolve(__dirname, '../build/dev-entry')
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: ['babel-loader', 'eslint-loader'] },
      { test: /\.less$/, loader: [ 'style-loader', 'less-loader' ] }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

}