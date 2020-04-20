import { generateConfigFile } from '../generateConfig';

describe('Create config files', () => {
  it('should generate new file', () => {
    let copy;
    // fake copy function
    function fakecopyFile(src: string, dest: string) {
      copy = src;
    }

    function getCopyFile(src: string, dest: string) {
      fakecopyFile(src, dest);
    }
    const source = 'source_file';
    generateConfigFile(getCopyFile, source, '');
    expect(copy).toEqual(source);
  });

  // TODO for integration tests
  it.todo('should create a jestconfig.json file');
  it.todo('should create a tsconfig.json file');
  it.todo('should create a tslint.json file');
});
