const path = require('path');
const { fork } = require('child_process');
const { existsSync } = require('fs-extra');

export const startWorker = async (filePath) => {
  const exist = existsSync(`${process.cwd()}/${filePath}/index.tsx`);
  if (!exist) {
    const writePath = path.resolve(__dirname, './write.js');
    const worker = fork(writePath);
    worker.send({ path: filePath });
    worker.on('message', (msg) => {
      console.log('---来自子进程----');
      console.log(msg);
    });
  }
};
