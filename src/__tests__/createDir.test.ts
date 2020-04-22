import { createJsDir } from '../createDir';

describe('Create Directory', () => {
  it('should create a directory with specified name', () => {
    let entry = 'test';
    // fake node fs function ---mkdirSync(arg)
    function fakemkdirFunc(name: string) {
      entry = `${name}-directory`;
    }
    function getmkdirSync(name: string) {
      return fakemkdirFunc(name);
    }

    createJsDir(getmkdirSync, entry);
    expect(entry).toEqual('test-directory');
  });

  it.todo('should return an error if something goes wrong');
  it.todo('should use current working directory when none is specified');
  it.todo('should not create another directory when the specified name already exists');
});
