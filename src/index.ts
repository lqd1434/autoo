#!/usr/bin/env node

const chokidar = require('chokidar');
const { startWorker } = require('./worker');
const path = require('path');

(async () => {
  const configPath = path.resolve(process.cwd(), './autoo.config.js');
  const paths = require(configPath).include as string[];
  const watcher = chokidar.watch(paths, {
    cwd: process.cwd(),
    persistent: true
  });

  watcher.on('addDir', (changePath) => {
    startWorker(changePath);
  });
})();
