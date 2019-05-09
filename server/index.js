/* The path module provides utilities for working with file and directory paths */
const resolve = require("path").resolve;

/* Express is a minimal and flexible Node.js web application framework */
const app = require("express")();

const logger = require("./logger");
const args = require("./arguments");
const setup = require("./middlewares");

const port = parseInt(args.port || process.env.PORT || "3000", 10);

const customHost = args.host || process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || "localhost";

setup(app);

app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
