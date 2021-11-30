const Path = require('path');

export const rootDir = process.cwd();
export const dirname = __dirname;

export const resolvePath = (dir: string, path: string) => {
  return Path.resolve(dir, path);
};

export const resolveRootPath = (path: string = '') => {
  return Path.resolve(rootDir, path);
};

export const resolveDirPath = (path: string) => {
  return Path.resolve(dirname, path);
};

export const resolveConfigPath = (path: string = './autoo.config.js') => {
  return Path.resolve(rootDir, path);
};

export const resolveWriteScriptPath = (path: string = './write.js') => {
  return Path.resolve(dirname, path);
};

export const resolveTemplatePath = (path: string = './template') => {
  return Path.resolve(rootDir, path);
};

export const resolveTargetPath = (path: string) => {
  return Path.resolve(rootDir, path);
};
