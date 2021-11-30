const { readFileSync, writeFileSync } = require('fs-extra');

console.log(`子进程${process.argv[2]}开始创建文件`);
process.on('message', (msg: any) => {
  const { targetPath, source } = msg;
  const content = readFileSync(source).toString();
  try {
    writeFileSync(targetPath, content);
    console.log(`创建${targetPath}成功`);
    process.env.Progress = String(123);
    process.send(50 * parseInt(process.argv[2]));
  } catch (e) {
    console.log(`创建${targetPath}失败`);
    console.log(e);
    process.send(1);
  }
});
