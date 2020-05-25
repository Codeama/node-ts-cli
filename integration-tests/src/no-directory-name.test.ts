import { checkIsDirectory, checkIsFile } from './helpers';
import { noDirectoryPaths} from './pathConfig';

describe('Files and Directories', () => {
  describe('NPM', () => {
    it('should have a package.json file', async () => {
      const status = await checkIsFile(noDirectoryPaths.packageJson);
      expect(status).toEqual(true);
    });
  });

  describe('Git', () => {
    it('should have a .gitignore file', async () => {
      const status = await checkIsFile(noDirectoryPaths.gitIgnore);
      expect(status).toEqual(true);
    });

    it('should have a README.md file', async () => {
      const status = await checkIsFile(noDirectoryPaths.readMe);
      expect(status).toEqual(true);
    });
  });

  describe('Prettier', () => {
    it('should have a .prettierrc file', async () => {
      const status = await checkIsFile(noDirectoryPaths.prettier);
      expect(status).toEqual(true);
    });
  });

  describe('TypesScript files', () => {
    it('should create a tsconfig.json file', async () => {
      const status = await checkIsFile(noDirectoryPaths.tsConfig);
      expect(status).toEqual(true);
    });

    it('should create a tslint.json file', async () => {
      const status = await checkIsFile(noDirectoryPaths.tslint);
      expect(status).toEqual(true);
    });
  });

  describe('Jest', () => {
    it('should have a jestconfig.json file', async () => {
      const status = await checkIsFile(noDirectoryPaths.jest);
      expect(status).toEqual(true);
    });
  });

  describe('Directories', () => {
    it('should have a src directory', async () => {
      const status = await checkIsDirectory(noDirectoryPaths.src);
      expect(status).toEqual(true);
    });
  });
});
