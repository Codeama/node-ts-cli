import { copyFile, constants } from 'fs';

const { COPYFILE_EXCL } = constants;

export function getCopyFile(src: string, dest: string) {
  copyFile(src, dest, COPYFILE_EXCL, (err) => {
    if (err) {
      return err;
    }
  });
}

export function generateConfigFile(
  copyFunc: (src: string, dest: string) => void,
  src: string,
  dest: string,
) {
  copyFunc(src, dest);
}
