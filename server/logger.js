/* Chalk: Terminal string styling */
const chalk = require("chalk");

/* Ip: Get your ip address, compare ip addresses, validate ip addresses, etc */
const ip = require("ip");

const divider = chalk.gray(
  "\n------------------------------------------------"
);

const logger = {
  error: err => {
    console.error(chalk.red(err));
  },
  appStarted: (port, host, tunnelStarted) => {
    console.clear();
    console.log(chalk.cyan("Starting development server...\n"));

    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green("✓")}`);
    }

    console.log(`	${chalk.bold("Access URLs:")}${divider}`);
    console.log(`	Localhost: ${chalk.magenta(`http://${host}:${port}`)}`);
    console.log(
      `	LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
        (tunnelStarted
          ? `\n	Proxy: ${chalk.magenta(tunnelStarted)}`
          : "")}${divider}`
    );
    console.log(`	Press ${chalk.italic("CTRL-C")} to stop \n\n`);
  },
  reporter: (middlewareOptions, options) => {
    const { log, state, stats } = options;

    if (state) {
      const displayStats = middlewareOptions.stats !== false;

      if (displayStats) {
        if (stats.hasErrors()) {
          log.error(stats.toString(middlewareOptions.stats));
        } else if (stats.hasWarnings()) {
          log.warn(stats.toString(middlewareOptions.stats));
        }
      }

      console.log(`${chalk.green("Compiled successfully. ✓")}`);

      if (stats.hasErrors()) {
        console.log(`${chalk.red("Failed to compile.")}`);
      } else if (stats.hasWarnings()) {
        console.log(`${chalk.yellow("Compiled with warnings.")}`);
      }
    } else {
      log.info("Compiling...");
    }
  }
};

module.exports = logger;
