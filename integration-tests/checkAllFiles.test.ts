import { checkIsFile, checkIsDirectory } from './helpers';

const { log } = console;

// TODO consider adding mkDir and cd commands to this for the integration tests or better still move integration test files elseswher
describe('Files and Directories', () => {
  describe('NPM', () => {
    it('should have a package.json file', async () => {
      // const currentDir = process.cwd();
      log('CURRENT WORKING DIR: ', process.cwd());
      const status = await checkIsFile(
        `${process.cwd()}/package.json`,
      );
      expect(status).toEqual(true);
    });
  });

  describe('Git', () => {
    it('should have a .gitignore file', async () => {
      const status = await checkIsFile(`${process.cwd()}/.gitignore`);
      expect(status).toEqual(true);
    });

    it('should have a README.md file', async () => {
      const status = await checkIsFile(`${process.cwd()}/README.md`);
      expect(status).toEqual(true);
    });
  });

  describe('Prettier', () => {
    it('should have a .prettierrc file', async () => {
      const status = await checkIsFile(
        `${process.cwd()}/.prettierrc`,
      );
      expect(status).toEqual(true);
    });
  });

  describe('TypesScript files', () => {
    it('should create a tsconfig.json file', async () => {
      const status = await checkIsFile(
        `${process.cwd()}/tsconfig.json`,
      );
      expect(status).toEqual(true);
    });

    it('should create a tslint.json file', async () => {
      const status = await checkIsFile(
        `${process.cwd()}/tslint.json`,
      );
      expect(status).toEqual(true);
    });
  });

  describe('Jest', () => {
    it('should have a jestconfig.json file', async () => {
      const status = await checkIsFile(
        `${process.cwd()}/jestconfig.json`,
      );
      expect(status).toEqual(true);
    });
  });

  describe('Directories', () => {
    it('should have a src directory', async () => {
      const status = await checkIsDirectory(`${process.cwd()}/src`);
      expect(status).toEqual(true);
    });

    it('should have a lib directory', async () => {
      const status = await checkIsDirectory(`${process.cwd()}/lib`);
      expect(status).toEqual(true);
    });
  });
});
