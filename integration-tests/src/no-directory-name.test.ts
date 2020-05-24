import { checkIsFile, checkIsDirectory } from './helpers';

const { log } = console;

// TODO consider adding mkDir and cd commands to this for the integration tests or better still move integration test files elseswher
describe('Files and Directories', () => {
  describe('NPM', () => {
    it('should have a package.json file', async () => {
      // const currentDir = process.cwd();
      log('CURRENT WORKING DIR: ', process.cwd());
      const status = await checkIsFile(
        '/home/circleci/test-box/package.json',
      );
      expect(status).toEqual(true);
    });
  });

  describe('Git', () => {
    it('should have a .gitignore file', async () => {
      const status = await checkIsFile('/home/circleci/test-box/.gitignore');
      expect(status).toEqual(true);
    });

    it('should have a README.md file', async () => {
      const status = await checkIsFile('/home/circleci/test-box/README.md');
      expect(status).toEqual(true);
    });
  });

  describe('Prettier', () => {
    it('should have a .prettierrc file', async () => {
      const status = await checkIsFile(
        '/home/circleci/test-box/.prettierrc',
      );
      expect(status).toEqual(true);
    });
  });

  describe('TypesScript files', () => {
    it('should create a tsconfig.json file', async () => {
      const status = await checkIsFile(
        '/home/circleci/test-box/tsconfig.json',
      );
      expect(status).toEqual(true);
    });

    it('should create a tslint.json file', async () => {
      const status = await checkIsFile(
        '/home/circleci/test-box/tslint.json',
      );
      expect(status).toEqual(true);
    });
  });

  describe('Jest', () => {
    it('should have a jestconfig.json file', async () => {
      const status = await checkIsFile(
        '/home/circleci/test-box/jestconfig.json',
      );
      expect(status).toEqual(true);
    });
  });

  describe('Directories', () => {
    it.skip('should have a src directory', async () => {
      const status = await checkIsDirectory('/home/circleci/test-box/src');
      expect(status).toEqual(true);
    });

    it.skip('should have a lib directory', async () => {
      const status = await checkIsDirectory('/home/circleci/test-box/lib');
      expect(status).toEqual(true);
    });
  });
});
