[![CircleCI](https://circleci.com/gh/Codeama/node-ts-cli.svg?style=svg&circle-token=e5daeb11d210b0707dc4482031bcfe276bcdf344)](https://circleci.com/gh/Codeama/node-ts-cli)

 ## Node-ts-cli
This is a bare-bones quick start Node and TypeScript project starter command line tool. I wrote this to increase my productivity whenever I need start a new TypeScript project and prevent being bugged down by configuration. The config files generated are pretty basic and hopefully make it easy to add your own rules as needed.
(*Full disclosure: I also built it to...you know...scratch that developer itch we sometimes have.*) ¯\_(ツ)_/¯

### Pre-requisites
- Node.js v12 or later

### Installation
`npm install -g node-ts-cli`

### How to Use
To set up a project in your current working directory, run  
`node-tsc .`

To set up a project in a new directory, run  
`node-tsc <project-name>`

### What it does
- Initialises an npm project
- Installs the following dev dependencies
    - @types/jest
    - @types/node
    - jest
    - prettier
    - ts-jest
    - ts-lint
    - tslint-config-prettier
    - typescript
- Creates lint (tslint and tsconfig), format (prettierrc) and test (jest) config files
- Adds a test script in the npm generated `package.json`
- Creates a .gitignore and README file with just your directory name
- Creates a `src` directory

### Nice to have
It would be nice to have terminal progress bar for better user experience.

### Contributors
- @Codeama
- @scarabeo7

