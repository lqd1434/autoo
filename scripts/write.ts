import * as fs from 'fs';
import { minify } from 'terser';
import * as path from 'path';

console.log('子进程' + process.argv[2]);
process.on('message', async (msg: any) => {
  const { file } = msg;
  const location = path.resolve(__dirname, `../dist/src/${file}`);
  const buildPath = path.resolve(__dirname, `../build/${file}`);
  try {
    const content = fs.readFileSync(location).toString();
    const minifyContent = (await minify(content)).code;
    fs.writeFileSync(buildPath, minifyContent);
    console.log('压缩成功', file);
    process.exit(0);
  } catch (e) {
    console.log(e);
  }
});
