import { basename, resolve } from 'path';

export const tslintConfig = {
  name: 'tslintjson',
  config: {
    extends: ['tslint:recommended', 'tslint-config-prettier'],
  },
};

export const prettierConfig = {
  name: '.prettierrc',
  config: {
    printWidth: 70,
    trailingComma: 'all',
    singleQuote: true,
  },
};

export const jestConfig = {
  name: 'jestconfig.json',
  config: {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  },
};

export const tsConfig = {
  name: 'tsconfig.json',
  config: {
    compilerOptions: {
      target: 'es2019',
      module: 'commonjs',
      forceConsistentCasingInFileNames: true,
      moduleResolution: 'node',
      strictNullChecks: true,
      lib: ['ES6'],
      outDir: './lib',
      strict: true,
      esModuleInterop: true,
    },
  },
};

export const gitIgnore = {
  name: '.gitignore',
  content: ['/node_modules', '/lib'],
};

export const readMe = {
  name: 'README.md',
  content: process.argv[2] ? process.argv[2] : basename(resolve()),
};
