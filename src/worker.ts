const path = require('path');
const { fork } = require('child_process');
const { existsSync, readdirSync } = require('fs-extra');

export const startWorker = async (filePath, config) => {
  const exist = existsSync(`${process.cwd()}/${filePath}/index.tsx`);
  if (!exist) {
    const writePath = path.resolve(__dirname, './write.js');
    const templatePath = path.resolve(process.cwd(), config.template as string);
    const templateFiles = readdirSync(templatePath);
    console.log(templateFiles);
    templateFiles.forEach((file, index) => {
      const template = path.resolve(templatePath, file);
      const worker = fork(writePath, [index]);
      worker.send({ targetPath: filePath, template: template });
      worker.on('message', (msg) => {
        console.log('---来自子进程----');
        console.log(msg);
      });
    });
  }
};
