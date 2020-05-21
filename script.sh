#!/bin/bash

mkdir sandbox
cd node-tsc && npm install
npm run build && npm pack
echo $PWD
mv node-ts-cli-1.0.0.tgz /usr/src/circle/sandbox
cd usr/src/circle/sandbox
npm install -g node-ts-cli-1.0.0.tgz 

exit