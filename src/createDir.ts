import { mkdirSync } from 'fs';

export function getmkdirSync(name: string) {
  try {
    return mkdirSync(name);
  } catch (err) {
    throw err;
  }
}

export function createJsDir(fn: (conf: string) => void, name: string) {
  try {
    fn(name);
  } catch (err) {
    throw err;
  }
}
