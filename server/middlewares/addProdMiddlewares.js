const path = require('path');
const express = require('express');

/* 
* Returns the compression middleware using the given options 
* The middleware will attempt to compress response bodies for all request that traverse through the middleware
*/
const compression = require('compression');

module.exports = function addProdMiddlewares(app) {

  /* The process.cwd() method returns the current working directory of the Node.js process */
  const outputPath = path.resolve(process.cwd(), 'build');
  const publicPath = '/';

  app.use(compression());

  /* express.static(): It serves static files and is based on serve-static. */
  app.use(publicPath, express.static(outputPath));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(outputPath, 'index.html')));
};
