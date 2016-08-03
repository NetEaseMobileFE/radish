var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Init configs
var publishConfig = global.publish || {};
var revision = publishConfig.revision ? publishConfig.revision + '/' : '';
var hash = publishConfig.hash ? '.[chunkhash]' : '';
var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
var publicPath = publishConfig.assetPath || '/utf8/apps/' + packageJson.name + '/';
module.exports = {
  devtool: 'source-map-hidden',
  entry: {
    app: './src/js/index',
    vendor: Object.keys(packageJson.dependencies),
    webpackBootstrap: [] // Extract the webpackBootstrap from chunks
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.[chunkhash].js',
    chunkFilename: 'js/[id].bundle.[chunkhash].js',
    publicPath: publicPath
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
  	new ExtractTextPlugin('css/app.[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'webpackBootstrap'],
      filename: 'js/[name].[chunkhash].js',
      minChunks: Infinity
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src/js')
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1!postcss'),
        include: path.join(__dirname, 'src/css')
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1!postcss!sass'),
        include: path.join(__dirname, 'src/css')
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1!postcss!less'),
        include: path.join(__dirname, 'src/css')
      }, {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1!postcss!stylus'),
        include: path.join(__dirname, 'src/css')
      }, {
        test: /\.png|jpe?g|gif$/,
        loader: "url-loader?limit=5000&name=img/[hash].[ext]",
        include: path.join(__dirname, 'src/img')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      js: path.join(__dirname, "src/js")
    }
  },
  postcss: function() {
    return [
      require('postcss-original-path'),
      require('postcss-assets')({
        loadPaths: ['./src/img/'],
        relative: true
      }),
      require("postcss-cssnext")({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'not ie <= 8']
      }),
      require('postcss-sprites')({
        stylesheetPath: './src/css',
        spritePath: './src/img/sprite.png',
        outputDimensions: true,
        skipPrefix: true,
        filterBy: function(img) {
          return /\/sp\-/.test(img.url);
        },
        groupBy: function(img) {
          var match = img.url.match(/\/(sp\-[^\/]+)\//);
          return match ? match[1] : null;
        }
      })
    ];
  }
};
