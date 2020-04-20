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

  it('should throw an error if something goes wrong', () => {
    function getCopyFile(src: string, dest: string) {
      throw new Error();
    }

    const error = generateConfigFile(getCopyFile, 'source_file', '');
    expect(error).toEqual(new Error());
  });
});
