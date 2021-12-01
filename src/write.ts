import { readFileSync, writeFile } from 'fs-extra';
import util from 'util';
import { getBasePath } from './path';

const writeFileAsync = util.promisify(writeFile);
console.log(`子进程${process.argv[2]}开始创建文件`);
process.on('message', async (msg: any) => {
  const { targetPath, source } = msg;
  console.log(targetPath);
  const content = readFileSync(source);
  const targetFile = getBasePath(targetPath);
  try {
    // @ts-ignore
    await writeFileAsync(targetPath, content);
    console.log(`创建${targetFile}成功`);
    process.env.Progress = String(123);
  } catch (e) {
    console.log(`创建${targetFile}失败`);
    console.log(e);
  }
});
