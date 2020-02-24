const HtmlWebpackPlugin = require('html-webpack-plugin'); // Installed via npm
const webpack = require('webpack'); // To access built-in plugins
const path = require('path');

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  public: path.join(__dirname, 'public')
};

const HOST = process.env.HOST;

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  // Or pass it as a CLI argument: webpack --mode=production
  target: 'web', // Default
  entry: {
    main: path.join(paths.src, 'index.js')
  },
  output: {
    path: path.resolve(paths.dist),
    filename: '[name].js',
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      { // webpack --module-bind 'css=style-loader!css-loader'
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true // Enable CSS Modules
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.src,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: ["env"],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: false
        },
      }
    ]
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000
  },
  devtool: "source-map",
  serve: {
    host: HOST,
    port: 3000,
    content: paths.dist,
    logLevel: 'debug'
  },
  stats: "verbose",
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(paths.src, 'template.html')
    })
  ],
  node: {
    fs: "empty"
  }
};

