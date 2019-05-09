module.exports = app => {
  /*
   * The process object is a global that provides information about, and control over, the current Node.js process.
   * As a global, it is always available to Node.js applications without using require().
   */
  const isDev = process.env.NOVE_ENV !== "production";
  if (isDev) {
    const webpackConfig = require("../../config/webpack.dev.config");
    const addDevMiddlewares = require("./addDevMiddlewares");
    addDevMiddlewares(app, webpackConfig);
  } else {
    const addProdMiddlewares = require("./addProdMiddlewares");
    addProdMiddlewares(app);
  }
  return app;
};
