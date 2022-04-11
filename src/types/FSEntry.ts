import {PRINT_CHARS} from "./PRINT_CHARS";

export type FSEntry = {
  name: string;
  path: string;
  type: PRINT_CHARS;
  depth: number;
  hidden: boolean;
  children: FSEntry[];
};