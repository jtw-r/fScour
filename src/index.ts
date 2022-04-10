#!urs/bin/env ts-node

const argv = require("yargs/yargs")(process.argv.slice(2)).command(
  ["serve", "$0"],
  "the serve command",
  (yargs: any) => {},
  (argv: any) => {
    console.log("this command will be run by default");
  }
).argv;
