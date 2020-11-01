const path = require('path');

module.exports = {
	entry: ['./src/client/client.js'],
	output: {
			publicPath: '/',
			path: path.join(__dirname, 'src/public'),
			filename: 'client.js'
	},
	devtool: 'eval',
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: /src/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
							localsConvention: 'camelCase',
						}
					},
					'postcss-loader',
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'url-loader?limit=8192',
					'img-loader'
				]
			},
			{
				test: /\.(eot|svg|woff(2)?|ttf)(\?[a-z0-9=&.]+)?$/,
				use: 'file-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
