import { promises, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { green, redBright, red } from 'chalk';
const { log } = console;
const { writeFile, appendFile, readFile, access, mkdir } = promises;

/**
 * Gets function to create a new directory
 * @param dirname - path to directory to be created
 * @returns - the returned function
 */
export function getMkdirSync(dirname: string): () => void {
  /**
   * Creates new directory
   */
  return function createDir(): void {
    try {
      mkdirSync(dirname);
    } catch (err) {
      if (err.code === 'EEXIST') {
        log(redBright(`${dirname} already exists.`));
        log(
          redBright(
            'Please provide a new directory name or run `node-tsc` to use current directory.',
          ),
        );
        process.exit();
      } else {
        throw err;
      }
    }
  };
}

/**
 * Gets async function to create a new directory
 * @param dirname - path to directory to be created
 * @returns - the returned function
 */
export function getMkdir(dirname: string): () => Promise<void> {
  /**
   * Creates new directory
   */
  return async function createDir(): Promise<void> {
    try {
      mkdir(dirname);
    } catch (err) {
      if (err.code === 'EEXIST') {
        log(redBright(`${dirname} already exists.`));
      } else {
        throw err;
      }
    }
  };
}

/**
 * Gets function to check if path is a file
 * @param path - path to file
 * @returns - the returned function
 */
export function createIsFileFunc(
  path: string,
): () => Promise<boolean> {
  /**
   * Inner function to check if path is a true file or not
   * @returns {boolean} - the returned value
   */
  return async function checkIsFile(): Promise<boolean> {
    try {
      await access(path);
      return true;
    } catch (err) {
      if (err.code === 'ENOENT') return false;
      else {
        log(red(`${err}`));
        throw err;
      }
    }
  };
}

/**
 * Gets function that creates file(s)
 * @param function argument to execute the second param
 * @param files - an array of files to be executed by provided function arg
 * @returns - the returned function
 */
export function getCreateAllFilesFunc(
  fn: (file: IFile) => void,
  files: IFile[],
): () => Promise<void[]> {
  /**
   * Inner function to create files
   * @returns - a promise
   */
  return function createFiles(): Promise<void[]> {
    return Promise.all(
      files.map((file) => {
        return fn(file);
      }),
    );
  };
}

/**
 * Updates files with a list of differing items (does not overrite)
 * @param existingfilePath - path to file
 * @param newData - an array of data for updating the file
 */
async function updateAsList(
  existingfilePath: string,
  newData: string[],
): Promise<void[] | void> {
  try {
    const existingData = await readFile(existingfilePath);
    const result = existingData.toString().split('\n');
    const diff = newData.filter(
      (content) => !result.includes(content),
    );

    if (diff) {
      return Promise.all(
        diff.map(async (item) => {
          await appendFile(existingfilePath, `${item}\n`, {
            flag: 'a+',
          });
        }),
      );
    }
  } catch (err) {
    return err;
  }
}

/**
 * Updates file with differing string data
 * @param filePath - path to file to be updated
 * @param content - new string data for updating the file
 */
async function updateFile(
  filePath: string,
  content: string,
): Promise<void> {
  try {
    const existingData = await readFile(filePath);
    const stringedResult = existingData.toString();
    if (stringedResult !== content) {
      await writeFile(filePath, content);
    }
  } catch (err) {
    return err;
  }
}

/**
 * Gets function that creates a single config file
 * @returns a function that creates a config file when invoked
 */
export function getUpdateNpmConfig(): (
  arg: ConfigFile,
) => Promise<void> {
  /**
   * Inner function that creates a config file
   * @param path - path to file to be created
   */
  return async function updateNpmConfig(
    file: ConfigFile,
  ): Promise<void> {
    try {
      const data = JSON.stringify(file.config, null, '\t');
      await writeFile(file.name, data);
      log(green(`${file.name} generated`));
    } catch (err) {
      log(redBright(err));
    }
  };
}

/**
 * Updates file with array of data or string data
 * @param path - path to file
 * @param content - new data for updating the file
 */
async function update(
  path: string,
  content: string | string[],
): Promise<void> {
  try {
    if (Array.isArray(content)) {
      await updateAsList(path, content);
    } else {
      await updateFile(path, content);
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Creates or updates an array of files
 * @param path - path to file
 * @param content - data to update files
 * @returns - a promise
 */
async function create(
  path: string,
  content: string | string[],
): Promise<void[] | void> {
  try {
    if (Array.isArray(content)) {
      return Promise.all(
        content.map(async (item) => {
          await appendFile(path, `${item}\n`, { flag: 'a+' });
        }),
      );
    } else {
      await writeFile(path, content);
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Gets function to create a single new file or update an existing one
 * @returns an async function that creates the file when invoked
 */
export function getCreateFileFunc(): (arg: IFile) => Promise<void> {
  /**
   * Inner function that creates or updates a single file
   * @param file - path to file
   */
  return async function createFile(file: IFile) {
    const content = file.content;
    const fileName = file.name;

    try {
      const checkFileExists = createIsFileFunc(fileName);
      const exists = await checkFileExists();

      if (exists) {
        update(fileName, content);
      } else {
        create(fileName, content);
      }
    } catch (err) {
      log(red(err));
    }
  };
}

/**
 * Gets function to create a list of config files
 * @param fn - function that creates the config files
 * @param files - a list of file paths/names to create
 * @returns - the returned function to create files when invoked
 */
export function getConfigFilesFunc(
  fn: (file: ConfigFile) => void,
  files: ConfigFile[],
): () => Promise<void[]> {
  /**
   * Inner function that creates the config files
   * @returns a promise
   */
  return function configFilesFunc(): Promise<void[]> {
    return Promise.all(
      files.map((file) => {
        return fn(file);
      }),
    );
  };
}

/**
 * Gets function that creates a single config file
 * @returns a function that creates a config file when invoked
 */
export function getCreateConfigFunc(): (
  arg: ConfigFile,
) => Promise<void> {
  /**
   * Inner function that creates a config file
   * @param path - path to file to be created
   */
  return async function createConfigFile(
    file: ConfigFile,
  ): Promise<void> {
    try {
      const data = JSON.stringify(file.config, null, '\t');
      await writeFile(file.name, data, { flag: 'wx' });
      log(green(`${file.name} generated`));
    } catch (err) {
      if (err.code === 'EEXIST') return;
      log(redBright(err));
    }
  };
}

export interface ConfigFile {
  name: string;
  config: object;
}

export interface IFile {
  name: string;
  content: string | string[];
}
