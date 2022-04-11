#!urs/bin/env ts-node

import * as fs from "fs";
import * as path from "path";
import {map_directory_contents, print_directory_contents} from "./methods";
import {PRINT_CHARS} from "./types/PRINT_CHARS";

const argv = process.argv.slice(2);

let base_dir_path: string;

if (argv.length == 0 ) {
  // No directory passed, set it to current working directory
  base_dir_path = process.cwd();
} else {
  base_dir_path = path.resolve(argv[0]);
}

// Check to make sure that the path passed exists, and is a valid directory!
if (fs.existsSync(base_dir_path) && fs.lstatSync(base_dir_path).isDirectory()) {
  console.log("fScour results:");
  console.log(`+ ${path.basename(base_dir_path)}/`);
  console.log(PRINT_CHARS.Empty);
  print_directory_contents(map_directory_contents(base_dir_path));
} else {
  console.error(`Invalid directory passed: ${base_dir_path}`);
}