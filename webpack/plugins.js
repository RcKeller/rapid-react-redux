const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = ({ isProduction = false } = {}) => {
  const paths = require('./paths')({ isProduction})
  //  Always clean out prior bundles
  let corePlugins = [
    new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
      root: paths.public,
      verbose: true,
      dry: false // true for simulation
    })
  ]

  //  Set env and uglify/extract text in production builds
  if (isProduction) {
    corePlugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compressor: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('../css/main.css')
    )
  }

  return corePlugins
}
