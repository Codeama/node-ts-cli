export function getCopyAllFilesFunc(srcDir: string, destDir: string) {
  return function copyFiles(
    copyFunc: (src: string, dest: string, file: string) => void,
    files: string[],
  ) {
    return Promise.all(
      files.map((file) => {
        return copyFunc(srcDir, destDir, file);
      }),
    );
  };
}
