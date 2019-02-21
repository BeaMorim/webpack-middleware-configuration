const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compression = require('compression');

module.exports = function addDevMiddlewarees(app, webpackConfig) {

  /* The imported webpack function is fed a webpack Configuration Object and runs the webpack compiler if a callback function is provided (.run) */
  const compiler = webpack(webpackConfig);

  const middleware = webpackDevMiddleware(compiler, {
    /* Display no info to console (only warnings and errors) */
    noInfo: true, 

    /* The public path that the middleware is bound to. Best Practice: use the same publicPath defined in your webpack config */
    publicPath: webpackConfig.output.publicPath, 

    /* Options for formatting statistics displayed during and after compile */
    stats: 'normal', 
  });

  app.use(compression());

  /* 
  * To setup your middleware, you can invoke app.use(middleware) for every middleware layer that you want 
  * to add (it can be generic to all paths, or triggered only on specific path(s) your server handles), 
  * and it will add onto your Express middleware stack.
  */
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  const fs = middleware.fileSystem;

  /* 
  * app.get() is part of Express' application routing and is intended for matching and 
  * handling a specific route when requested with the GET HTTP verb 
  */
  app.get('*', (req, res) => {

    /* path.join(): Join all arguments together and normalize the resulting path */
    /* fs.readFile(): Asynchronously reads the entire contents of a file */
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
