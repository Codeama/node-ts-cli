import { promises } from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';
import { green, red } from 'chalk';

const execPromise = promisify(exec);

const { lstat } = promises;
const { log } = console;

export async function checkIsFile(path: string): Promise<boolean> {
  try {
    (await lstat(path)).isFile();
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    else {
      log(`${err}`);
      throw err;
    }
  }
}

export async function checkIsDirectory(
  path: string,
): Promise<boolean> {
  try {
    (await lstat(path)).isDirectory();
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    else {
      log(`${err}`);
      throw err;
    }
  }
}

/**
 * Exec helper function
 * @param startMsg - message to indicate start of command execution
 * @param command - command to execute
 */
export async function execCommand(startMsg: string, command: string) {
  try {
    log(green(`${startMsg}`));
    execPromise(command);
  } catch (err) {
    log(
      red(
        `Uh oh! Something went wrong witt the executed command: ${command}.`,
      ),
    );
  }
}
