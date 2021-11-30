#!/usr/bin/env node

const chokidar = require('chokidar');
const { startWorker } = require('./worker');
const path = require('path');

(async () => {
  const configPath = path.resolve(process.cwd(), './autoo.config.js');
  const config = require(configPath);
  const watchPaths = [...config.include] as string[];
  const watcher = chokidar.watch(watchPaths, {
    cwd: process.cwd(),
    persistent: true
  });

  watcher.on('addDir', (changePath) => {
    startWorker(changePath, config);
  });
})();
