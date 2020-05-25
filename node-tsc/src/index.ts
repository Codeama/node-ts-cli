#! /usr/bin/env node

import { spawnSync } from 'child_process';
import { green, red, yellow } from 'chalk';
import { normalize } from 'path';
import {
  getMkdir,
  getMkdirSync,
  getConfigFilesFunc,
  getCreateAllFilesFunc,
  getCreateFileFunc,
  getCreateConfigFunc,
  getUpdateNpmConfig,
} from './utilities';
import { execInstall } from './process-util';
import { typeScript, jestScript, lintScript } from './commands';
import {
  tsConfig,
  tslintConfig,
  jestConfig,
  prettierConfig,
  gitIgnore,
  readMe,
  scripts,
} from './configFiles/index';
const { log } = console;

const configFiles = [
  tsConfig,
  tslintConfig,
  jestConfig,
  prettierConfig,
];
const gitFiles = [gitIgnore, readMe];

/**
 * Checks if a directory name is specified
 */
function checkDirArg() {
  const entry = process.argv[2];
  if (entry) {
    const createDir = getMkdirSync(entry);
    createDir();
    process.chdir(normalize(`${process.cwd()}/${entry}`));
  } else return;
}

/**
 * Creates a src directory
 */
async function createSrcDir() {
  try {
    const mkSrcDir = getMkdir('src');
    await mkSrcDir();
    log(green('src directory created.'));
  } catch (err) {
    log(red(err));
  }
}

/**
 * Initialises an npm project
 */
async function npmInit() {
  try {
    log(yellow(`Initialising npm project...`));
    const { status, stderr } = spawnSync('npm', ['init', '-y'], {
      shell: true,
    });
    if (status !== 0) {
      log(red(`Error: ${stderr}`));
      log(red(`Exiting with code ${status}`));
      process.exit(1);
    }
    log(green('New project initialised'));
    const createConfigFile = getUpdateNpmConfig();
    await createConfigFile(scripts);
  } catch (err) {
    log(red(err));
  }
}

/**
 * Installs dependencies
 */
async function installDependencies() {
  try {
    await execInstall(
      typeScript,
      'Successfully installed typescript',
    );
    await execInstall(lintScript, 'Successfully installed linters');
    await execInstall(jestScript, 'Successfully installed jest');
  } catch (err) {
    log(red(err));
  }
}

/**
 * Creates config files
 */
async function createConfigFiles() {
  try {
    const createConfigFile = getCreateConfigFunc();
    const allConfigFiles = getConfigFilesFunc(
      createConfigFile,
      configFiles,
    );
    await allConfigFiles();
  } catch (err) {
    log(red(err));
  }
}

/**
 * Creates .gitignore and README.md files
 */
async function createGitFiles() {
  try {
    const createFile = getCreateFileFunc();
    const createAllFiles = getCreateAllFilesFunc(
      createFile,
      gitFiles,
    );
    await createAllFiles();
  } catch (err) {
    log(red(err));
  }
}

checkDirArg();
createSrcDir();
npmInit();
installDependencies();
createConfigFiles();
createGitFiles();
