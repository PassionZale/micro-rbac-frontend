var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var pathsToClean = ['dist']

var envs = require("./src/utils/env")

module.exports = {
  entry: {
    "main": "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash:5].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['commons'],
      filename: '[name].js'
    }),
    new HtmlWebpackPlugin({
      chunks: ['main', 'commons'],
      inject: 'body',
      hash: true,
      title: 'micro-rbac-frontend',
      env: envs.ENV,
      filename: 'index.html',
      template: 'index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: 'static'
      }
    ])
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  externals: {
    "axios": "axios",
    "dayjs": "dayjs",
    "iview": "iview",
    "blueimp-md5": "md5",
    "vue": "Vue",
    "vue-router": "VueRouter",
    "vuex": "Vuex"
  },
  devServer: {
    host: envs.WEBPACK_DEV_SERVER_HOST,
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    port: envs.WEBPACK_DEV_SERVER_PORT,
    proxy: {
      [`${envs.BASE_URL}/*`]: {
        target: envs.WEBPACK_DEV_SERVER_PROXY_TARGET,
        pathRewrite: {
          [`^${envs.BASE_URL}`]: ""
        }
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"' + process.env.NODE_ENV + '"'
    }
  })
])

if (process.env.NODE_ENV !== 'development') {
  module.exports.devtool = false;
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
