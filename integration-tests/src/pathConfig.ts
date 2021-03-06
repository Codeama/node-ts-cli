// circleci path to test
const rootName = process.platform === 'win32' ? 'Users' : 'home';
const testNoDirPath = `/${rootName}/circleci/test-box`;
const testWithDirPath = `/${rootName}/circleci/test-box-2/my-test-project`;


export const noDirectoryPaths = {
    packageJson: `${testNoDirPath}/package.json`,
    gitIgnore: `${testNoDirPath}/.gitignore`,
    readMe: `${testNoDirPath}/README.md`,
    prettier: `${testNoDirPath}/.prettierrc`,
    tsConfig: `${testNoDirPath}/tsconfig.json`,
    tslint: `${testNoDirPath}/tslint.json`,
    jest: `${testNoDirPath}/jestconfig.json`,
    src: `${testNoDirPath}/src`
}

export const withDirectoryPaths = {
    packageJson: `${testWithDirPath}/package.json`,
    gitIgnore: `${testWithDirPath}/.gitignore`,
    readMe: `${testWithDirPath}/README.md`,
    prettier: `${testWithDirPath}/.prettierrc`,
    tsConfig: `${testWithDirPath}/tsconfig.json`,
    tslint: `${testWithDirPath}/tslint.json`,
    jest: `${testWithDirPath}/jestconfig.json`,
    src: `${testWithDirPath}/src`
}