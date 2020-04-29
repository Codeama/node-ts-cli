import { getCopyAllFilesFunc } from '../generateConfig';

describe('getCopyAllFilesFunc', () => {
  it('should return an array of files copied', async () => {
    // not an actual mimic of the copy function in utilities
    async function fakeCopyFileFunc(src: string, dest: string) {
      const copy = src;
      return Promise.resolve(copy);
    }
    const files = Array('file1', 'file2', 'file3');
    const srcDir = 'src-dir';
    const destDir = 'dest-dir';
    const copyFile = getCopyAllFilesFunc(srcDir, destDir);
    const result = await copyFile(fakeCopyFileFunc, files);
    expect(result).toEqual(['src-dir', 'src-dir', 'src-dir']);
  });
});
