#!urs/bin/env ts-node

import * as fs from "fs";
import * as path from "path";

enum PRINT_CHARS {
  Empty = "|",
  Directory = "+-+",
  File = "+--"
}

type FSEntry = {
  name: string;
  type: PRINT_CHARS;
  depth: number;
  hidden: boolean;
};

const argv = process.argv.slice(2);
const scour_depth = 5;

if (argv.length == 0 ) {
  console.error("No directory passed");
  process.exit(1);
}

const dir_path = path.resolve(argv[0])

fs.readdir(dir_path, {withFileTypes: true}, ((err, files) => {
  if (err) {
    console.error(err);
  }
  output(handle_dir_contents(files));
}))

function get_dirent_type(object: fs.Dirent): PRINT_CHARS {
  if (object.isDirectory()) {
    return PRINT_CHARS.Directory;
  } else if (object.isFile()) {
    return PRINT_CHARS.File;
  } else {
    return PRINT_CHARS.Empty;
  }
}

function handle_dir_contents(files: fs.Dirent[]): FSEntry[] {
  let _return: FSEntry[] = []

  for (let file_index = 0; file_index < files.length; file_index++) {
    let _f_name = files[file_index].name;
    let _f_type = get_dirent_type(files[file_index]);
    let _f_depth = 0;
    let _f_hidden = false; //TODO: Look for a .gitignore file and use the data from that to conditionally flip this

    _return.push({name: _f_name, type: _f_type, depth: _f_depth, hidden: _f_hidden});
  }

  return _return;
}

function output(files: FSEntry[]): void {
  console.log("fScour results:");
  console.log(`+ ${path.basename(dir_path)}/`);
  console.log(PRINT_CHARS.Empty);
  for (const file of files) {
    if (!file.hidden) {
      console.log(`${file.type} ${file.name}`);
    }
  }
}
