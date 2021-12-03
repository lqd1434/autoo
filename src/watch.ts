import chokidar from 'chokidar';
import { startWorker } from './worker';
import { resolvePath } from './path';
import signale from 'signale';
import * as Fs from 'fs-extra';
import vm from 'vm';

const isDev = process.env.NODE_ENV === 'development';
const context = {} as any;
vm.createContext(context);

export const startWatch = async () => {
  const config = await getConfig();
  const watchPaths = [...config.include] as string[];
  const watcher = chokidar.watch(watchPaths, {
    cwd: process.cwd(),
    persistent: true
  });
  watcher.on('addDir', (change) => {
    startWorker(change, config);
  });
};

const getConfig = async () => {
  const configPath = resolvePath(process.cwd(), './autoo.config.ts');
  if (Fs.existsSync(configPath)) {
    let code;
    try {
      code = Fs.readFileSync(configPath, { encoding: 'utf-8' }).toString();
      code = code.replace(/export/, 'var').replace(/default/, 'config=');
      vm.runInContext(code, context);
      signale.success('获取配置成功');
      signale.log(context.config);
      return context.config;
    } catch (error) {
      signale.error(error);
    }
  } else {
    signale.warn('未发现配置文件,将使用默认配置');
    return defaultConfig;
  }
};

const defaultConfig = {
  include: ['./src/components/**'],
  template: './template'
};
