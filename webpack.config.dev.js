var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
  devtool: '#cheap-module-eval-source-map',
	entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client',
		'./src/js/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/bundle.js',
		chunkFilename: 'js/[id].bundle.js',
		publicPath: '/static/',
		pathinfo: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			DEBUG: true
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				loaders: ['babel'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!postcss',
				include: path.join(__dirname, 'src/css')
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!postcss!sass-loader',
				include: path.join(__dirname, 'src/css')
			},
			{
				test: /\.png|jpe?g|gif$/,
				loader: "url-loader?limit=1",
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
				browsers: ["> 1%", "last 2 version", "Android >= 4.0"]
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
