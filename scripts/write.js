const fs = require('fs');
const path = require('path');

console.log('开始子进程' + process.argv[2]);
console.log(Date.now());
process.on('message', (msg) => {
  const { file } = msg;
  const location = path.resolve(__dirname, `../dist/${file}`);
  const buildPath = path.resolve(__dirname, `../build/${file}`);
  try {
    const content = fs.readFileSync(location).toString();
    fs.writeFileSync(buildPath, content);
    console.log('压缩成功', file);
    process.exit(0);
  } catch (e) {
    console.log(e);
  }
});
