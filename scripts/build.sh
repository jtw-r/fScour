#!/bin/bash

echo "Building fScour"
esbuild src/index.ts --bundle --platform=node --target=node14.0 --outfile=dist/fScour.js