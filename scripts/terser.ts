import fs from 'fs';
import path from 'path';
import { fork } from 'child_process';

(async () => {
  const location = path.resolve(__dirname, '../dist');
  const files = fs.readdirSync(location) as string[];
  const writePath = path.resolve(__dirname, './write.js');

  const jsFile = files.filter((item) => {
    return /.js$/.test(item);
  });

  jsFile.forEach((file, index) => {
    // @ts-ignore
    const worker = fork(writePath, [index]);
    worker.send({ file: file });
  });
})();
