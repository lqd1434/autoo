import * as Fs from 'fs-extra';
import * as Path from 'path';
import { fork } from 'child_process';

(async () => {
  const location = Path.resolve(__dirname, '../dist/src');
  const files = Fs.readdirSync(location) as string[];
  const writePath = Path.resolve(__dirname, './write.ts');

  const jsFile = files.filter((item) => {
    return /.js$/.test(item);
  });

  jsFile.forEach((file, index) => {
    // @ts-ignore
    const worker = fork(writePath, [index]);
    worker.send({ file: file });
  });
})();
