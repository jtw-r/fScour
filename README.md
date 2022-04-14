# fScour
#### fScour - Filesystem Scourer

Welcome to fScour, a lightweight executable tool written in typescript for easily printing out folder structures.

---
#### Usage:
```shell
npx fscour [directory] [options]
```
The directory and options arguments can both be omitted.
By default, fScour will use the processes current directory (cwd) as it's root directory, if nothing else is supplied.

#### Example:
```shell
npx fscour .
```
```shell
+ fScour/
|
+-+ src/
| +-+ types/
| | +-- FSEntry.ts
| | +-- PRINT_CHARS.ts
| +-- index.ts
+-- .gitignore
+-- README.md
+-- package-lock.json
+-- package.json
+-- tsconfig.json
```

---

