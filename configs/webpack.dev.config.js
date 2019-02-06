module.exports = require('./webpack.config.js')({
	mode: 'development',
	/* devtool: maps the compiled code back to your original source code to make easier to track errors and warnings */
	devtool: 'eval-source-map',
})