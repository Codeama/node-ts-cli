import { copyFile, constants } from 'fs';

const { COPYFILE_EXCL } = constants;

export function getCopyFileFunc(src: string, dest: string) {
  copyFile(src, dest, COPYFILE_EXCL, (err) => {
    if (err) {
      throw err;
    }
  });
}

export function generateConfigFile(
  copyFunc: (src: string, dest: string) => void,
  src: string,
  dest: string,
) {
  try {
    copyFunc(src, dest);
  } catch (err) {
    throw err;
  }
}
