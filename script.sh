#!/bin/bash

cd ~
mkdir test-box
cd project/node-tsc
npm run build && npm pack
echo $PWD
mv node-ts-cli-1.0.0.tgz ~/test-box
cd ~/test-box/
sudo npm install -g node-ts-cli-1.0.0.tgz 

exit