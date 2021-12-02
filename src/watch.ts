import chokidar from 'chokidar';
import { startWorker } from './worker';
import { resolvePath } from './path';
import * as signale from 'signale';
import * as Progress from 'child_process';
import * as Fs from 'fs-extra';

const isDev = process.env.NODE_ENV === 'development';

export const startWatch = async () => {
  const config = await getConfig();
  // const configPath = isDev ? resolveConfigPath() : resolvePath(__dirname, '../autoo.config.js');
  // const config = (await import(configPath)).default;
  signale.note(config);

  const watchPaths = [...config.include] as string[];
  const watcher = chokidar.watch(watchPaths, {
    cwd: process.cwd(),
    persistent: true
  });
  signale.star(process.env.NODE_ENV);
  watcher.on('addDir', (change) => {
    startWorker(change, config);
  });
};

const getConfig = async () => {
  const configCacheDir = '/Users/liqingdong/Library/Caches';
  const configCacheFile = resolvePath(process.cwd(), '../../Library/Caches/autoo/autoo.config.js');
  const configPath = resolvePath(process.cwd(), './autoo.config.ts');
  if (Fs.existsSync(configPath)) {
    //编译到缓存目录解析
    Progress.exec(`tsc ${configPath} --outDir ${configCacheDir}`);
    return (await import(`${configCacheFile}`)).default;
  } else {
    return defaultConfig;
  }
};

const defaultConfig = {
  include: ['./react/**', './src/**'],
  template: './template'
};
