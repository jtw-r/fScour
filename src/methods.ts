import {FSEntry} from "./types/FSEntry";
import path from "path";
import {PRINT_CHARS} from "./types/PRINT_CHARS";
import fs from "fs";
import {scour_exclude, scour_max_depth} from "./params";

export function map_directory_contents(_path: string, _depth: number = 0): FSEntry[] {
  let directory_contents: FSEntry[] = [];

  let files: fs.Dirent[] = fs.readdirSync(_path, {withFileTypes: true});

  for (const file of files) {
    let _f_name = file.name;
    let _f_path = path.join(_path, file.name);
    let _f_type = PRINT_CHARS.Empty;
    let _f_depth = _depth;
    let _f_hidden = false; //TODO: Look for a .gitignore file and use the data from that to conditionally flip this
    let _f_children: FSEntry[] = [];

    if (file.isDirectory()) {
      _f_type = PRINT_CHARS.Directory;
    } else if (file.isFile()) {
      _f_type = PRINT_CHARS.File;
    }

    // Mark files hidden that match the `scour_exclude` list
    if (scour_exclude.includes(_f_name)) {
      _f_hidden = true;
    }

    // If the current file is a directory, that is not hidden, and it's depth does not exceed the predefined max
    // depth... map the contents and store it as its children.
    if (_f_type === PRINT_CHARS.Directory && !_f_hidden && _f_depth < scour_max_depth) {
      _f_children = map_directory_contents(_f_path, _f_depth + 1);
    }

    directory_contents.push({
                              name: _f_name,
                              path: _f_path,
                              type: _f_type,
                              depth: _f_depth,
                              hidden: _f_hidden,
                              children: _f_children
                            });
  }

  // Rearrange list to put directories at the top, and files at the bottom
  directory_contents.sort(sort_directory_contents);

  return directory_contents;
}

// Rearrange list to put directories at the top, and files at the bottom
function sort_directory_contents(a: FSEntry, b: FSEntry): number {
  if (a.type === b.type) {
    return 0; // Don't change order
  } else if (a.type === PRINT_CHARS.File && b.type === PRINT_CHARS.Directory) {
    return 1; // Move b (dir) above a (file)
  } else if (a.type === PRINT_CHARS.Directory && b.type === PRINT_CHARS.File) {
    return -1; // Move b (file) below a (dir)
  } else {
    return 0;
  }
}

export function print_directory_contents(_contents: FSEntry[]): void {
  for (const element of _contents) {
    if (element.hidden) {
      continue;
    }

    let spacing = (
      PRINT_CHARS.Empty + " ".repeat(PRINT_CHARS.File.length - 2)
    ).repeat(element.depth);
    let suffix = "";

    if (element.type === PRINT_CHARS.Directory) {
      suffix = "/";
    }

    console.log(`${spacing}${element.type} ${element.name}${suffix}`);

    if (element.type === PRINT_CHARS.Directory && element.children?.length > 0) {
      print_directory_contents(element.children);
    }
  }
}