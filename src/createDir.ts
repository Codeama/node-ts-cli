import { mkdirSync } from 'fs';

export function getmkdirSync(name: string) {
  return mkdirSync(name);
}

export function createJsDir(fn: (conf: string) => void, name: string) {
  try {
    fn(name);
  } catch (err) {
    return err;
  }
}
