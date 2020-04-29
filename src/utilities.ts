import { constants, promises, mkdirSync } from 'fs';
import { join } from 'path';
import { yellow, redBright } from 'chalk';
const { log } = console;
const { copyFile, lstat } = promises;
const { COPYFILE_EXCL } = constants;

export function getmkdirSync() {
  return function createDir(name: string) {
    try {
      return mkdirSync(name);
    } catch (err) {
      if (err.code === 'EEXIST') {
        log(redBright(`${name} already exists.`));
      } else {
        throw err;
      }
    }
  };
}

export function getIsDirectoryFunc() {
  return async function checkDirectory(
    dir: string,
  ): Promise<boolean> {
    try {
      const status = (await lstat(dir)).isDirectory();
      return status;
    } catch (err) {
      throw err;
    }
  };
}

export function getIsFileFunc() {
  return async function checkIsFile(
    fileName: string,
  ): Promise<boolean> {
    try {
      const status = (await lstat(fileName)).isFile();
      return status;
    } catch (err) {
      throw err;
    }
  };
}

export function getExitProgram() {
  return function exitProgram(code: number) {
    process.exitCode = code;
    log(`Exit code: ${process.exitCode}`);
    process.exit(code);
  };
}

export async function isFileAndDirectory(
  srcDir: string,
  destDir: string,
  fileName: string,
): Promise<boolean> {
  try {
    const checkSrc = getIsDirectoryFunc();
    const checkDest = getIsDirectoryFunc();
    const checkFile = getIsFileFunc();
    const src = await checkSrc(srcDir);
    const dest = await checkDest(destDir);
    const file = await checkFile(fileName);
    const exit = getExitProgram();
    if (!src) {
      log(`'${srcDir}' is not a directory!`);
      exit(1);
    }
    if (!dest) {
      log(`'${destDir}' is not a directory!`);
      exit(1);
    }
    if (!file) {
      log(`'${fileName}' is not a file!`);
      exit(1);
    }

    return src && dest && file;
  } catch (err) {
    throw err;
  }
}

export async function getCopyFunc(
  srcDir: string,
  destDir: string,
  fileName: string,
): Promise<void> {
  try {
    // handles wrong args ---non-directory or file string
    await isFileAndDirectory(srcDir, destDir, fileName);
    const sourcePath = join(srcDir, fileName);
    const destPath = join(destDir, fileName);
    await copyFile(sourcePath, destPath, COPYFILE_EXCL);
    return log(`${fileName} generated!`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      log(redBright(`${fileName} already exists.`));
    } else {
      throw err;
    }
  }
}
