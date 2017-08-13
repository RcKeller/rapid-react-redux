
module.exports = ({ isProduction = false } = {}) => {
  const paths = require('./paths')({ isProduction})
  //  Add hot-reloading and quality-of-life babel presets/plugins in development
  let babel = {
    loader: 'babel-loader',
    options: {
      presets: ['es2015', 'react', 'stage-0'],
      plugins: ['transform-decorators-legacy']
    }
  }
  if (!isProduction) {
    babel.options.presets = ['react-hmre', ...babel.options.presets]
    babel.options.plugins.push([
      'transform-react-remove-prop-types',
      'transform-react-constant-elements',
      'transform-react-inline-elements'
    ])
  }

  const JS = {
    test: /\.js$|\.jsx$/,
    use: [
      { loader: 'react-hot-loader' },
      babel
    ],
    exclude: /node_modules/
  }
  const SASS = {
    test: /\.scss$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [paths.modules]
        }
      }
    ],
    include: [paths.app, paths.modules]
  }
  const CSS = {
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' }
    ]
  }

  return [JS, SASS, CSS]

}
