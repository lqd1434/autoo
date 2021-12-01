import chokidar from 'chokidar';
import { startWorker } from './worker';
import { resolveConfigPath } from './path';
import * as signale from 'signale';

export const startWatch = async () => {
  const configPath = resolveConfigPath();
  const config = (await import(configPath)).default;
  signale.await(config);

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
