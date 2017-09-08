/**
 * Created by 贺小雷 on 2017-09-08.
 */
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const rimraf = require('rimraf');

rimraf('dist', function(err){
	console.log('start compiling code...')
	webpack(webpackConfig,  function (err, stats) {
		if (err) throw err;
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n\n');
	});
});