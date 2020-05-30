[![CircleCI](https://circleci.com/gh/Codeama/node-ts-cli.svg?style=svg&circle-token=e5daeb11d210b0707dc4482031bcfe276bcdf344)](https://circleci.com/gh/Codeama/node-ts-cli)

 ## node-ts-cli
A bare-bones quick start NodeJS and TypeScript project starter command line tool. I wrote this to increase my productivity when I need to start a new TypeScript project and to prevent being bugged down by configuration. The config files generated are pretty basic and hopefully make it easy to amend as needed.
(*Full disclosure: I also built it to...you know...scratch that developer itch we often have.*) ¯\\_(ツ)_/¯

### Prerequisites
- Node.js v12 or later

### Installation
`$  npm install -g node-ts-cli`

### How to Use
To set up a project in your current working directory, run  
`$  node-tsc .`

To set up a project in a new directory, run  
`$  node-tsc <project-name>`

### What It Does
- Initialises an npm project
- Installs the following dev dependencies
    - @types/node
    - typescript
    - @types/jest
    - jest
    - ts-jest
    - prettier
    - ts-lint
    - tslint-config-prettier
- Creates lint (tslint and tsconfig), format (prettierrc) and test (jest) config files
- Adds a test script in the npm generated `package.json`
- Creates a .gitignore and README file with just your directory name
- Creates a `src` directory

### What Could be Better
It would be nice to have terminal progress bar for better user experience.

### Contributors
- [@Codeama](https://github.com/codeama)
- [@scarabeo7](https://github.com/scarabeo7)

