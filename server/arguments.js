/**
 * Pega os argumentos enviados por terminal
 * Exemplo/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
 * {
 *   _: [ 'foo', 'bar', 'baz' ],
 *   x: 3,
 *   y: 4,
 *   n: 5,
 *   a: true,
 *   b: true,
 *   c: true,
 *   beep: 'boop'
 * }
 *
 * The process.argv property returns an array containing the command line arguments passed when the Node.js process was launched.
 * The "argv" array contains everything given on the command line. The first item (argv[0]) will be the path to node itself,
 * and the second item (argv[1]) will be the path to your script code.
 *
 * So a slice starting at 2 will discard both of those and return everything else that was typed on the command line.
 *
 */
module.exports = require("minimist")(process.argv.slice(2));
