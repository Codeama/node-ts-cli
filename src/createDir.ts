import { mkdirSync } from 'fs';
import { yellow, red } from 'chalk';
const { log } = console;

export function getmkdirSync(name: string) {
  try {
    return mkdirSync(name);
  } catch (err) {
    if (err.code === 'EEXIST') {
      log(yellow(`A directory named ${name} already exists.`));
    } else {
      process.on('exit', (code) => {
        log(red(`Something went wrong: ${err.message}\nExit code ${code}`));
      });
    }
  }
}

export function createJsDir(fn: (conf: string) => void, name: string) {
  fn(name);
}
