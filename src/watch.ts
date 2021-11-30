const chokidar = require('chokidar');
const { startWorker } = require('./worker');
const { resolveConfigPath } = require('./path');

export const startWatch = () => {
  const configPath = resolveConfigPath();
  const config = require(configPath);

  const watchPaths = [...config.include] as string[];
  const watcher = chokidar.watch(watchPaths, {
    cwd: process.cwd(),
    persistent: true
  });

  watcher.on('addDir', (change) => {
    startWorker(change, config);
  });
};
