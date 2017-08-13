const path = require('path')
const CWD = process.cwd()

module.exports = ({ isProduction = false } = {}) => {
  return {
    app: path.resolve(CWD, 'src'),
    public: path.resolve(CWD, 'public'),
    bundle: path.resolve(CWD, 'public', 'js'),
    modules: path.resolve(CWD, 'node_modules'),
    //  Route entry point to webpack-dev-server in development
    //  (PATHS can be resolved in array format)
    entry: isProduction
      ? [path.resolve(CWD, 'src', 'index.js')]
      : [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        path.resolve(CWD, 'src', 'index.js')
      ]
  }
}
