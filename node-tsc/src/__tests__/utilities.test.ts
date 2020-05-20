import {
  getConfigFilesFunc,
  ConfigFile,
  getCreateAllFilesFunc,
  IFile,
} from '../utilities';

describe('getConfigFilesFunc', () => {
  it('should return an array of files copied', async () => {
    const configFiles: ConfigFile[] = [
      { name: 'test1', config: { tslint: 'configured' } },
      { name: 'test2', config: { jestConfig: 'configured' } },
      { name: 'test3', config: { tsConfig: 'configured' } },
    ];

    const fakeFunc = jest.fn((file: ConfigFile) => {
      const created = file;
      return Promise.resolve(created);
    });

    const configFileFunc = getConfigFilesFunc(fakeFunc, configFiles);
    const result = await configFileFunc();
    expect(fakeFunc).toHaveBeenCalledTimes(configFiles.length);
    configFiles.forEach((file) =>
      expect(fakeFunc).toHaveBeenCalledWith(file),
    );
    expect(result).toEqual(configFiles);
  });
});

describe('getCreateAllFilesFunc', () => {
  it('should return an array of files copied', async () => {
    const testFiles: IFile[] = [
      { name: 'test1', content: 'test-content1' },
      { name: 'test2', content: 'test-content2' },
      { name: 'test3', content: 'test-content3' },
    ];

    const fakeFunc = jest.fn((file: IFile) => {
      const created = file;
      return Promise.resolve(created);
    });

    const createFileFunc = getCreateAllFilesFunc(fakeFunc, testFiles);
    const result = await createFileFunc();
    expect(fakeFunc).toHaveBeenCalledTimes(testFiles.length);
    testFiles.forEach((file) =>
      expect(fakeFunc).toHaveBeenCalledWith(file),
    );
    expect(result).toEqual(testFiles);
  });
});
