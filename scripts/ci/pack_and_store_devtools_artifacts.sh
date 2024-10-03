#!/bin/bash

set -e

mkdir -p build/devtools

cd packages/reaction-devtools
npm pack
mv ./reaction-devtools*.tgz ../../build/devtools/

cd ../reaction-devtools-core
npm pack
mv ./reaction-devtools-core*.tgz ../../build/devtools/

cd ../reaction-devtools-inline
npm pack
mv ./reaction-devtools-inline*.tgz ../../build/devtools/

cd ../reaction-devtools-extensions
yarn build
mv ./chrome/build/ReactDevTools.zip ../../build/devtools/chrome-extension.zip
mv ./firefox/build/ReactDevTools.zip ../../build/devtools/firefox-extension.zip

# Compress all DevTools artifacts into a single tarball for easy download
cd ../../build/devtools
tar -zcvf ../devtools.tgz .