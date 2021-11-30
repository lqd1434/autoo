import { log } from 'util';

const { minify } = require('terser');
const fs = require('fs');
const path = require('path');
const { fork } = require('child_process');

(async () => {
  const location = path.resolve(__dirname, '../dist');
  const files = fs.readdirSync(location) as string[];
  const writePath = path.resolve(__dirname, './write.js');

  const jsFile = files.filter((item) => {
    return /.js$/.test(item);
  });

  jsFile.forEach((file, index) => {
    const worker = fork(writePath, [index]);
    worker.send({ file: file });
  });
})();
