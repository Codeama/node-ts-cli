# You can write these in an integration-test step on the config.yml file, or write it as a script `.sh`

1. Install project dependencies
    command: `npm install`
2. Create a bundle with the source
    command: `npm run build && npm pack`
    NOTE: This command will generate a tarball file called `node-ts-cli-1.0.0.tgz`
    You'll need the file name for the next step
3. Create a folder in the circleci current working directory, call it `test-box`. This should end up being something like `~/circleci/project/test-box`
4. Move the tarball file into the newly created folder
5. Change directory to the folder and install the tarball file
    command: `npm install -g node-ts-cli-1.0.0.tgz`
6. We'll figure this bit out as we'll need the current working directory for the integration tests
